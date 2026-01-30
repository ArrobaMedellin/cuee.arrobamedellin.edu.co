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

			// Verificar si el usuario ya tiene matrículas activas
			const enrollmentCheck = await apiService.checkActiveEnrollment(
				formData.section1.documentNumber,
			)

			if (enrollmentCheck.hasActiveEnrollment) {
				// Construir mensaje con información de las matrículas activas
				const courseNames = enrollmentCheck.enrollments
					.map(e => e.courseName || e.courseCode)
					.join(', ')

				throw new Error(
					`Ya se encuentra cursando un curso${enrollmentCheck.enrollments.length > 1 ? 's' : ''}: ${courseNames}`,
				)
			}

			// Verificar si el aplicante ya existe por número de documento
			const existingApplicant = await apiService.findApplicantByDocument(
				formData.section1.documentNumber,
			)

			// Transformar datos del formulario al formato esperado por la API
			const applicantDto = mapFormDataToDto(formData)

			let result
			if (existingApplicant) {
				// Eliminar campos vacíos o nulos para evitar errores de validación en actualización parcial
				const plainDto = JSON.parse(JSON.stringify(applicantDto))
				const cleanDto = Object.fromEntries(
					Object.entries(plainDto).filter(
						([, v]) => v !== '' && v !== null && v !== undefined,
					),
				)

				// Actualizar aplicante existente
				result = await apiService.updateApplicant(
					existingApplicant.id,
					cleanDto,
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
