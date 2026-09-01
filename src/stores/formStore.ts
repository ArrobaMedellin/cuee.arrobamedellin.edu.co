import { section1Schema } from '@/schemas/section1'
import { section2Schema } from '@/schemas/section2'
import { section3Schema } from '@/schemas/section3'
import { section4Schema } from '@/schemas/section4'
import { section5Schema } from '@/schemas/section5'
import { section6Schema } from '@/schemas/section6'
import { surveySchema } from '@/schemas/survey'
import { RegistrationFormData } from '@/types/form'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FormStore {
	data: Partial<RegistrationFormData>
	currentSection: number
	activeEnrollmentCourse: string | null
	enrollmentModalVisible: boolean
	disabledCourses: string[]
	// Se vuelve true solo cuando el usuario recorre el wizard de la encuesta
	// hasta la última pregunta y esta queda válida. Evita que el botón
	// "Siguiente" principal se habilite solo porque los datos persistidos
	// (de una sesión anterior) ya son válidos sin haber recorrido el wizard.
	surveyWizardCompleted: boolean
	setSectionData: <K extends keyof RegistrationFormData>(
		section: K,
		data: RegistrationFormData[K],
	) => void
	setCurrentSection: (section: number) => void
	resetForm: () => void
	isSectionValid: (section: keyof RegistrationFormData) => boolean
	setMultipleSections: (data: Partial<RegistrationFormData>) => void
	setActiveEnrollmentCourse: (course: string | null) => void
	setEnrollmentModalVisible: (visible: boolean) => void
	setDisabledCourses: (courses: string[]) => void
	setSurveyWizardCompleted: (completed: boolean) => void
}

const initialData: Partial<RegistrationFormData> = {
	section1: {
		firstName: '',
		lastName: '',
		documentType: '',
		documentNumber: '',
		email: '',
		emailVerification: '',
		countryOfBirth: '',
		departmentOfBirth: '',
		municipalityOfBirth: '',
		otherDocumentType: '',
	},
	section2: {
		birthDate: '',
		countryOfResidence: '',
		departmentOfResidence: '',
		cityOfResidence: '',
		neighborhood: '',
		commune: '',
		phone: '',
		gender: '',
		isPregnant: '',
		age: 0,
		representativeFirstName: '',
		representativeDocumentType: '',
		representativeDocumentNumber: '',
		representativeEmail: '',
		representativePhone: '',
	},
	section3: {
		countryOfResidence: '',
		departmentOfResidence: '',
		cityOfResidence: '',
		neighborhood: '',
		commune: '',
		stratum: '',
		isRuralZone: false,
		addressType: '',
		addressNumber1: '',
		addressLetter1: '',
		addressOrientation1: '',
		addressNumber2: '',
		addressLetter2: '',
		addressOrientation2: '',
		addressNumber3: '',
		addressComplement: '',
		fullAddress: '',
		birthCity: '',
		countryOfResidenceId: undefined,
		departmentOfResidenceId: undefined,
		cityOfResidenceId: undefined,
		communeId: undefined,
		neighborhoodId: undefined,
		birthCityId: undefined,
	},
	section4: {
		devices: [],
		housingType: '',
		occupation: '',
		otherOccupation: '',
		dependents: 0,
		isInformalVendor: false,
		isFamilyOfInformalVendor: false,
		isFamilyCaregiver: false,
		isYouthCouncilor: false,
		isCertifiedBarrista: false,
		belongsToSpecialPopulations: false,
		specialPopulations: [],
		healthSystem: '',
		internetConnection: '',
		hasChildren: false,
		numberOfChildren: undefined,
		singleParent: false,
		firstChildAge: undefined,
		pregnantOrLactating: false,
		// Propiedades añadidas para coincidir con el esquema zod (section4Schema)
		isVictimOfGenderViolence: false,
		isHeadOfHousehold: false,
	},
	section21: {
		representativeFirstName: '',
		representativeDocumentType: '',
		representativeDocumentNumber: '',
		representativeEmail: '',
	},
	section5: {
		hasDisability: false,
		disabilityTypes: [],
		disabilityDescription: '',
		requiresSupport: false,
		supportType: '',
		belongsToEthnicGroup: false,
		ethnicGroups: '',
		afroSubgroup: '',
		indigenousPeople: '',
		isViolenceVictim: false,
		victimizingActs: [],
		violenceType: '',
		registeredWithVictimUnit: false,
		victimRegistrationNumber: '',
		isExcombatant: false,
		isReintegrated: false,
		isFamilyOfExcombatant: false,
		isInternallyDisplaced: false,
		isRefugee: false,
		isFamilyCaregiver: false,
		isYouthCouncilor: false,
		isCertifiedBarrista: false,
		// Propiedades añadidas para coincidir con el esquema zod (section5Schema)
		isMigrant: false,
		isPeasant: false,
		isVendor: false,
		isVeteran: false,
	},
	section6: {
		company: '',
		selectedCourses: [],
		howDidYouHear: '',
		otherSource: '',
	},
	section7: {
		graduationYear: '',
		graduatedFrom: '',
		hasIcfesPro: 'NO' as const,
		icfesProScore: '',
		icfesProYear: '',
	},
	survey: {
		car01: '',
		car01Other: '',
		car02: '',
		car02Other: '',
		car03: '',
		car04: '',
		car05: [],
		car06: '',
		car07: '',
		car08: '',
		car08Other: '',
	},
}

export const useFormStore = create<FormStore>()(
	persist(
		(set, get) => ({
			data: initialData,
			currentSection: 1,
			activeEnrollmentCourse: null,
			enrollmentModalVisible: false,
			disabledCourses: [],
			surveyWizardCompleted: false,
			setSectionData: (section, data) =>
				set(state => ({
					data: { ...state.data, [section]: data },
				})),
			setMultipleSections: newData =>
				set(state => ({
					data: { ...state.data, ...newData },
				})),
			setCurrentSection: section => set({ currentSection: section }),
			resetForm: () =>
				set({
					data: initialData,
					currentSection: 1,
					activeEnrollmentCourse: null,
					enrollmentModalVisible: false,
					disabledCourses: [],
					surveyWizardCompleted: false,
				}),
			setActiveEnrollmentCourse: course =>
				set({ activeEnrollmentCourse: course }),
			setEnrollmentModalVisible: visible =>
				set({ enrollmentModalVisible: visible }),
			setDisabledCourses: courses => set({ disabledCourses: courses }),
			setSurveyWizardCompleted: completed =>
				set({ surveyWizardCompleted: completed }),
			isSectionValid: section => {
				const sectionData = get().data[section]
				if (!sectionData) return false

				try {
					// Validar usando los esquemas Zod correspondientes
					switch (section) {
						case 'section1':
							section1Schema.parse(sectionData)
							return true
						case 'section2':
							section2Schema.parse(sectionData)
							return true
						case 'section3':
							section3Schema.parse(sectionData)
							return true
						case 'section4':
							section4Schema.parse(sectionData)
							return true
						case 'section5':
							section5Schema.parse(sectionData)
							return true
						case 'section6':
							section6Schema.parse(sectionData)
							return true
						case 'survey':
							surveySchema.parse(sectionData)
							return true
						case 'section7':
						case 'section21':
							// Estas secciones son opcionales
							return true
						default:
							return false
					}
				} catch {
					return false
				}
			},
		}),
		{
			name: 'registration-form',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				data: state.data,
				currentSection: state.currentSection,
				disabledCourses: state.disabledCourses,
				surveyWizardCompleted: state.surveyWizardCompleted,
			}),
		},
	),
)
