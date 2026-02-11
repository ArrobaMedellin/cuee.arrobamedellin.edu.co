import { getCourseApiIds } from '@/constants/courses'
import { RegistrationFormData } from '@/types/form'
import { calculateAge } from '@/utils/age'

// Define the DTO interface that matches the database structure exactly
export interface CreateApplicantDto {
	// Metadata
	period?: string

	// Información personal básica
	firstName: string
	lastName: string
	documentType: string
	otherDocument?: string
	document: string

	// Datos de nacimiento
	birthCountry: string
	birthDepartment: string
	birthMunicipality: string
	bornCity: string
	birthDate: string
	age: number

	// Género e identidad
	gender: string

	// Hijos y familia
	hasChildren?: string // 'SI' | 'NO'
	childrenCount?: number
	isSingleParent?: string // 'SI' | 'NO'
	childAge?: string
	isExpectingMother?: string

	// Salud
	healthAffiliation?: string

	// Tecnología y dispositivos
	hasInternetConnection?: string // 'SI' | 'NO'
	devices: string[]
	hasDesktopComputer?: string // 'SI' | 'NO'
	hasLaptop?: string // 'SI' | 'NO'
	hasTablet?: string // 'SI' | 'NO'
	hasSmartphone?: string // 'SI' | 'NO'
	hasNoDevice?: string // 'SI' | 'NO'

	// Vivienda y ocupación
	housingType?: string
	currentActivity?: string
	otherActivity?: string
	dependents?: string

	// Poblaciones especiales
	isInformalVendor?: string // 'SI' | 'NO'
	isFamilyOfInformalVendor?: string // 'SI' | 'NO'
	isDisabilityCaregiver?: string // 'SI' | 'NO'
	isDistrictYouthCounselor?: string // 'SI' | 'NO'
	isConflictDisplaced?: string // 'SI' | 'NO'
	isYouthInPenalSystem?: string // 'SI' | 'NO'
	isYouthWithRightsRestored?: string // 'SI' | 'NO'
	isReinserted?: string // 'SI' | 'NO'
	isPostPenitentiary?: string // 'SI' | 'NO'
	isGenderViolenceVictim?: string // 'SI' | 'NO'
	isNotInPoblation?: string // 'SI' | 'NO'
	isBarrister?: string // 'SI' | 'NO'
	isExcombatant?: string // 'SI' | 'NO'
	isFamilyOfExcombatant?: string // 'SI' | 'NO'
	isRefugee?: string // 'SI' | 'NO'
	isMigrant?: string // 'SI' | 'NO'
	isPeasant?: string // 'SI' | 'NO'
	isVendor?: string // 'SI' | 'NO'
	isVeteran?: string // 'SI' | 'NO'
	isHeadOfHousehold?: string // 'SI' | 'NO'

	// Ubicación de residencia
	stratum?: string
	residenceCountry: string
	residenceDepartment: string
	residenceMunicipality: string
	neighborhood?: string
	commune?: string

	// Campos de dirección
	addressType: string
	addressNumber1: string
	addressNumber2: string
	addressNumber3: string
	addressField1?: string
	addressField2?: string
	addressField3?: string
	addressField4?: string
	addressField5?: string
	addressField6?: string
	addressField7?: string
	addressField8?: string
	addressField9?: string
	showAddress?: string

	// Contacto
	cellphone: string
	secondaryCellphone?: string
	email: string
	confirmEmail?: string

	// Etnia
	isBlackPopulation?: string // 'SI' | 'NO'
	isAfrodescendant?: string // 'SI' | 'NO'
	isRaizal?: string // 'SI' | 'NO'
	isPalenquero?: string // 'SI' | 'NO'
	isIndigenous?: string // 'SI' | 'NO'
	isRomGypsy?: string // 'SI' | 'NO'
	prefersNotToAnswerEthnicity?: string // 'SI' | 'NO'
	isNotInAnyGroup?: string // 'SI' | 'NO'

	// Víctima de violencia
	isVictimOfViolence?: string // 'SI' | 'NO'
	isTerroristActVictim?: string // 'SI' | 'NO'
	hasThreats?: string // 'SI' | 'NO'
	hasFreedomOffenses?: string // 'SI' | 'NO'
	hasForcedDisappearance?: string // 'SI' | 'NO'
	hasForcedDisplacement?: string // 'SI' | 'NO'
	hasHomicide?: string // 'SI' | 'NO'
	isAntiPersonnelMineVictim?: string // 'SI' | 'NO'
	isKidnappingVictim?: string // 'SI' | 'NO'
	isTortureVictim?: string // 'SI' | 'NO'
	isLinkedToArmedGroups?: string // 'SI' | 'NO'
	hasLostAssets?: string // 'SI' | 'NO'
	hasPhysicalPersonalInjuries?: string // 'SI' | 'NO'
	isVictimOfTerroristActs?: string // 'SI' | 'NO'
	hasPsychologicalPersonalInjuries?: string // 'SI' | 'NO'
	hasConfinement?: string // 'SI' | 'NO'
	prefersNotToAnswerFact?: string // 'SI' | 'NO'

