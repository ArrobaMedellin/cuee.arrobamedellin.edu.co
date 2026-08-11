import { RegistrationFormData } from '@/types/form'
import { calculateAge } from './age'

/**
 * Verifica si el aplicante es elegible para continuar con el proceso completo
 * Requisitos:
 * - Igual o mayor a 15 años
 *
 * @param data - Datos del formulario (section1 y section2)
 * @returns true si cumple los requisitos, false en caso contrario
 */
export function isEligibleForFullProcess(
	data: Partial<RegistrationFormData>,
): boolean {
	const section2 = data.section2

	if (!section2) {
		return false
	}

	// Validar que haya datos mínimos antes de evaluar
	if (!section2.birthDate) {
		return false
	}

	// Verificar edad (igual o mayor a 15 años)
	const age = calculateAge(section2.birthDate)
	console.log('🎂 Edad calculada:', age)
	if (age === null || age < 15) {
		console.log('❌ No cumple requisito de edad (menor de 15 años)')
		return false
	}
	console.log('✅ Edad válida:', age)

	return true
}

/**
 * Obtiene el mensaje de inelegibilidad basado en los datos del aplicante
 */
export function getIneligibilityMessage(
	data: Partial<RegistrationFormData>,
): string {
	const section2 = data.section2

	if (!section2) return 'Faltan datos para verificar elegibilidad'

	return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas de 15 años o más, según los criterios definidos para esta convocatoria.'
}
