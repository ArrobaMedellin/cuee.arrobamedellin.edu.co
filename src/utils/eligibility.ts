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

	if (!section2) {
		console.log('⚠️ No hay datos de section2')
		return false
	}

	// Verificar edad (mayor de 18 años)
	const age = calculateAge(section2.birthDate)
	console.log('🎂 Edad calculada:', age)
	if (age === null || age < 18) {
		console.log('❌ No cumple requisito de edad (menor de 18 años)')
		return false
	}

	// Verificar que vive en Medellín O nació en Medellín O trabaja en Medellín
	// IMPORTANTE: Solo se acepta la ciudad de "Medellín", NO otros municipios del área metropolitana
	// como La Estrella, Itagüí, Envigado, Sabaneta, Bello, Copacabana, Caldas, etc.
	const checkIsMedellin = (city: string | undefined): boolean => {
		if (!city) return false
		const normalized = city.toLowerCase().trim()
		const medellinVariations = ['medellin', 'medellín']

		// La ciudad debe contener "medellin" pero no debe ser otro municipio
		// Rechazamos explícitamente municipios del área metropolitana
		const metropolitanMunicipalities = [
			'la estrella',
			'itagui',
			'itagüí',
			'envigado',
			'sabaneta',
			'bello',
			'copacabana',
			'caldas',
			'girardota',
			'barbosa',
		]

		// Si es un municipio del área metropolitana, rechazarlo
		if (metropolitanMunicipalities.some(mun => normalized.includes(mun))) {
			return false
		}

		// Debe contener "medellin" o "medellín"
		return medellinVariations.some(variation => normalized.includes(variation))
	}

	const livesInMedellin = checkIsMedellin(section2.cityOfResidence)
	const bornInMedellin = checkIsMedellin(section2.bornCity)
	const worksInMedellin = section2.worksInMedellin === true

	console.log('🏙️ Verificación de Medellín:', {
		livesInMedellin,
		cityOfResidence: section2.cityOfResidence,
		bornInMedellin,
		bornCity: section2.bornCity,
		worksInMedellin,
	})

	const hasMedellinConnection =
		livesInMedellin || bornInMedellin || worksInMedellin

	console.log(
		hasMedellinConnection
			? '✅ Cumple requisito de conexión con Medellín'
			: '❌ NO cumple requisito de conexión con Medellín'
	)

	return hasMedellinConnection
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

	// Reutilizar la misma lógica de checkIsMedellin
	const checkIsMedellin = (city: string | undefined): boolean => {
		if (!city) return false
		const normalized = city.toLowerCase().trim()
		const medellinVariations = ['medellin', 'medellín']

		const metropolitanMunicipalities = [
			'la estrella',
			'itagui',
			'itagüí',
			'envigado',
			'sabaneta',
			'bello',
			'copacabana',
			'caldas',
			'girardota',
			'barbosa',
		]

		if (metropolitanMunicipalities.some(mun => normalized.includes(mun))) {
			return false
		}

		return medellinVariations.some(variation => normalized.includes(variation))
	}

	const livesInMedellin = checkIsMedellin(section2.cityOfResidence)
	const bornInMedellin = checkIsMedellin(section2.bornCity)
	const worksInMedellin = section2.worksInMedellin === true

	if (isMinor && !livesInMedellin && !bornInMedellin && !worksInMedellin) {
		return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas mayores de 18 años que hayan nacido en Medellín, residan en la ciudad o trabajen en alguna de sus empresas, según los criterios definidos para esta convocatoria.'
	} else if (isMinor) {
		return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas mayores de 18 años que hayan nacido en Medellín, residan en la ciudad o trabajen en alguna de sus empresas, según los criterios definidos para esta convocatoria.'
	} else if (!livesInMedellin && !bornInMedellin && !worksInMedellin) {
		return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas mayores de 18 años que hayan nacido en Medellín, residan en la ciudad o trabajen en alguna de sus empresas, según los criterios definidos para esta convocatoria.'
	}

	return 'Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas mayores de 18 años que hayan nacido en Medellín, residan en la ciudad o trabajen en alguna de sus empresas, según los criterios definidos para esta convocatoria.'
}