	// Discapacidad
	hasAuditoryDisability?: string // 'SI' | 'NO'
	hasPhysicalDisability?: string // 'SI' | 'NO'
	hasIntellectualDisability?: string // 'SI' | 'NO'
	hasVisualDisability?: string // 'SI' | 'NO'
	hasDeafblindness?: string // 'SI' | 'NO'
	hasPsychosocialDisability?: string // 'SI' | 'NO'
	hasMultipleDisabilities?: string // 'SI' | 'NO'
	hasNoDisability?: string // 'SI' | 'NO'
	requiresSupport?: string // 'SI' | 'NO'
	supportType?: string
	disabilityDescription?: string
	registeredWithVictimUnit?: string // 'SI' | 'NO'
	victimRegistrationNumber?: string

	// Cómo se enteró
	selectedCourses: string[]
	howDidYouHear: string
	foundOutAboutCall?: string
	otherMedium?: string

	// Información académica
	graduationYear?: string
	graduatedFrom?: string
	hasIcfesPro: string
	icfesProScore?: string
	icfesProYear?: string

	// Timestamp
	date?: string

	// Cursos seleccionados (para la relación many-to-many)
	courseIds: string[]
}

// Helper function to convert boolean to 'SI'/'NO' string
function boolToSiNo(value: boolean | undefined): string {
	if (value === undefined || value === null) return 'NO'
	return value ? 'SI' : 'NO'
}

// Helper function to map device array to individual device fields
function mapDevices(devices: string[] = []) {
	return {
		hasDesktopComputer: boolToSiNo(
			devices.includes('Computadora de escritorio'),
		),
		hasLaptop: boolToSiNo(devices.includes('Laptop')),
		hasTablet: boolToSiNo(devices.includes('Tablet')),
		hasSmartphone: boolToSiNo(devices.includes('Smartphone')),
		hasNoDevice: boolToSiNo(devices.includes('Ninguno')),
	}
}

// Helper function to map disability types
function mapDisabilityTypes(
	disabilityTypes: string[] = [],
	hasDisability: boolean = false,
) {
	if (!hasDisability) {
		return {
			hasAuditoryDisability: 'NO',
			hasPhysicalDisability: 'NO',
			hasIntellectualDisability: 'NO',
			hasVisualDisability: 'NO',
			hasDeafblindness: 'NO',
			hasPsychosocialDisability: 'NO',
			hasMultipleDisabilities: 'NO',
			hasNoDisability: 'SI',
		}
	}

	return {
		hasAuditoryDisability: boolToSiNo(disabilityTypes.includes('Auditiva')),
		hasPhysicalDisability: boolToSiNo(disabilityTypes.includes('Física')),
		hasIntellectualDisability: boolToSiNo(
			disabilityTypes.includes('Intelectual'),
		),
		hasVisualDisability: boolToSiNo(disabilityTypes.includes('Visual')),
		hasDeafblindness: boolToSiNo(disabilityTypes.includes('Sordoceguera')),
		hasPsychosocialDisability: boolToSiNo(
			disabilityTypes.includes('Psicosocial'),
		),
		hasMultipleDisabilities: boolToSiNo(disabilityTypes.includes('Múltiple')),
		hasNoDisability: 'NO',
	}
}

// Helper function to map ethnicity
function mapEthnicity(section5: RegistrationFormData['section5'] | undefined) {
	if (!section5?.belongsToEthnicGroup) {
		return {
			isBlackPopulation: 'NO',
			isAfrodescendant: 'NO',
			isRaizal: 'NO',
			isPalenquero: 'NO',
			isIndigenous: 'NO',
			isRomGypsy: 'NO',
			isNotInAnyGroup: 'SI',
		}
	}

	const ethnicGroup = section5.ethnicGroups || ''
	const afroSubgroup = section5.afroSubgroup || ''

	return {
		isBlackPopulation: boolToSiNo(
			ethnicGroup === 'Negro o de ascendencia afrocolombiana',
		),
		isAfrodescendant: boolToSiNo(afroSubgroup === 'Afrodescendiente'),
		isRaizal: boolToSiNo(
			afroSubgroup === 'Raizal del archipiélago de San Andrés y Providencia',
		),
		isPalenquero: boolToSiNo(
			afroSubgroup === 'Palenquero de San Basilio de Palenque',
		),
		isIndigenous: boolToSiNo(
			!!section5.indigenousPeople && section5.indigenousPeople.trim() !== '',
		),
		isRomGypsy: boolToSiNo(ethnicGroup === 'Rom (gitano)'),
		isNotInAnyGroup: 'NO',
	}
}

