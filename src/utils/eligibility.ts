import { RegistrationFormData } from '@/types/form'
import { calculateAge } from './age'

/**
 * Verifica si el aplicante es elegible para continuar con el proceso completo
 * Requisitos:
 * - Mayor de 18 años
 * - Vive en Medellín O nació en Medellín O trabaja en Medellín
 *
 * @param data - Datos del formulario (section1 y section2)
 * @returns true si cumple los requisitos, false en caso contrario
 */
export function isEligibleForFullProcess(
	data: Partial<RegistrationFormData>
): boolean {
	const section2 = data.section2

	if (!section2) return false

	// Verificar edad (mayor de 18 años)
	const age = calculateAge(section2.birthDate)
	if (age === null || age < 18) {
		return false
	}

	// Verificar que vive en Medellín O nació en Medellín O trabaja en Medellín
	const livesInMedellin =
		section2.cityOfResidence?.toLowerCase().includes('medellín') ||
		section2.cityOfResidence?.toLowerCase().includes('medellin')

	const bornInMedellin =
		section2.bornCity?.toLowerCase().includes('medellín') ||
		section2.bornCity?.toLowerCase().includes('medellin')

	const worksInMedellin = section2.worksInMedellin === true

	return livesInMedellin || bornInMedellin || worksInMedellin
}

/**
 * Obtiene el mensaje de inelegibilidad basado en los datos del aplicante
 */
export function getIneligibilityMessage(
	data: Partial<RegistrationFormData>
): string {
	const section2 = data.section2

	if (!section2) return 'Faltan datos para verificar elegibilidad'

	const age = calculateAge(section2.birthDate)
	const isMinor = age !== null && age < 18

	const livesInMedellin =
		section2.cityOfResidence?.toLowerCase().includes('medellín') ||
		section2.cityOfResidence?.toLowerCase().includes('medellin')

	const bornInMedellin =
		section2.bornCity?.toLowerCase().includes('medellín') ||
		section2.bornCity?.toLowerCase().includes('medellin')

	const worksInMedellin = section2.worksInMedellin === true

	if (isMinor && !livesInMedellin && !bornInMedellin && !worksInMedellin) {
		return 'Para continuar con el proceso completo debes ser mayor de 18 años Y (vivir en Medellín O haber nacido en Medellín O trabajar en Medellín).'
	} else if (isMinor) {
		return 'Para continuar con el proceso completo debes ser mayor de 18 años.'
	} else if (!livesInMedellin && !bornInMedellin && !worksInMedellin) {
		return 'Para continuar con el proceso completo debes vivir en Medellín, haber nacido en Medellín o trabajar en Medellín.'
	}

	return 'No cumples con los requisitos para el proceso completo.'
}
