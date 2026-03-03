import { getCourseValuesFromApiIds } from '@/constants/courses'
import { ApiService } from '@/lib/api'
import { useFormStore } from '@/stores/formStore'
import { RegistrationFormData } from '@/types/form'
import { useState } from 'react'
import { toast } from 'sonner'

export interface ActiveEnrollmentInfo {
	courseName: string
}

interface UseAutofillFormReturn {
	isSearching: boolean
	searchByDocument: (documentNumber: string) => Promise<boolean>
	activeEnrollment: ActiveEnrollmentInfo | null
	clearActiveEnrollment: () => void
}

/**
 * Hook para buscar y autocompletar el formulario basado en el número de documento.
 * Utiliza el endpoint unificado getApplicantStatus para determinar el flujo:
 * - NEW: Usuario nuevo, debe completar todo el formulario
 * - REENROLLMENT: Usuario con matrículas finalizadas, puede reinscribirse (salta a sección 6)
 * - BLOCKED: Usuario con matrículas activas, no puede inscribirse
 */
export function useAutofillForm(): UseAutofillFormReturn {
	const [isSearching, setIsSearching] = useState(false)
	const [activeEnrollment, setActiveEnrollment] =
		useState<ActiveEnrollmentInfo | null>(null)
	const {
		data,
		setActiveEnrollmentCourse,
		setEnrollmentModalVisible,
		setCurrentSection,
		setMultipleSections,
		setDisabledCourses,
	} = useFormStore()

	const clearActiveEnrollment = () => setActiveEnrollment(null)

	// Helper para convertir valores unknown a string de forma segura
	const toStr = (value: unknown): string => {
		if (typeof value === 'string') return value
		if (value === null || value === undefined) return ''
		return String(value)
	}

	const toBool = (value: unknown): boolean => {
		if (typeof value === 'boolean') return value
		const normalized = toStr(value).toLowerCase()
		return ['si', 'sí', 'true', '1'].includes(normalized)
	}

	const toOptionalNumber = (value: unknown): number | undefined => {
		const num = Number(value)
		return Number.isFinite(num) ? num : undefined
	}

	const mapDevices = (applicant: Record<string, unknown>): string[] => {
		if (Array.isArray(applicant.devices)) {
			return applicant.devices.map(toStr).filter(Boolean)
		}

		const devices: string[] = []
		if (toBool(applicant.hasDesktopComputer)) devices.push('computador-mesa')
		if (toBool(applicant.hasLaptop)) devices.push('computador-portatil')
		if (toBool(applicant.hasTablet)) devices.push('tablet')
		if (toBool(applicant.hasSmartphone)) devices.push('celular-inteligente')
		if (toBool(applicant.hasNoDevice)) devices.push('ninguno')
		return devices
	}

	const mapDisabilityTypes = (applicant: Record<string, unknown>): string[] => {
		if (Array.isArray(applicant.disabilityTypes)) {
			return applicant.disabilityTypes.map(toStr).filter(Boolean)
		}

		const types = new Set<string>()
		if (toBool(applicant.hasAuditoryDisability)) types.add('auditiva')
		if (toBool(applicant.hasPhysicalDisability)) types.add('fisica')
		if (toBool(applicant.hasIntellectualDisability)) types.add('intelectual')
		if (toBool(applicant.hasVisualDisability)) types.add('visual')
		if (toBool(applicant.hasDeafblindness)) types.add('sordoceguera')
		if (toBool(applicant.hasPsychosocialDisability)) types.add('psicosocial')
		if (toBool(applicant.hasMultipleDisabilities)) types.add('multiple')
		if (toBool(applicant.prefersNotToAnswerDisability))
			types.add('prefiero no responder')
		return Array.from(types)
	}

	const mapVictimActs = (applicant: Record<string, unknown>): string[] => {
		if (Array.isArray(applicant.victimizingActs)) {
			return applicant.victimizingActs.map(toStr).filter(Boolean)
		}
		const acts: string[] = []
		if (toBool(applicant.isThreats)) acts.push('amenaza')
		if (toBool(applicant.isHomicide)) acts.push('homicidio')
		if (toBool(applicant.isKidnappingVictim)) acts.push('secuestro')
		if (toBool(applicant.isForcedDisplacement))
			acts.push('desplazamiento-forzado')
		if (toBool(applicant.isTortureVictim)) acts.push('tortura')
		return acts
	}

	const searchByDocument = async (documentNumber: string): Promise<boolean> => {
		if (!documentNumber || documentNumber.trim() === '') {
			toast.error('Por favor ingresa un número de documento')
			return false
		}

		setIsSearching(true)
		const apiService = new ApiService()

		try {
			// Usar el endpoint unificado para obtener el estado completo del aplicante
			const statusResponse = await apiService.getApplicantStatus(
				documentNumber.trim(),
			)

			// Si tiene matrículas activas, bloquear el flujo
			if (statusResponse.flowType === 'BLOCKED') {
				const courseName =
					statusResponse.activeEnrollments[0]?.courseName || 'un curso'
				setActiveEnrollment({ courseName })
				setActiveEnrollmentCourse(courseName)
				setEnrollmentModalVisible(true)
				setIsSearching(false)
				return false
			}

			// Si es usuario nuevo sin datos previos
			if (statusResponse.flowType === 'NEW' && !statusResponse.applicantData) {
				toast.info(
					'No se encontró ninguna inscripción previa con este documento',
				)
				return false
			}

			// Establecer los cursos deshabilitados (finalizados) en el store
			// Convertir los API IDs (códigos de curso) a valores del formulario
			if (statusResponse.disabledCourseIds.length > 0) {
				const disabledCourseValues = getCourseValuesFromApiIds(
					statusResponse.disabledCourseIds,
				)
				setDisabledCourses(disabledCourseValues)
				toast.info(
					`Tienes ${disabledCourseValues.length} curso(s) finalizado(s). Estos cursos aparecerán deshabilitados en la selección.`,
				)
			}

			// Si hay datos del aplicante, autocompletar el formulario
			if (statusResponse.applicantData) {
				await autofillFormData(statusResponse.applicantData)
			}

			// Si es reinscripción, redirigir directamente a la sección de selección de cursos
			if (statusResponse.flowType === 'REENROLLMENT') {
				setCurrentSection(6)
				toast.success(
					'¡Bienvenido de nuevo! Tus datos han sido cargados. Selecciona tu nuevo curso.',
				)
				return true
			}

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
		const mapped: Partial<RegistrationFormData> = {
			section1: {
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
			},
			section2: {
				birthDate: applicant.birthDate
					? new Date(toStr(applicant.birthDate)).toISOString().split('T')[0]
					: data.section2?.birthDate || '',
				countryOfResidence:
					toStr(applicant.residenceCountry) ||
					toStr(applicant.country) ||
					data.section2?.countryOfResidence ||
					'',
				departmentOfResidence:
					toStr(applicant.residenceDepartment) ||
					toStr(applicant.department) ||
					data.section2?.departmentOfResidence ||
					'',
				cityOfResidence:
					toStr(applicant.residenceMunicipality) ||
					toStr(applicant.city) ||
					data.section2?.cityOfResidence ||
					'',
				neighborhood:
					toStr(applicant.neighborhood) || data.section2?.neighborhood || '',
				commune: toStr(applicant.commune) || data.section2?.commune || '',
				neighborhoodId:
					toOptionalNumber(applicant.neighborhoodId) ??
					data.section2?.neighborhoodId,
				phone: toStr(applicant.cellphone) || data.section2?.phone || '',
				gender: toStr(applicant.gender) || data.section2?.gender || '',
				isPregnant:
					toStr(applicant.isExpectingMother || applicant.isPregnant) ||
					data.section2?.isPregnant ||
					'',
				age: toOptionalNumber(applicant.age) || data.section2?.age,
				representativeFirstName:
					toStr(applicant.representativeFirstName) ||
					toStr(applicant.legalGuardianName) ||
					data.section2?.representativeFirstName ||
					'',
				representativeDocumentType:
					toStr(applicant.representativeDocumentType) ||
					toStr(applicant.legalGuardianDocumentType) ||
					data.section2?.representativeDocumentType ||
					'',
				representativeDocumentNumber:
					toStr(applicant.representativeDocumentNumber) ||
					toStr(applicant.legalGuardianDocument) ||
					data.section2?.representativeDocumentNumber ||
					'',
				representativeEmail:
					toStr(applicant.representativeEmail) ||
					toStr(applicant.legalGuardianEmail) ||
					data.section2?.representativeEmail ||
					'',
				representativePhone:
					toStr(applicant.representativePhone) ||
					toStr(applicant.legalGuardianPhone) ||
					data.section2?.representativePhone ||
					'',
			},
			section3: {
				countryOfResidence:
					toStr(applicant.residenceCountry) ||
					data.section3?.countryOfResidence ||
					'',
				departmentOfResidence:
					toStr(applicant.residenceDepartment) ||
					data.section3?.departmentOfResidence ||
					'',
				cityOfResidence:
					toStr(applicant.residenceMunicipality) ||
					data.section3?.cityOfResidence ||
					'',
				neighborhood:
					toStr(applicant.neighborhood) || data.section3?.neighborhood || '',
				commune: toStr(applicant.commune) || data.section3?.commune || '',
				stratum: toStr(applicant.stratum) || data.section3?.stratum || '',
				isRuralZone:
					applicant.isRuralZone !== undefined
						? Boolean(applicant.isRuralZone)
						: data.section3?.isRuralZone || false,
				addressType:
					toStr(applicant.addressType) || data.section3?.addressType || '',
				addressNumber1:
					toStr(applicant.addressNumber1) ||
					data.section3?.addressNumber1 ||
					'',
				addressLetter1:
					toStr(applicant.addressLetter1) ||
					data.section3?.addressLetter1 ||
					'',
				addressOrientation1:
					toStr(applicant.addressOrientation1) ||
					data.section3?.addressOrientation1 ||
					'',
				addressNumber2:
					toStr(applicant.addressNumber2) ||
					data.section3?.addressNumber2 ||
					'',
				addressLetter2:
					toStr(applicant.addressLetter2) ||
					data.section3?.addressLetter2 ||
					'',
				addressOrientation2:
					toStr(applicant.addressOrientation2) ||
					data.section3?.addressOrientation2 ||
					'',
				addressNumber3:
					toStr(applicant.addressNumber3) ||
					data.section3?.addressNumber3 ||
					'',
				addressComplement:
					toStr(applicant.addressComplement) ||
					data.section3?.addressComplement ||
					'',
				fullAddress:
					toStr(applicant.fullAddress) || data.section3?.fullAddress || '',
				birthCity:
					toStr(applicant.bornCity || applicant.birthMunicipality) ||
					data.section3?.birthCity ||
					'',
				countryOfResidenceId:
					toOptionalNumber(applicant.countryOfResidenceId) ??
					data.section3?.countryOfResidenceId,
				departmentOfResidenceId:
					toOptionalNumber(applicant.departmentOfResidenceId) ??
					data.section3?.departmentOfResidenceId,
				cityOfResidenceId:
					toOptionalNumber(applicant.cityOfResidenceId) ??
					data.section3?.cityOfResidenceId,
				communeId:
					toOptionalNumber(applicant.communeId) ?? data.section3?.communeId,
				neighborhoodId:
					toOptionalNumber(applicant.neighborhoodId) ??
					data.section3?.neighborhoodId,
				birthCityId:
					toOptionalNumber(applicant.birthCityId) ?? data.section3?.birthCityId,
			},
			section4: {
				devices: mapDevices(applicant),
				housingType:
					toStr(applicant.housingType) || data.section4?.housingType || '',
				occupation:
					toStr(applicant.currentActivity) || data.section4?.occupation || '',
				otherOccupation:
					toStr(applicant.otherActivity) ||
					data.section4?.otherOccupation ||
					'',
				dependents:
					toOptionalNumber(applicant.dependents) ??
					data.section4?.dependents ??
					0,
				isInformalVendor:
					toBool(applicant.isInformalVendor) ||
					data.section4?.isInformalVendor ||
					false,
				isFamilyOfInformalVendor:
					toBool(applicant.isFamilyOfInformalVendor) ||
					data.section4?.isFamilyOfInformalVendor ||
					false,
				isFamilyCaregiver:
					toBool(applicant.isDisabilityCaregiver) ||
					data.section4?.isFamilyCaregiver ||
					false,
				isYouthCouncilor:
					toBool(applicant.isDistrictYouthCounselor) ||
					data.section4?.isYouthCouncilor ||
					false,
				isCertifiedBarrista:
					toBool(applicant.isBarrister) ||
					data.section4?.isCertifiedBarrista ||
					false,
				isVictimOfGenderViolence:
					toBool(applicant.isGenderViolenceVictim) ||
					data.section4?.isVictimOfGenderViolence ||
					false,
				belongsToSpecialPopulations:
					data.section4?.belongsToSpecialPopulations || false,
				specialPopulations: data.section4?.specialPopulations || [],
				healthSystem:
					toStr(applicant.healthAffiliation) ||
					data.section4?.healthSystem ||
					'',
				internetConnection:
					toStr(applicant.hasInternetConnection) ||
					data.section4?.internetConnection ||
					'',
				hasChildren:
					toBool(applicant.hasChildren) || data.section4?.hasChildren || false,
				numberOfChildren:
					toOptionalNumber(applicant.childrenCount) ??
					data.section4?.numberOfChildren,
				singleParent:
					toBool(applicant.isSingleParent) ||
					data.section4?.singleParent ||
					false,
				firstChildAge:
					toOptionalNumber(applicant.childAge) ?? data.section4?.firstChildAge,
				pregnantOrLactating:
					toBool(applicant.isExpectingMother) ||
					data.section4?.pregnantOrLactating ||
					false,
				isHeadOfHousehold:
					toBool(applicant.isHeadOfHousehold) ||
					data.section4?.isHeadOfHousehold ||
					false,
			},
			section5: {
				hasDisability:
					!toBool(applicant.hasNoDisability) ||
					mapDisabilityTypes(applicant).length > 0 ||
					data.section5?.hasDisability ||
					false,
				disabilityTypes:
					mapDisabilityTypes(applicant) || data.section5?.disabilityTypes || [],
				disabilityDescription:
					toStr(applicant.disabilityDescription) ||
					data.section5?.disabilityDescription ||
					'',
				requiresSupport:
					toBool(applicant.requiresSupport) ||
					data.section5?.requiresSupport ||
					false,
				supportType:
					toStr(applicant.supportType) || data.section5?.supportType || '',
				belongsToEthnicGroup:
					toBool(applicant.belongsToEthnicGroup) ||
					data.section5?.belongsToEthnicGroup ||
					false,
				ethnicGroups:
					toStr(applicant.ethnicGroups) || data.section5?.ethnicGroups || '',
				afroSubgroup:
					toStr(applicant.afroSubgroup) || data.section5?.afroSubgroup || '',
				indigenousPeople:
					toStr(applicant.indigenousPeople) ||
					data.section5?.indigenousPeople ||
					'',
				isViolenceVictim:
					toBool(applicant.isVictimOfViolence) ||
					data.section5?.isViolenceVictim ||
					false,
				victimizingActs:
					mapVictimActs(applicant) || data.section5?.victimizingActs || [],
				violenceType:
					toStr(applicant.violenceType) || data.section5?.violenceType || '',
				registeredWithVictimUnit:
					toBool(applicant.registeredWithVictimUnit) ||
					data.section5?.registeredWithVictimUnit ||
					false,
				victimRegistrationNumber:
					toStr(applicant.victimRegistrationNumber) ||
					data.section5?.victimRegistrationNumber ||
					'',
				isExcombatant:
					toBool(applicant.isExcombatant) ||
					data.section5?.isExcombatant ||
					false,
				isReintegrated:
					toBool(applicant.isReintegrated) ||
					data.section5?.isReintegrated ||
					false,
				isFamilyOfExcombatant:
					toBool(applicant.isFamilyOfExcombatant) ||
					data.section5?.isFamilyOfExcombatant ||
					false,
				isInternallyDisplaced:
					toBool(applicant.isInternallyDisplaced) ||
					data.section5?.isInternallyDisplaced ||
					false,
				isRefugee:
					toBool(applicant.isRefugee) || data.section5?.isRefugee || false,
				isFamilyCaregiver:
					toBool(applicant.isDisabilityCaregiver) ||
					data.section5?.isFamilyCaregiver ||
					false,
				isYouthCouncilor:
					toBool(applicant.isDistrictYouthCounselor) ||
					data.section5?.isYouthCouncilor ||
					false,
				isCertifiedBarrista:
					toBool(applicant.isBarrister) ||
					data.section5?.isCertifiedBarrista ||
					false,
				isMigrant:
					toBool(applicant.isMigrant) || data.section5?.isMigrant || false,
				isPeasant:
					toBool(applicant.isPeasant) || data.section5?.isPeasant || false,
				isVendor:
					toBool(applicant.isVendor) || data.section5?.isVendor || false,
				isVeteran:
					toBool(applicant.isVeteran) || data.section5?.isVeteran || false,
			},
			section6: {
				selectedCourses:
					(applicant.selectedCourses as string[]) ||
					data.section6?.selectedCourses ||
					[],
				howDidYouHear:
					toStr(applicant.howDidYouHear || applicant.foundOutAboutCall) ||
					data.section6?.howDidYouHear ||
					'',
				otherSource:
					toStr(applicant.otherSource || applicant.otherMedium) ||
					data.section6?.otherSource ||
					'',
			},
			section7: {
				graduationYear:
					toStr(applicant.graduationYear) ||
					data.section7?.graduationYear ||
					'',
				graduatedFrom:
					toStr(applicant.graduatedFrom) || data.section7?.graduatedFrom || '',
				hasIcfesPro:
					(toStr(
						applicant.hasIcfesPro,
					) as RegistrationFormData['section7']['hasIcfesPro']) ||
					data.section7?.hasIcfesPro ||
					'NO',
				icfesProScore:
					toStr(applicant.icfesProScore) || data.section7?.icfesProScore || '',
				icfesProYear:
					toStr(applicant.icfesProYear) || data.section7?.icfesProYear || '',
			},
		}

		// Nota: Los cursos deshabilitados ahora se manejan en searchByDocument
		// a través de setDisabledCourses(statusResponse.disabledCourseIds)
		setMultipleSections(mapped)
	}

	return {
		isSearching,
		searchByDocument,
		activeEnrollment,
		clearActiveEnrollment,
	}
}
