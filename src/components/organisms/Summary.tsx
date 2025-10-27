'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormStore } from '@/stores/formStore'
import type {
	Section1,
	Section2,
	Section21,
	Section3,
	Section4,
	Section5,
	Section6,
	Section7
} from '@/types/form'

type Primitive = string | number | boolean | null | undefined
type SectionData =
	| Section1
	| Section2
	| Section21
	| Section3
	| Section4
	| Section5
	| Section6
	| Section7

function display(value: Primitive | string[] | undefined): string {
	if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
	if (value === '' || value === undefined || value === null) return '—'
	if (typeof value === 'boolean') return value ? 'Sí' : 'No'
	return String(value)
}

// Función para verificar si una sección existe
function hasRealData(section: SectionData | undefined): boolean {
	return section !== undefined && section !== null
}

function Kv({
	label,
	value
}: {
	label: string
	value: Primitive | string[] | undefined
}) {
	return (
		<div className='min-w-0'>
			<div className='text-xs font-medium text-muted-foreground'>{label}</div>
			<div className='mt-1 break-words text-sm font-semibold text-foreground'>
				{display(value)}
			</div>
		</div>
	)
}

export function Summary() {
	const { data } = useFormStore()

	const s1 = data.section1
	const s2 = data.section2
	const s21 = data.section21
	const s3 = data.section3
	const s4 = data.section4
	const s5 = data.section5
	const s6 = data.section6
	const s7 = data.section7

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-semibold'>Resumen</h2>

			{s1 && hasRealData(s1) && (
				<Card>
					<CardHeader>
						<CardTitle>Información Personal</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Nombres'
							value={s1?.firstName}
						/>
						<Kv
							label='Apellidos'
							value={s1?.lastName}
						/>
						<Kv
							label='Tipo de documento'
							value={
								s1?.documentType === 'Otro'
									? s1?.otherDocumentType
									: s1?.documentType
							}
						/>
						<Kv
							label='Número de documento'
							value={s1?.documentNumber}
						/>
						<Kv
							label='Correo electrónico'
							value={s1?.email}
						/>
						<Kv
							label='País de nacimiento'
							value={s1?.countryOfBirth}
						/>
						<Kv
							label='Departamento de nacimiento'
							value={s1?.departmentOfBirth}
						/>
						<Kv
							label='Municipio de nacimiento'
							value={s1?.municipalityOfBirth}
						/>
					</CardContent>
				</Card>
			)}

			{s2 && hasRealData(s2) && (
				<Card>
					<CardHeader>
						<CardTitle>Datos Personales</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Fecha de nacimiento'
							value={s2?.birthDate}
						/>
						<Kv
							label='Edad'
							value={s2?.age}
						/>
						<Kv
							label='Ciudad de nacimiento'
							value={s2?.bornCity}
						/>
						<Kv
							label='Ciudad de residencia'
							value={s2?.cityOfResidence}
						/>
						<Kv
							label='Comuna'
							value={s2?.commune}
						/>
						<Kv
							label='Barrio'
							value={s2?.neighborhood}
						/>
						<Kv
							label='Teléfono'
							value={s2?.phone}
						/>
						<Kv
							label='Género'
							value={s2?.gender}
						/>
						<Kv
							label='Orientación sexual'
							value={
								s2?.sexualOrientation === 'Otro'
									? s2?.otherSexualOrientation
									: s2?.sexualOrientation
							}
						/>
						<Kv
							label='Identidad de género'
							value={s2?.genderIdentity}
						/>

						{/* Campos del representante legal si es menor de edad */}
						{(s2?.representativeFirstName ||
							s2?.representativeDocumentType ||
							s2?.representativeDocumentNumber ||
							s2?.representativeEmail ||
							s2?.representativePhone) && (
							<>
								<div className='col-span-full'>
									<hr className='my-4' />
									<h4 className='font-semibold text-sm text-muted-foreground'>
										Representante Legal
									</h4>
								</div>
								{s2?.representativeFirstName && (
									<Kv
										label='Nombres del representante'
										value={s2?.representativeFirstName}
									/>
								)}
								{s2?.representativeDocumentType && (
									<Kv
										label='Tipo de documento del representante'
										value={s2?.representativeDocumentType}
									/>
								)}
								{s2?.representativeDocumentNumber && (
									<Kv
										label='Número de documento del representante'
										value={s2?.representativeDocumentNumber}
									/>
								)}
								{s2?.representativeEmail && (
									<Kv
										label='Correo del representante'
										value={s2?.representativeEmail}
									/>
								)}
								{s2?.representativePhone && (
									<Kv
										label='Teléfono del representante'
										value={s2?.representativePhone}
									/>
								)}
							</>
						)}
					</CardContent>
				</Card>
			)}

			{s21 && hasRealData(s21) && (
				<Card>
					<CardHeader>
						<CardTitle>Información del Representante</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Nombres del representante'
							value={s21?.representativeFirstName}
						/>
						<Kv
							label='Tipo de documento'
							value={s21?.representativeDocumentType}
						/>
						<Kv
							label='Número de documento'
							value={s21?.representativeDocumentNumber}
						/>
						<Kv
							label='Correo electrónico'
							value={s21?.representativeEmail}
						/>
					</CardContent>
				</Card>
			)}

			{s3 && hasRealData(s3) && (
				<Card>
					<CardHeader>
						<CardTitle>Ubicación y Residencia</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='País de residencia'
							value={s3?.countryOfResidence}
						/>
						<Kv
							label='Departamento'
							value={s3?.departmentOfResidence}
						/>
						<Kv
							label='Ciudad'
							value={s3?.cityOfResidence}
						/>
						<Kv
							label='Barrio'
							value={s3?.neighborhood}
						/>
						{s3?.commune && (
							<Kv
								label='Comuna'
								value={s3?.commune}
							/>
						)}
						<Kv
							label='Estrato'
							value={s3?.stratum}
						/>
						<Kv
							label='Dirección completa'
							value={
								s3?.fullAddress ||
								`${s3?.addressType || ''} ${s3?.addressNumber1 || ''}${
									s3?.addressLetter1 || ''
								} ${s3?.addressOrientation1 || ''} # ${
									s3?.addressNumber2 || ''
								}${s3?.addressLetter2 || ''} ${
									s3?.addressOrientation2 || ''
								} - ${s3?.addressNumber3 || ''} ${s3?.addressComplement || ''}`
									.trim()
									.replace(/\s+/g, ' ')
							}
						/>
						<Kv
							label='Ciudad de nacimiento'
							value={s3?.birthCity}
						/>
					</CardContent>
				</Card>
			)}

			{s4 && hasRealData(s4) && (
				<Card>
					<CardHeader>
						<CardTitle>Información Educativa</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Año de graduación'
							value={s4.graduationYear}
						/>
						<Kv
							label='Institución donde se graduó'
							value={s4.graduatedFrom}
						/>
						<Kv
							label='Cursos seleccionados'
							value={
								Array.isArray(s4.selectedCourses) ? s4.selectedCourses : []
							}
						/>
						<Kv
							label='Tiene ICFES Pro'
							value={s4.hasIcfesPro}
						/>
						{s4.hasIcfesPro === 'SI' && (
							<>
								<Kv
									label='Puntaje ICFES Pro'
									value={s4.icfesProScore}
								/>
								<Kv
									label='Año ICFES Pro'
									value={s4.icfesProYear}
								/>
							</>
						)}
					</CardContent>
				</Card>
			)}

			{s5 && hasRealData(s5) && (
				<Card>
					<CardHeader>
						<CardTitle>Información Socioeconómica</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Sistema de salud'
							value={s5.healthSystem}
						/>
						<Kv
							label='Conexión a internet'
							value={s5.internetConnection}
						/>
						<Kv
							label='Dispositivos'
							value={s5.devices}
						/>
						<Kv
							label='Ocupación/Actividad actual'
							value={
								s5.occupation === 'otro' ? s5.otherOccupation : s5.occupation
							}
						/>
						<Kv
							label='Nivel educativo'
							value={s5.educationLevel}
						/>
						<Kv
							label='Tipo de vivienda'
							value={s5.housingType}
						/>
						<Kv
							label='Personas en la familia'
							value={s5.familyMembers}
						/>
						<Kv
							label='Estado laboral'
							value={s5.workStatus}
						/>
						{s5.monthlyIncome && (
							<Kv
								label='Ingresos mensuales'
								value={s5.monthlyIncome}
							/>
						)}
						<Kv
							label='Personas a cargo'
							value={s5.dependents}
						/>

						{/* Información maternal */}
						<Kv
							label='Gestante'
							value={s5.isPregnant}
						/>
						<Kv
							label='Lactante'
							value={s5.isLactating}
						/>

						{/* Información de hijos */}
						{s5.hasChildren && s5.hasChildren.length > 0 && (
							<>
								<Kv
									label='Tiene hijos'
									value={s5.hasChildren}
								/>
								{s5.numberOfChildren !== undefined && (
									<Kv
										label='Número de hijos'
										value={s5.numberOfChildren}
									/>
								)}
								{s5.firstChildAge !== undefined && (
									<Kv
										label='Edad del primer hijo'
										value={s5.firstChildAge}
									/>
								)}
							</>
						)}

						{s5.singleParent && s5.singleParent.length > 0 && (
							<Kv
								label='Cabeza de hogar'
								value={s5.singleParent}
							/>
						)}

						{s5.pregnantOrLactating && s5.pregnantOrLactating.length > 0 && (
							<Kv
								label='Gestante o lactante'
								value={s5.pregnantOrLactating}
							/>
						)}

						{/* Vendedor informal */}
						{s5.isInformalVendor && s5.isInformalVendor.length > 0 && (
							<Kv
								label='Vendedor informal (ventero)'
								value={s5.isInformalVendor}
							/>
						)}
						{s5.isFamilyOfInformalVendor &&
							s5.isFamilyOfInformalVendor.length > 0 && (
								<Kv
									label='Familia ventera'
									value={s5.isFamilyOfInformalVendor}
								/>
							)}

						{/* Otras características */}
						{s5.isFamilyCaregiver && s5.isFamilyCaregiver.length > 0 && (
							<Kv
								label='Cuidador familiar'
								value={s5.isFamilyCaregiver}
							/>
						)}
						{s5.isYouthCouncilor && s5.isYouthCouncilor.length > 0 && (
							<Kv
								label='Concejal juvenil'
								value={s5.isYouthCouncilor}
							/>
						)}
						{s5.isCertifiedBarrista && s5.isCertifiedBarrista.length > 0 && (
							<Kv
								label='Barrista certificado'
								value={s5.isCertifiedBarrista}
							/>
						)}

						{/* Poblaciones especiales */}
						{s5.belongsToSpecialPopulations &&
							s5.specialPopulations &&
							s5.specialPopulations.length > 0 && (
								<Kv
									label='Poblaciones especiales'
									value={s5.specialPopulations}
								/>
							)}

						{/* Seguridad social */}
						{s5.socialSecurityContributions &&
							s5.socialSecurityContributions.length > 0 && (
								<Kv
									label='Aportes a seguridad social'
									value={s5.socialSecurityContributions}
								/>
							)}

						{/* Información laboral adicional */}
						{s5.graduationToEmploymentTime && (
							<Kv
								label='Tiempo graduación-empleo'
								value={s5.graduationToEmploymentTime}
							/>
						)}
						{s5.englishLevel && (
							<Kv
								label='Nivel de inglés'
								value={s5.englishLevel}
							/>
						)}
						{s5.jobSearchAreas && s5.jobSearchAreas.length > 0 && (
							<Kv
								label='Áreas de búsqueda laboral'
								value={s5.jobSearchAreas}
							/>
						)}
						{s5.otherJobSearchArea && (
							<Kv
								label='Otra área de búsqueda'
								value={s5.otherJobSearchArea}
							/>
						)}
						{s5.salaryExpectationsMet && (
							<Kv
								label='Expectativas salariales cumplidas'
								value={s5.salaryExpectationsMet}
							/>
						)}
						{s5.jobSatisfaction && (
							<Kv
								label='Satisfacción laboral'
								value={s5.jobSatisfaction}
							/>
						)}
						{s5.remoteWorkOption && (
							<Kv
								label='Opción trabajo remoto'
								value={s5.remoteWorkOption}
							/>
						)}
						{s5.remoteWorkSpace && (
							<Kv
								label='Espacio para trabajo remoto'
								value={s5.remoteWorkSpace}
							/>
						)}

						{/* Competencias y capacitación */}
						{s5.emotionalSalaryOptions &&
							s5.emotionalSalaryOptions.length > 0 && (
								<Kv
									label='Opciones de salario emocional'
									value={s5.emotionalSalaryOptions}
								/>
							)}
						{s5.missingCompetencies && s5.missingCompetencies.length > 0 && (
							<Kv
								label='Competencias faltantes'
								value={s5.missingCompetencies}
							/>
						)}
						{s5.otherMissingCompetencies && (
							<Kv
								label='Otras competencias faltantes'
								value={s5.otherMissingCompetencies}
							/>
						)}
					</CardContent>
				</Card>
			)}

			{s6 && hasRealData(s6) && (
				<Card>
					<CardHeader>
						<CardTitle>Información Adicional</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{/* Discapacidad */}
						<Kv
							label='Tiene discapacidad'
							value={s6.hasDisability}
						/>
						{s6.hasDisability &&
							s6.disabilityTypes &&
							s6.disabilityTypes.length > 0 && (
								<Kv
									label='Tipos de discapacidad'
									value={s6.disabilityTypes}
								/>
							)}
						{s6.disabilityDescription && (
							<Kv
								label='Descripción de discapacidad'
								value={s6.disabilityDescription}
							/>
						)}
						{s6.requiresSupport !== undefined && (
							<Kv
								label='Requiere apoyo'
								value={s6.requiresSupport}
							/>
						)}
						{s6.supportType && (
							<Kv
								label='Tipo de apoyo'
								value={s6.supportType}
							/>
						)}{' '}
						{/* Grupos étnicos */}
						<Kv
							label='Pertenece a grupo étnico'
							value={s6.belongsToEthnicGroup}
						/>
						{s6.belongsToEthnicGroup &&
							s6.ethnicGroups &&
							s6.ethnicGroups.length > 0 && (
								<Kv
									label='Grupos étnicos'
									value={s6.ethnicGroups}
								/>
							)}
						{s6.afroSubgroup && (
							<Kv
								label='Subgrupo Afrodescendiente'
								value={s6.afroSubgroup}
							/>
						)}
						{s6.indigenousPeople && (
							<Kv
								label='Pueblo Indígena'
								value={s6.indigenousPeople}
							/>
						)}
						{/* Víctima de violencia */}
						<Kv
							label='Víctima de violencia en Colombia'
							value={s6.isViolenceVictim}
						/>
						{s6.isViolenceVictim &&
							s6.victimizingActs &&
							s6.victimizingActs.length > 0 && (
								<Kv
									label='Hechos victimizantes'
									value={s6.victimizingActs}
								/>
							)}
						{s6.violenceType && (
							<Kv
								label='Tipo de violencia'
								value={s6.violenceType}
							/>
						)}
						{s6.registeredWithVictimUnit !== undefined && (
							<Kv
								label='Registrado en Unidad de Víctimas'
								value={s6.registeredWithVictimUnit}
							/>
						)}
						{s6.victimRegistrationNumber && (
							<Kv
								label='Número de registro de víctima'
								value={s6.victimRegistrationNumber}
							/>
						)}
						{/* Poblaciones especiales del conflicto */}
						<Kv
							label='Es excombatiente'
							value={s6.isExcombatant}
						/>
						<Kv
							label='Es reintegrado'
							value={s6.isReintegrated}
						/>
						<Kv
							label='Familia de excombatiente'
							value={s6.isFamilyOfExcombatant}
						/>
						<Kv
							label='Desplazado interno'
							value={s6.isInternallyDisplaced}
						/>
						<Kv
							label='Es refugiado'
							value={s6.isRefugee}
						/>
						{/* Otras características */}
						<Kv
							label='Cuidador familiar'
							value={s6.isFamilyCaregiver}
						/>
						<Kv
							label='Concejal juvenil'
							value={s6.isYouthCouncilor}
						/>
						<Kv
							label='Barrista certificado'
							value={s6.isCertifiedBarrista}
						/>
					</CardContent>
				</Card>
			)}

			{s7 && hasRealData(s7) && (
				<Card>
					<CardHeader>
						<CardTitle>Selección de Cursos y Referencia</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Cursos seleccionados'
							value={
								Array.isArray(s7.selectedCourses) ? s7.selectedCourses : []
							}
						/>
						<Kv
							label='¿Cómo se enteró de la convocatoria?'
							value={s7.howDidYouHear}
						/>
						{s7.otherSource && (
							<Kv
								label='Otro medio (especifique)'
								value={s7.otherSource}
							/>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	)
}