// Helper function to map victimizing acts
function mapVictimizingActs(
	victimizingActs: string[] = [],
	isVictim: boolean = false,
) {
	if (!isVictim) {
		return {
			isTerroristActVictim: 'NO',
			hasThreats: 'NO',
			hasFreedomOffenses: 'NO',
			hasForcedDisappearance: 'NO',
			hasForcedDisplacement: 'NO',
			hasHomicide: 'NO',
			isAntiPersonnelMineVictim: 'NO',
			isKidnappingVictim: 'NO',
			isTortureVictim: 'NO',
			isLinkedToArmedGroups: 'NO',
			hasLostAssets: 'NO',
			hasPhysicalPersonalInjuries: 'NO',
			isVictimOfTerroristActs: 'NO',
			hasPsychologicalPersonalInjuries: 'NO',
			hasConfinement: 'NO',
		}
	}

	return {
		isTerroristActVictim: boolToSiNo(
			victimizingActs.includes('Acto terrorista'),
		),
		hasThreats: boolToSiNo(victimizingActs.includes('Amenaza')),
		hasFreedomOffenses: boolToSiNo(
			victimizingActs.includes('Delitos contra la libertad'),
		),
		hasForcedDisappearance: boolToSiNo(
			victimizingActs.includes('Desaparición forzada'),
		),
		hasForcedDisplacement: boolToSiNo(
			victimizingActs.includes('Desplazamiento forzado'),
		),
		hasHomicide: boolToSiNo(victimizingActs.includes('Homicidio')),
		isAntiPersonnelMineVictim: boolToSiNo(
			victimizingActs.includes('Minas antipersonal'),
		),
		isKidnappingVictim: boolToSiNo(victimizingActs.includes('Secuestro')),
		isTortureVictim: boolToSiNo(victimizingActs.includes('Tortura')),
		isLinkedToArmedGroups: boolToSiNo(
			victimizingActs.includes('Vinculación a grupos armados'),
		),
		hasLostAssets: boolToSiNo(victimizingActs.includes('Pérdida de bienes')),
		hasPhysicalPersonalInjuries: boolToSiNo(
			victimizingActs.includes('Lesiones personales físicas'),
		),
		isVictimOfTerroristActs: boolToSiNo(
			victimizingActs.includes('Actos terroristas'),
		),
		hasPsychologicalPersonalInjuries: boolToSiNo(
			victimizingActs.includes('Lesiones psicológicas'),
		),
		hasConfinement: boolToSiNo(victimizingActs.includes('Confinamiento')),
	}
}

// Helper function to build address fields from section3
function buildAddressFields(
	section3: RegistrationFormData['section3'] | undefined,
) {
	if (!section3) return {}

	return {
		addressField1: section3.addressType || '',
		addressField2: section3.addressNumber1 || '',
		addressField3: section3.addressLetter1 || '',
		addressField4: section3.addressOrientation1 || '',
		addressField5: section3.addressNumber2 || '',
		addressField6: section3.addressLetter2 || '',
		addressField7: section3.addressOrientation2 || '',
		addressField8: section3.addressNumber3 || '',
		addressField9: section3.addressComplement || '',
		showAddress:
			section3.fullAddress ||
			`${section3.addressType || ''} ${section3.addressNumber1 || ''}${
				section3.addressLetter1 || ''
			} ${section3.addressOrientation1 || ''} # ${
				section3.addressNumber2 || ''
			}${section3.addressLetter2 || ''} ${
				section3.addressOrientation2 || ''
			} - ${section3.addressNumber3 || ''} ${section3.addressComplement || ''}`
				.trim()
				.replace(/\s+/g, ' '),
	}
}

