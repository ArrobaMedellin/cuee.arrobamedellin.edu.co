import { COURSE_MAPPINGS } from '@/constants/courses'
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
	) => Promise<void>
	reset: () => void
}

/**
 * Hook personalizado para manejar el envío del formulario de inscripción
 *
 * Funcionalidades:
 * - Verifica si ya existe un aplicante con el mismo documento
 * - Crea o actualiza el registro según corresponda
 * - Maneja estados de carga y errores
 * - Muestra notificaciones al usuario
 *
 * @returns Objeto con estado y funciones para el envío del formulario
 */
export function useFormSubmission(): UseFormSubmissionReturn {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const submitForm = async (
		formData: Partial<RegistrationFormData>,
		onSuccess?: () => void,
	) => {
		try {
			setIsSubmitting(true)
			setError(null)

			// Validación básica de datos requeridos
			if (!formData.section1?.documentNumber) {
				throw new Error('Número de documento es requerido')
			}

			// Verificar si el aplicante ya existe por número de documento
			const existingApplicant = await apiService.findApplicantByDocument(
				formData.section1.documentNumber,
			)

			// Verificar si ya se encuentra cursando alguno de los cursos ofertados
			if (existingApplicant) {
				const offeredCourseIds = COURSE_MAPPINGS.map(c => c.apiId)
				// Normalizar cursos del aplicante (soportar diferentes estructuras posibles de respuesta)
				const applicantCourseIds = (
					existingApplicant.courseIds ||
					existingApplicant.courses?.map(
						(c: { apiId?: string; id?: string; code?: string }) =>
							c.apiId || c.id || c.code,
					) ||
					[]
				).map(String)

				const hasExistingEnrollment = applicantCourseIds.some((id: string) =>
					offeredCourseIds.includes(id),
				)

				if (hasExistingEnrollment) {
					throw new Error('Ya se encuentra cursando un curso')
				}
			}

			// Transformar datos del formulario al formato esperado por la API
			const applicantDto = mapFormDataToDto(formData)

			let result
			if (existingApplicant) {
				// Actualizar aplicante existente
				result = await apiService.updateApplicant(
					existingApplicant.id,
					applicantDto,
				)
				toast.success('Información actualizada correctamente')
			} else {
				// Crear nuevo aplicante
				result = await apiService.createApplicant(applicantDto)
				toast.success('Inscripción enviada correctamente')
			}

			setIsSuccess(true)
			console.log('Applicant saved:', result)

			// Ejecutar callback de éxito si se proporciona
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
