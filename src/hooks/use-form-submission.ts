import { apiService } from '@/lib/api'
import { mapFormDataToDto } from '@/lib/mappers/applicant-mapper'
import { RegistrationFormData } from '@/types/form'
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
			}

			const applicantDto = mapFormDataToDto(formData)
			const result = await apiService.submitForm(applicantDto)

			setIsSuccess(true)
			console.log('Form submitted:', result)
			toast.success(result.isNew ? 'Inscripción enviada correctamente' : 'Información actualizada correctamente')

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
