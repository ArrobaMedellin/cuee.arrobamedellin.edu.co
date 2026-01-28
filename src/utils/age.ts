/**
 * Calcula la edad en años basada en la fecha de nacimiento
 * @param birthDate - Fecha de nacimiento en formato string (YYYY-MM-DD)
 * @returns Edad en años o null si la fecha es inválida
 */
export function calculateAge(birthDate: string): number | null {
	if (!birthDate) return null

	const birth = new Date(birthDate)
	const today = new Date()

	// Verificar que la fecha sea válida
	if (isNaN(birth.getTime())) return null

	// Verificar que la fecha no sea futura
	if (birth > today) return null

	let age = today.getFullYear() - birth.getFullYear()
	const monthDifference = today.getMonth() - birth.getMonth()

	// Si no ha llegado al mes de cumpleaños o es el mes pero no ha llegado al día
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birth.getDate())
	) {
		age--
	}

	return age
}

/**
 * Verifica si una persona es menor de edad (menor de 15 años)
 * @param birthDate - Fecha de nacimiento en formato string (YYYY-MM-DD)
 * @returns true si es menor de edad, false en caso contrario
 */
export function isMinor(birthDate: string): boolean {
	const age = calculateAge(birthDate)
	return age !== null && age < 15
}

/**
 * Verifica si una fecha es válida y no es futura
 * @param birthDate - Fecha de nacimiento en formato string (YYYY-MM-DD)
 * @returns true si la fecha es válida, false en caso contrario
 */
export function isValidBirthDate(birthDate: string): boolean {
	if (!birthDate) return false

	const birth = new Date(birthDate)
	const today = new Date()

	// Verificar que la fecha sea válida y no sea futura
	return !isNaN(birth.getTime()) && birth <= today
}
