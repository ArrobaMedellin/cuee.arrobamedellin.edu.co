import { COURSE_MAPPINGS } from '@/constants/courses'
import { apiService } from '@/lib/api'
import { mapFormDataToDto, mapSurveyToDto } from '@/lib/mappers/applicant-mapper'
import { RegistrationFormData } from '@/types/form'
import { useFormStore } from '@/stores/formStore'
import { useState } from 'react'
import { toast } from 'sonner'

interface UseFormSubmissionReturn {
	isSubmitting: boolean
	isSuccess: boolean
	error: string | null
	submitForm: (
		formData: Partial<RegistrationFormData>,
		onSuccess?: () => void,
		options?: { skipEnrollmentCheck?: boolean },
	) => Promise<void>
	reset: () => void
}

export function useFormSubmission(): UseFormSubmissionReturn {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const submitForm = async (
		formData: Partial<RegistrationFormData>,
		onSuccess?: () => void,
		options?: { skipEnrollmentCheck?: boolean },
	) => {
		try {
			setIsSubmitting(true)
			setError(null)

			if (!formData.section1?.documentNumber) {
				throw new Error('Número de documento es requerido')
			}

			const applicantDto = mapFormDataToDto(formData)

			if (!options?.skipEnrollmentCheck) {
				const status = await apiService.getFormStatus(formData.section1.documentNumber)

				if (status.flowType === 'BLOCKED') {
					const courseNames = status.activeEnrollments
						.map(e => e.courseName || e.courseCode)
						.join(', ')
					throw new Error(
						`Ya se encuentra cursando un curso${status.activeEnrollments.length > 1 ? 's' : ''}: ${courseNames}`,
					)
				}

				// Un curso que la persona ya finalizó o canceló no se puede volver a
				// inscribir. La pantalla lo muestra deshabilitado; esto cubre una
				// selección vieja que hubiera quedado guardada en el navegador.
				const repeated = (applicantDto.courseIds ?? []).filter(id =>
					status.disabledCourseIds.includes(id),
				)
				if (repeated.length > 0) {
					const names = repeated
						.map(id => COURSE_MAPPINGS.find(c => c.apiId === id)?.label ?? id)
						.join(', ')
					throw new Error(
						`Ya tomaste este curso: ${names}. Vuelve al paso de selección y elige un curso nuevo.`,
					)
				}
			}

			const result = await apiService.submitForm(
				applicantDto,
				useFormStore.getState().editToken,
			)
			if (result.dataUpdated === false) {
				toast.info(
					'Tu inscripción quedó registrada. Tus datos guardados no se cambiaron porque no verificaste tu correo.',
				)
			}

			setIsSuccess(true)
			console.log('Form submitted:', result)
			toast.success(result.isNew ? 'Inscripción enviada correctamente' : 'Información actualizada correctamente')

			if (formData.survey && result.applicantId) {
				try {
					const surveyDto = mapSurveyToDto(result.applicantId, formData.survey)
					await apiService.createSurvey(surveyDto)
				} catch (surveyError) {
					// La encuesta es información complementaria: no debe bloquear
					// el flujo de inscripción si el aplicante ya fue creado.
					console.error('Error al enviar la encuesta de caracterización:', surveyError)
				}
			}

			if (onSuccess) {
				onSuccess()
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Error al enviar la información'
			setError(errorMessage)
			toast.error(errorMessage)
			console.error('Submission error:', err)
		} finally {
			setIsSubmitting(false)
		}
	}

	const reset = () => {
		setIsSubmitting(false)
		setIsSuccess(false)
		setError(null)
	}

	return {
		isSubmitting,
		isSuccess,
		error,
		submitForm,
		reset,
	}
}
