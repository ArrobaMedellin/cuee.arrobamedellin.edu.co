import { section1Schema } from '@/schemas/section1'
import { section2Schema } from '@/schemas/section2'
import { section3Schema } from '@/schemas/section3'
import { section4Schema } from '@/schemas/section4'
import { section5Schema } from '@/schemas/section5'
import { section6Schema } from '@/schemas/section6'
import { useFormStore } from '@/stores/formStore'
import { useMemo } from 'react'

/**
 * Hook para validar la sección actual del formulario
 * Usa los esquemas Zod definidos para cada sección
 */
export function useValidateSection() {
	const { data, currentSection } = useFormStore()

	const isSectionValid = useMemo(() => {
		try {
			switch (currentSection) {
				case 1:
					if (!data.section1) return false
					console.log(
						'📋 Section1 data para validar:',
						JSON.stringify(data.section1),
					)
					section1Schema.parse(data.section1)
					return true

				case 2:
					if (!data.section2) return false
					section2Schema.parse(data.section2)
					return true

				case 3:
					if (!data.section3) return false
					section3Schema.parse(data.section3)
					return true

				case 4:
					if (!data.section4) return false
					section4Schema.parse(data.section4)
					return true

				case 5:
					if (!data.section5) return false
					section5Schema.parse(data.section5)
					return true

				case 6:
					if (!data.section6) return false
					section6Schema.parse(data.section6)
					return true

				case 7:
					// La sección 7 (resumen) siempre es válida si se llega a ella
					// porque significa que todas las secciones anteriores ya fueron validadas
					return true

				default:
					return false
			}
		} catch (error) {
			// Log para debugging
			console.log(
				`Validación sección ${currentSection} falló:`,
				error instanceof Error ? error.message : error,
			)
			return false
		}
	}, [data, currentSection])

	// Función para obtener errores de la sección actual
	const getSectionErrors = useMemo(() => {
		try {
			switch (currentSection) {
				case 1:
					if (!data.section1) return []
					section1Schema.parse(data.section1)
					return []

				case 2:
					if (!data.section2) return []
					section2Schema.parse(data.section2)
					return []

				case 3:
					if (!data.section3) return []
					section3Schema.parse(data.section3)
					return []

				case 4:
					if (!data.section4) return []
					section4Schema.parse(data.section4)
					return []

				case 5:
					if (!data.section5) return []
					section5Schema.parse(data.section5)
					return []

				case 6:
					if (!data.section6) return []
					section6Schema.parse(data.section6)
					return []

				default:
					return []
			}
		} catch (error: unknown) {
			// Mejor manejo de errores de Zod
			if (error && typeof error === 'object' && 'issues' in error) {
				const zodError = error as {
					issues: Array<{ message: string; path: string[] }>
				}
				const errorMessages = zodError.issues.map(issue => {
					const field = issue.path.join('.')
					return field ? `${field}: ${issue.message}` : issue.message
				})

				// Solo loggear si hay datos (evitar logs en formulario vacío)
				const sectionData = (data as Record<string, unknown>)[
					`section${currentSection}`
				] as Record<string, unknown> | undefined
				const hasData =
					sectionData &&
					typeof sectionData === 'object' &&
					Object.keys(sectionData).some(key => {
						const value = sectionData[key]
						return value !== '' && value !== undefined && value !== null
					})

				if (hasData) {
					console.log(`Errores en sección ${currentSection}:`, errorMessages)
				}
				return errorMessages
			}
			return ['Error de validación']
		}
	}, [data, currentSection])

	return {
		isSectionValid,
		sectionErrors: getSectionErrors,
	}
}
