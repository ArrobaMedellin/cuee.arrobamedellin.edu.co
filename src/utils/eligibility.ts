import { RegistrationFormData } from '@/types/form'
import { calculateAge } from './age'

/**
 * Verifica si el aplicante es elegible para continuar con el proceso completo
 * Requisitos:
 * - Igual o mayor a 15 años
 * - Vive en Medellín O nació en Medellín
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
	if (!section2.birthDate || !section2.cityOfResidence) {
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

	// Verificar que vive en Medellín O nació en Medellín
	const livesInMedellin =
		section2.cityOfResidence?.toLowerCase().includes('medellín') ||
		section2.cityOfResidence?.toLowerCase().includes('medellin')

	const bornInMedellin =
		section2.cityOfResidence?.toLowerCase().includes('medellín') ||
		section2.cityOfResidence?.toLowerCase().includes('medellin')

	console.log('🏙️ Verificación de Medellín:', {
		livesInMedellin,
		cityOfResidence: section2.cityOfResidence,
		bornInMedellin,
	})

	const hasMedellinConnection = livesInMedellin || bornInMedellin

	console.log(
		hasMedellinConnection
			? '✅ Cumple requisito de conexión con Medellín'
			: '❌ NO cumple requisito de conexión con Medellín',
	)

	return hasMedellinConnection
}

/**
 * Obtiene el mensaje de inelegibilidad basado en los datos del aplicante
 */
export function getIneligibilityMessage(
	data: Partial<RegistrationFormData>,
): string {
	const section2 = data.section2

	if (!section2) return 'Faltan datos para verificar elegibilidad'

	const age = calculateAge(section2.birthDate)
	const isTooYoung = age !== null && age < 15

	const checkIsMedellin = (city: string | undefined): boolean => {
		if (!city) return false
		const normalized = city.toLowerCase().trim()
		const medellinVariations = ['medellin', 'medellín']
		return medellinVariations.some(v => normalized.includes(v))
	}

	const livesInMedellin = checkIsMedellin(section2.cityOfResidence)
	const bornInMedellin = checkIsMedellin(section2.cityOfResidence)

	if (isTooYoung && !livesInMedellin && !bornInMedellin) {
		return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas de 15 años o más que hayan nacido en Medellín o residan en la ciudad, según los criterios definidos para esta convocatoria.'
	} else if (isTooYoung) {
		return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas de 15 años o más que hayan nacido en Medellín o residan en la ciudad, según los criterios definidos para esta convocatoria.'
	} else if (!livesInMedellin && !bornInMedellin) {
		return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas de 15 años o más que hayan nacido en Medellín o residan en la ciudad, según los criterios definidos para esta convocatoria.'
	}

	return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas de 15 años o más que hayan nacido en Medellín o residan en la ciudad, según los criterios definidos para esta convocatoria.'
}
