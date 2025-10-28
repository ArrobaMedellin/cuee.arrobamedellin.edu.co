import { RegistrationFormData } from '@/types/form'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FormStore {
	data: Partial<RegistrationFormData>
	currentSection: number
	setSectionData: <K extends keyof RegistrationFormData>(
		section: K,
		data: RegistrationFormData[K]
	) => void
	setCurrentSection: (section: number) => void
	resetForm: () => void
	isSectionValid: (section: keyof RegistrationFormData) => boolean
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
		otherDocumentType: ''
	},
	section2: {
		birthDate: '',
		bornCity: '',
		countryOfResidence: '',
		departmentOfResidence: '',
		cityOfResidence: '',
		neighborhood: '',
		commune: '',
		phone: '',
		gender: '',
		isPregnant: '',
		sexualOrientation: '',
		genderIdentity: '',
		age: 0,
		otherSexualOrientation: '',
		representativeFirstName: '',
		representativeDocumentType: '',
		representativeDocumentNumber: '',
		representativeEmail: '',
		representativePhone: ''
	},
	section3: {
		countryOfResidence: '',
		departmentOfResidence: '',
		cityOfResidence: '',
		neighborhood: '',
		commune: '',
		stratum: '',
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
		birthCityId: undefined
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
		pregnantOrLactating: false
	},
	section21: {
		representativeFirstName: '',
		representativeDocumentType: '',
		representativeDocumentNumber: '',
		representativeEmail: ''
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
		isCertifiedBarrista: false
	},
	section6: {
		selectedCourses: [],
		howDidYouHear: '',
		otherSource: ''
	},
	section7: {
		graduationYear: '',
		graduatedFrom: '',
		hasIcfesPro: 'NO' as const,
		icfesProScore: '',
		icfesProYear: ''
	}
}

export const useFormStore = create<FormStore>()(
	persist(
		(set, get) => ({
			data: initialData,
			currentSection: 1,
			setSectionData: (section, data) =>
				set(state => ({
					data: { ...state.data, [section]: data }
				})),
			setCurrentSection: section => set({ currentSection: section }),
			resetForm: () => set({ data: initialData, currentSection: 1 }),
			isSectionValid: section => {
				const sectionData = get().data[section]
				return sectionData
					? Object.values(sectionData).every(
							value => value !== '' && value !== undefined && value !== null
					  )
					: false
			}
		}),
		{
			name: 'registration-form',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				data: state.data,
				currentSection: state.currentSection
			})
		}
	)
)