// Mapper function to transform form data to API DTO
export function mapFormDataToDto(
	formData: Partial<RegistrationFormData>,
): CreateApplicantDto {
	const {
		section1,
		section2,
		section3,
		section4,
		section5,
		section6,
		section7,
	} = formData

	// Calculate age from birth date
	const age = section2?.birthDate ? calculateAge(section2.birthDate) || 0 : 0

	// Detectar si es un envío parcial (solo section1 y section2)
	const isPartialSubmit = !section3 && !section4 && !section5 && !section6

	console.log('🗺️ Mapper ejecutándose:', {
		isPartialSubmit,
		hasSection1: !!section1,
		hasSection2: !!section2,
		hasSection3: !!section3,
	})

	// Map course names to IDs using the configuration
	const courseIds = getCourseApiIds(section6?.selectedCourses || [])

	// Map devices to individual fields
	const deviceFields = mapDevices(section4?.devices)

	// Map disability types
	const disabilityFields = mapDisabilityTypes(
		section5?.disabilityTypes,
		section5?.hasDisability,
	)

	// Map ethnicity
	const ethnicityFields = mapEthnicity(section5)

	// Map victimizing acts
	const victimFields = mapVictimizingActs(
		section5?.victimizingActs,
		section5?.isViolenceVictim,
	)

	// Map address fields
	const addressFields = buildAddressFields(section3)

	return {
		// Metadata
		period: '32', // Default period, you might want to make this configurable
		date: new Date().toISOString(),

		// Información personal básica
		firstName: section1?.firstName || '',
		lastName: section1?.lastName || '',
		documentType: section1?.documentType || '',
		otherDocument:
			section1?.documentType === 'Otro'
				? section1?.otherDocumentType
				: undefined,
		document: section1?.documentNumber || '',

		// Datos de nacimiento
		birthCountry:
			section2?.countryOfResidence ||
			section3?.countryOfResidence ||
			'Colombia',
		birthDepartment:
			section2?.departmentOfResidence ||
			section3?.departmentOfResidence ||
			'N/A',
		birthMunicipality:
			section2?.cityOfResidence || section3?.cityOfResidence || 'N/A',
		bornCity:
			section2?.bornCity ||
			section2?.cityOfResidence ||
			section3?.cityOfResidence ||
			'N/A',
		birthDate: section2?.birthDate || '',
		age,

		// Género e identidad
		gender: section2?.gender || '',

		// Hijos y familia
		hasChildren: boolToSiNo(section4?.hasChildren),
		childrenCount: section4?.numberOfChildren,
		isSingleParent: boolToSiNo(section4?.singleParent),
		childAge: section4?.firstChildAge?.toString(),
		isExpectingMother:
			section2?.isPregnant || section4?.pregnantOrLactating ? 'SI' : 'NO',

		// Salud
		healthAffiliation: section4?.healthSystem,

		// Tecnología y dispositivos
		hasInternetConnection: section4?.internetConnection === 'SI' ? 'SI' : 'NO',
		devices: section4?.devices || [],
		...deviceFields,

		// Vivienda y ocupación
		housingType: section4?.housingType,
		currentActivity:
			section4?.occupation === 'Otro' ? undefined : section4?.occupation,
		otherActivity:
			section4?.occupation === 'Otro' ? section4?.otherOccupation : undefined,
		dependents: section4?.dependents?.toString(),

		// Poblaciones especiales
		isInformalVendor: boolToSiNo(section4?.isInformalVendor),
		isFamilyOfInformalVendor: boolToSiNo(section4?.isFamilyOfInformalVendor),
		isDisabilityCaregiver: boolToSiNo(
			section4?.isFamilyCaregiver || section5?.isFamilyCaregiver,
		),
		isDistrictYouthCounselor: boolToSiNo(
			section4?.isYouthCouncilor || section5?.isYouthCouncilor,
		),
		isConflictDisplaced: boolToSiNo(section5?.isInternallyDisplaced),
		isYouthInPenalSystem: 'NO', // No hay campo específico en el formulario
		isYouthWithRightsRestored: 'NO', // No hay campo específico en el formulario
		isReinserted: boolToSiNo(section5?.isReintegrated),
		isPostPenitentiary: 'NO', // No hay campo específico en el formulario
		isGenderViolenceVictim: 'NO', // Movido de section4 a section5, pero no existe en el tipo
		isNotInPoblation: boolToSiNo(!section4?.belongsToSpecialPopulations),
		isBarrister: boolToSiNo(
			section4?.isCertifiedBarrista || section5?.isCertifiedBarrista,
		),
		isExcombatant: boolToSiNo(section5?.isExcombatant),
		isFamilyOfExcombatant: boolToSiNo(section5?.isFamilyOfExcombatant),
		isRefugee: boolToSiNo(section5?.isRefugee),
		isMigrant: boolToSiNo(section5?.isMigrant),
		isPeasant: boolToSiNo(section5?.isPeasant),
		isVendor: boolToSiNo(section5?.isVendor),
		isVeteran: boolToSiNo(section5?.isVeteran),
		isHeadOfHousehold: boolToSiNo(section4?.isHeadOfHousehold),

		// Ubicación de residencia - con valores por defecto para envío parcial
		stratum: section3?.stratum || (isPartialSubmit ? 'N/A' : ''),
		residenceCountry:
			section2?.countryOfResidence ||
			section3?.countryOfResidence ||
			'Colombia',
		residenceDepartment:
			section2?.departmentOfResidence ||
			section3?.departmentOfResidence ||
			(section2?.countryOfResidence &&
			section2.countryOfResidence !== 'Colombia'
				? 'N/A'
				: '') ||
			(isPartialSubmit ? 'N/A' : ''),
		residenceMunicipality:
			section2?.cityOfResidence ||
			section3?.cityOfResidence ||
			(section2?.countryOfResidence &&
			section2.countryOfResidence !== 'Colombia'
				? 'N/A'
				: '') ||
			(isPartialSubmit ? 'N/A' : ''),
		neighborhood:
			section2?.neighborhood ||
			section3?.neighborhood ||
			(isPartialSubmit ? 'N/A' : ''),
		commune:
			section2?.commune || section3?.commune || (isPartialSubmit ? 'N/A' : ''),

		// Campos de dirección - con valores por defecto para envío parcial
		addressType: section3?.addressType || (isPartialSubmit ? 'N/A' : 'CARRERA'),
		addressNumber1: section3?.addressNumber1 || (isPartialSubmit ? 'N/A' : ''),
		addressNumber2: section3?.addressNumber2 || (isPartialSubmit ? 'N/A' : ''),
		addressNumber3: section3?.addressNumber3 || (isPartialSubmit ? 'N/A' : ''),
		...addressFields,

		// Contacto
		cellphone: section2?.phone || '',
		secondaryCellphone: section2?.representativePhone,
		email: section1?.email || '',
		confirmEmail: section1?.emailVerification,

		// Etnia
		...ethnicityFields,

		// Víctima de violencia
		isVictimOfViolence: boolToSiNo(section5?.isViolenceVictim),
		...victimFields,
		prefersNotToAnswerFact: 'NO', // No hay campo específico

		// Discapacidad
		...disabilityFields,
		requiresSupport: boolToSiNo(section5?.requiresSupport),
		supportType: section5?.supportType || undefined,
		disabilityDescription: section5?.disabilityDescription || undefined,
		registeredWithVictimUnit: boolToSiNo(section5?.registeredWithVictimUnit),
		victimRegistrationNumber: section5?.victimRegistrationNumber || undefined,

		// Cómo se enteró
		selectedCourses: section6?.selectedCourses || [],
		howDidYouHear: section6?.howDidYouHear || 'N/A',
		foundOutAboutCall:
			section6?.howDidYouHear === 'otro' ? undefined : section6?.howDidYouHear,
		otherMedium:
			section6?.howDidYouHear === 'otro' ? section6?.otherSource : undefined,

		// Información académica (Section 7) - Solo incluir si tienen valores válidos
		// graduationYear: debe tener al menos 4 caracteres si se envía
		...(section7?.graduationYear &&
		section7.graduationYear.trim() !== '' &&
		section7.graduationYear.trim().length >= 4
			? { graduationYear: section7.graduationYear.trim() }
			: {}),
		// graduatedFrom: debe tener al menos 1 carácter si se envía
		...(section7?.graduatedFrom &&
		section7.graduatedFrom.trim() !== '' &&
		section7.graduatedFrom.trim().length >= 1
			? { graduatedFrom: section7.graduatedFrom.trim() }
			: {}),
		// hasIcfesPro: siempre se envía, por defecto 'NO'
		hasIcfesPro: section7?.hasIcfesPro || 'NO',
		// icfesProScore: solo si hasIcfesPro es 'SI' y tiene valor
		...(section7?.hasIcfesPro === 'SI' &&
		section7?.icfesProScore &&
		section7.icfesProScore.trim() !== ''
			? { icfesProScore: section7.icfesProScore.trim() }
			: {}),
		// icfesProYear: solo si hasIcfesPro es 'SI' y tiene al menos 4 caracteres
		...(section7?.hasIcfesPro === 'SI' &&
		section7?.icfesProYear &&
		section7.icfesProYear.trim() !== '' &&
		section7.icfesProYear.trim().length >= 4
			? { icfesProYear: section7.icfesProYear.trim() }
			: {}),

		// Cursos seleccionados
		courseIds,
	}
}

// Update DTO interface for partial updates
export type UpdateApplicantDto = Partial<CreateApplicantDto>
