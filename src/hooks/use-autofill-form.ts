import { ApiService } from '@/lib/api'
import { useFormStore } from '@/stores/formStore'
import { useState } from 'react'
import { toast } from 'sonner'

interface UseAutofillFormReturn {
	isSearching: boolean
	searchByDocument: (documentNumber: string) => Promise<boolean>
}

/**
 * Hook para buscar y autocompletar el formulario basado en el número de documento
 */
export function useAutofillForm(): UseAutofillFormReturn {
	const [isSearching, setIsSearching] = useState(false)
	const { setSectionData, data } = useFormStore()

	// Helper para convertir valores unknown a string de forma segura
	const toStr = (value: unknown): string => {
		if (typeof value === 'string') return value
		if (value === null || value === undefined) return ''
		return String(value)
	}

	// Helper para convertir valores unknown a number de forma segura
	const toNum = (value: unknown): number => {
		if (typeof value === 'number') return value
		if (value === null || value === undefined) return 0
		const num = Number(value)
		return isNaN(num) ? 0 : num
	}

	const searchByDocument = async (documentNumber: string): Promise<boolean> => {
		if (!documentNumber || documentNumber.trim() === '') {
			toast.error('Por favor ingresa un número de documento')
			return false
		}

		setIsSearching(true)
		const apiService = new ApiService()

		try {
			const applicant = await apiService.findApplicantByDocument(
				documentNumber.trim(),
			)

			if (!applicant) {
				toast.info(
					'No se encontró ninguna inscripción previa con este documento',
				)
				return false
			}

			// Autocompletar el formulario con los datos encontrados
			await autofillFormData(applicant)

			toast.success(
				'¡Datos encontrados! El formulario se ha rellenado automáticamente',
			)
			return true
		} catch (error) {
			console.error('Error searching for applicant:', error)
			toast.error('Error al buscar en la base de datos. Intenta nuevamente')
			return false
		} finally {
			setIsSearching(false)
		}
	}

	const autofillFormData = async (applicant: Record<string, unknown>) => {
		// Solo autocompletar Section 1 y Section 2

		// Mapear Section 1 - Información Personal
		if (applicant.firstName || applicant.lastName || applicant.email) {
			setSectionData('section1', {
				firstName: toStr(applicant.firstName) || data.section1?.firstName || '',
				lastName: toStr(applicant.lastName) || data.section1?.lastName || '',
				documentType:
					toStr(applicant.documentType) || data.section1?.documentType || '',
				otherDocumentType:
					toStr(applicant.otherDocument) ||
					data.section1?.otherDocumentType ||
					'',
				documentNumber:
					toStr(applicant.document) || data.section1?.documentNumber || '',
				email: toStr(applicant.email) || data.section1?.email || '',
				emailVerification:
					toStr(applicant.email) || data.section1?.emailVerification || '',
				countryOfBirth:
					toStr(applicant.birthCountry) || data.section1?.countryOfBirth || '',
				departmentOfBirth:
					toStr(applicant.birthDepartment) ||
					data.section1?.departmentOfBirth ||
					'',
				municipalityOfBirth:
					toStr(applicant.birthMunicipality) ||
					data.section1?.municipalityOfBirth ||
					'',
			})
		}

		// Mapear Section 2 - Datos Personales
		setSectionData('section2', {
			birthDate: applicant.birthDate
				? new Date(toStr(applicant.birthDate)).toISOString().split('T')[0]
				: data.section2?.birthDate || '',
			bornCity: toStr(applicant.birthCity) || data.section2?.bornCity || '',
			countryOfResidence:
				toStr(applicant.country) || data.section2?.countryOfResidence || '',
			departmentOfResidence:
				toStr(applicant.department) ||
				data.section2?.departmentOfResidence ||
				'',
			cityOfResidence:
				toStr(applicant.city) || data.section2?.cityOfResidence || '',
			neighborhood:
				toStr(applicant.neighborhood) || data.section2?.neighborhood || '',
			commune: toStr(applicant.commune) || data.section2?.commune || '',
			phone: toStr(applicant.cellphone) || data.section2?.phone || '',
			gender: toStr(applicant.gender) || data.section2?.gender || '',
			isPregnant:
				toStr(applicant.isExpectingMother) || data.section2?.isPregnant || '',
			sexualOrientation:
				toStr(applicant.sexualOrientation) ||
				data.section2?.sexualOrientation ||
				'',
			genderIdentity:
				toStr(applicant.genderIdentity) || data.section2?.genderIdentity || '',
			age: toNum(applicant.age) || data.section2?.age || 0,
			otherSexualOrientation:
				toStr(applicant.otherOrientation) ||
				data.section2?.otherSexualOrientation ||
				'',
			representativeFirstName:
				toStr(applicant.legalGuardianName) ||
				data.section2?.representativeFirstName ||
				'',
			representativeDocumentType:
				toStr(applicant.legalGuardianDocumentType) ||
				data.section2?.representativeDocumentType ||
				'',
			representativeDocumentNumber:
				toStr(applicant.legalGuardianDocument) ||
				data.section2?.representativeDocumentNumber ||
				'',
			representativeEmail:
				toStr(applicant.legalGuardianEmail) ||
				data.section2?.representativeEmail ||
				'',
			representativePhone:
				toStr(applicant.legalGuardianPhone) ||
				data.section2?.representativePhone ||
				'',
		})
	}

	return {
		isSearching,
		searchByDocument,
	}
}
