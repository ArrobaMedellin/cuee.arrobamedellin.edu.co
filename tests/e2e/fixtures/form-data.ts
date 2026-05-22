export const APP_TITLE = 'Inscripciones Sapiencia'

export const validSection1 = {
	firstName: 'Juan Carlos',
	lastName: 'Pérez Gómez',
	documentType: 'CC',
	documentNumber: '1020304050',
	email: 'juan.perez+e2e@example.com',
	emailVerification: 'juan.perez+e2e@example.com',
	countryOfBirth: 'Colombia',
	departmentOfBirth: 'Antioquia',
	municipalityOfBirth: 'Medellín',
}

export const eligibleSection2 = {
	birthDateISO: '1995-01-15',
	cityOfResidence: 'Medellín',
	gender: 'Masculino',
	phone: '3001234567',
}

export const ineligibleSection2_minor = {
	birthDateISO: new Date(Date.now() - 10 * 365 * 24 * 3600 * 1000)
		.toISOString()
		.slice(0, 10),
	cityOfResidence: 'Medellín',
}

export const ineligibleSection2_wrongCity = {
	birthDateISO: '1995-01-15',
	cityOfResidence: 'Bogotá',
}

export const invalidEmails = [
	'plain-text',
	'missing@tld',
	'@nope.com',
	'spaces in@email.com',
]
