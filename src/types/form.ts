// Types for the registration form

export interface Section1 {
	firstName: string
	lastName: string
	documentType: string
	documentNumber: string
	email: string
}

export interface Section2 {
	birthDate: string
	cityOfResidence: string
	phone: string
	gender: string
	sexualOrientation: string
	genderIdentity: string
}

export interface Section21 {
	representativeFirstName: string
	representativeDocumentType: string
	representativeDocumentNumber: string
	representativeEmail: string
}

export interface Section3 {
	countryOfResidence: string
	departmentOfResidence: string
	cityOfResidence: string
	neighborhood: string
	commune?: string
	address: string
	stratum: string
	birthCity: string
}

export interface Section5 {
	healthSystem: string
	internetConnection: string
	devices: string[]
	occupation: string
	educationLevel: string
	housingType: string
	hasChildren: boolean
	numberOfChildren?: number
	singleParent: boolean
	firstChildAge?: number
	pregnantOrLactating: boolean
	dependents: number
}

export interface Section6 {
	violenceInColombia: boolean
	accessibility: string
	hasDisability: boolean
	population: string
	ventero: boolean
	familyVentero: boolean
	barrista: boolean
	familyDisability: boolean
	ethnicities: string[]
}

export interface FormData {
	section1: Section1
	section2: Section2
	section21?: Section21
	section3: Section3
	section5: Section5
	section6: Section6
}
