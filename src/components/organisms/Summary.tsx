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
	Section7,
} from '@/types/form'
import { calculateAge } from '@/utils/age'

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

// Mapeo de valores de "Cómo se enteró" a sus labels
const howDidYouHearLabels: Record<string, string> = {
	facebook: 'Redes sociales - Facebook',
	'x-twitter': 'Redes sociales - X',
	instagram: 'Redes sociales - Instagram',
	linkedin: 'Redes sociales - Linkedin',
	tiktok: 'Redes sociales - TikTok',
	'medios-digitales': 'Medios de comunicación digitales',
	'medios-tradicionales':
		'Medios de comunicación tradicionales (radio, televisión, prensa)',
	recomendacion: 'Recomendación de un conocido',
	'stand-informativo': 'Stand informativo en algún lugar de la ciudad',
	otro: 'Otro',
}

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
	value,
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

	// Calcular edad si hay fecha de nacimiento
	const calculatedAge = s2?.birthDate ? calculateAge(s2.birthDate) : null

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
							value={calculatedAge !== null ? calculatedAge : '—'}
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
						{s2?.isPregnant && (
							<Kv
								label='¿Está embarazada o en lactancia?'
								value={s2?.isPregnant}
							/>
						)}
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

			{s21 &&
				hasRealData(s21) &&
				(s21.representativeFirstName ||
					s21.representativeDocumentType ||
					s21.representativeDocumentNumber ||
					s21.representativeEmail) && (
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
					</CardContent>
				</Card>
			)}

			{s4 && hasRealData(s4) && (
				<Card>
					<CardHeader>
						<CardTitle>Información Socioeconómica</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Dispositivos tecnológicos'
							value={s4.devices}
						/>
						<Kv
							label='Tipo de vivienda'
							value={s4.housingType}
						/>
						<Kv
							label='Ocupación/Actividad actual'
							value={
								s4.occupation === 'otro' ? s4.otherOccupation : s4.occupation
							}
						/>
						<Kv
							label='Personas a cargo'
							value={s4.dependents}
						/>
						<Kv
							label='Sistema de salud'
							value={s4.healthSystem}
						/>
						<Kv
							label='Conexión a internet'
							value={s4.internetConnection}
						/>
						<Kv
							label='Tiene hijos'
							value={s4.hasChildren}
						/>
						{s4.hasChildren && s4.numberOfChildren && (
							<Kv
								label='Número de hijos'
								value={s4.numberOfChildren}
							/>
						)}
						{s4.hasChildren && s4.firstChildAge && (
							<Kv
								label='Edad del primer hijo'
								value={s4.firstChildAge}
							/>
						)}
						<Kv
							label='Cabeza de familia'
							value={s4.singleParent}
						/>
						<Kv
							label='Embarazada o en lactancia'
							value={s4.pregnantOrLactating}
						/>
						<Kv
							label='Es vendedor informal'
							value={s4.isInformalVendor}
						/>
						<Kv
							label='Es familiar de vendedor informal'
							value={s4.isFamilyOfInformalVendor}
						/>
						<Kv
							label='Es cuidador familiar'
							value={s4.isFamilyCaregiver}
						/>
						<Kv
							label='Es concejal juvenil'
							value={s4.isYouthCouncilor}
						/>
						<Kv
							label='Es barrista certificado'
							value={s4.isCertifiedBarrista}
						/>
						<Kv
							label='Pertenece a poblaciones especiales'
							value={s4.belongsToSpecialPopulations}
						/>
						{s4.belongsToSpecialPopulations &&
							s4.specialPopulations &&
							s4.specialPopulations.length > 0 && (
								<Kv
									label='Poblaciones especiales'
									value={s4.specialPopulations}
								/>
							)}
					</CardContent>
				</Card>
			)}

			{s5 && hasRealData(s5) && (
				<Card>
					<CardHeader>
						<CardTitle>Características Especiales</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{/* Discapacidad */}
						<Kv
							label='Tiene discapacidad'
							value={s5.hasDisability}
						/>
						{s5.hasDisability &&
							s5.disabilityTypes &&
							s5.disabilityTypes.length > 0 && (
								<Kv
									label='Tipos de discapacidad'
									value={s5.disabilityTypes}
								/>
							)}
						{s5.disabilityDescription && (
							<Kv
								label='Descripción de discapacidad'
								value={s5.disabilityDescription}
							/>
						)}
						{s5.requiresSupport && (
							<Kv
								label='Requiere apoyo'
								value={s5.requiresSupport}
							/>
						)}
						{s5.supportType && (
							<Kv
								label='Tipo de apoyo'
								value={s5.supportType}
							/>
						)}

						{/* Grupos étnicos */}
						<Kv
							label='Pertenece a grupo étnico'
							value={s5.belongsToEthnicGroup}
						/>
						{s5.belongsToEthnicGroup && s5.ethnicGroups && (
							<Kv
								label='Grupo étnico'
								value={s5.ethnicGroups}
							/>
						)}
						{s5.afroSubgroup && (
							<Kv
								label='Subgrupo Afrodescendiente'
								value={s5.afroSubgroup}
							/>
						)}
						{s5.indigenousPeople && (
							<Kv
								label='Pueblo Indígena'
								value={s5.indigenousPeople}
							/>
						)}

						{/* Víctima de violencia */}
						<Kv
							label='Es víctima del conflicto armado'
							value={s5.isViolenceVictim}
						/>
						{s5.isViolenceVictim &&
							s5.victimizingActs &&
							s5.victimizingActs.length > 0 && (
								<Kv
									label='Hechos victimizantes'
									value={s5.victimizingActs}
								/>
							)}
						{s5.registeredWithVictimUnit && (
							<Kv
								label='Registrado en Unidad de Víctimas'
								value={s5.registeredWithVictimUnit}
							/>
						)}
						{s5.victimRegistrationNumber && (
							<Kv
								label='Número de registro'
								value={s5.victimRegistrationNumber}
							/>
						)}

						{/* Poblaciones especiales */}
						<Kv
							label='Es excombatiente'
							value={s5.isExcombatant}
						/>
						<Kv
							label='Es reintegrado'
							value={s5.isReintegrated}
						/>
						<Kv
							label='Es familiar de excombatiente'
							value={s5.isFamilyOfExcombatant}
						/>
						<Kv
							label='Es desplazado interno'
							value={s5.isInternallyDisplaced}
						/>
						<Kv
							label='Es refugiado'
							value={s5.isRefugee}
						/>
						<Kv
							label='Es cuidador familiar'
							value={s5.isFamilyCaregiver}
						/>
						<Kv
							label='Es concejal juvenil'
							value={s5.isYouthCouncilor}
						/>
						<Kv
							label='Es barrista certificado'
							value={s5.isCertifiedBarrista}
						/>
					</CardContent>
				</Card>
			)}

			{s6 && hasRealData(s6) && (
				<Card>
					<CardHeader>
						<CardTitle>Cursos y Comunicación</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Cursos seleccionados'
							value={s6.selectedCourses}
						/>
						<Kv
							label='¿Cómo se enteró de la convocatoria?'
							value={
								s6.howDidYouHear
									? s6.howDidYouHear === 'otro'
										? s6.otherSource || '—'
										: howDidYouHearLabels[s6.howDidYouHear] || s6.howDidYouHear
									: '—'
							}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
