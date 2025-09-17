import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { FormData } from '@/types/form'

interface FormStore {
	data: Partial<FormData>
	currentSection: number
	setSectionData: <K extends keyof FormData>(
		section: K,
		data: FormData[K]
	) => void
	setCurrentSection: (section: number) => void
	resetForm: () => void
	isSectionValid: (section: keyof FormData) => boolean
}

const initialData: Partial<FormData> = {
	section1: {
		firstName: '',
		lastName: '',
		documentType: '',
		documentNumber: '',
		email: '',
	},
	section2: {
		birthDate: '',
		cityOfResidence: '',
		phone: '',
		gender: '',
		sexualOrientation: '',
		genderIdentity: '',
	},
	section3: {
		countryOfResidence: '',
		departmentOfResidence: '',
		cityOfResidence: '',
		neighborhood: '',
		commune: '',
		address: '',
		stratum: '',
		birthCity: '',
	},
	section21: {
		representativeFirstName: '',
		representativeDocumentType: '',
		representativeDocumentNumber: '',
		representativeEmail: '',
	},
	section5: {
		healthSystem: '',
		internetConnection: '',
		devices: [],
		occupation: '',
		educationLevel: '',
		housingType: '',
		hasChildren: false,
		singleParent: false,
		pregnantOrLactating: false,
		dependents: 0,
	},
	section6: {
		violenceInColombia: false,
		accessibility: '',
		hasDisability: false,
		population: '',
		ventero: false,
		familyVentero: false,
		barrista: false,
		familyDisability: false,
		ethnicities: [],
	},
}

export const useFormStore = create<FormStore>()(
	persist(
		(set, get) => ({
			data: initialData,
			currentSection: 1,
			setSectionData: (section, data) =>
				set(state => ({
					data: { ...state.data, [section]: data },
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
			},
		}),
		{
			name: 'registration-form',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				data: state.data,
				currentSection: state.currentSection,
			}),
		}
	)
)
