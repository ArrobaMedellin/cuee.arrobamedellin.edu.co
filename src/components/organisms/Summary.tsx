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
} from '@/types/form'
// Sin acciones de envío aquí; el botón de Confirmar se mueve al footer del wizard

type Primitive = string | number | boolean | null | undefined
type SectionData =
	| Section1
	| Section2
	| Section21
	| Section3
	| Section4
	| Section5
	| Section6

function display(value: Primitive | string[] | undefined): string {
	if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
	if (value === '' || value === undefined || value === null) return '—'
	if (typeof value === 'boolean') return value ? 'Sí' : 'No'
	return String(value)
}

// Función para verificar si una sección tiene datos reales (no solo valores por defecto)
function hasRealData(section: SectionData | undefined): boolean {
	if (!section) return false

	// Verificar si tiene al menos un campo con datos reales
	return Object.values(section).some(value => {
		if (typeof value === 'string') return value !== ''
		if (typeof value === 'number') return value !== 0
		if (typeof value === 'boolean') return true // Los booleanos siempre son válidos
		if (Array.isArray(value)) return value.length > 0
		return value !== null && value !== undefined
	})
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
							value={s1?.documentType}
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
							label='Ciudad de residencia'
							value={s2?.cityOfResidence}
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
							value={s2?.sexualOrientation}
						/>
						<Kv
							label='Identidad de género'
							value={s2?.genderIdentity}
						/>
					</CardContent>
				</Card>
			)}

			{s21 && hasRealData(s21) && (
				<Card>
					<CardHeader>
						<CardTitle>Representante</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Nombres representante'
							value={s21?.representativeFirstName}
						/>
						<Kv
							label='Tipo documento rep.'
							value={s21?.representativeDocumentType}
						/>
						<Kv
							label='Número documento rep.'
							value={s21?.representativeDocumentNumber}
						/>
						<Kv
							label='Correo repres.'
							value={s21?.representativeEmail}
						/>
					</CardContent>
				</Card>
			)}

			{s3 && hasRealData(s3) && (
				<Card>
					<CardHeader>
						<CardTitle>Ubicación</CardTitle>
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
						{s3?.commune !== undefined && (
							<Kv
								label='Comuna'
								value={s3?.commune}
							/>
						)}
						<Kv
							label='Dirección'
							value={
								s3?.fullAddress ||
								`${s3?.addressType} ${s3?.addressNumber1}${
									s3?.addressLetter1 || ''
								} ${s3?.addressOrientation1 || ''} # ${s3?.addressNumber2}${
									s3?.addressLetter2 || ''
								} ${s3?.addressOrientation2 || ''} - ${s3?.addressNumber3} ${
									s3?.addressComplement || ''
								}`.trim()
							}
						/>
						<Kv
							label='Estrato'
							value={s3?.stratum}
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
							value={s4.selectedCourses.join(', ')}
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
							label='Ocupación'
							value={s5.occupation}
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
							label='Tiene hijos'
							value={s5.hasChildren}
						/>
						{s5.numberOfChildren !== undefined && (
							<Kv
								label='Número de hijos'
								value={s5.numberOfChildren}
							/>
						)}
						<Kv
							label='Cabeza de hogar'
							value={s5.singleParent}
						/>
						{s5.firstChildAge !== undefined && (
							<Kv
								label='Edad del primer hijo'
								value={s5.firstChildAge}
							/>
						)}
						<Kv
							label='Gestante o lactante'
							value={s5.pregnantOrLactating}
						/>
						<Kv
							label='Personas a cargo'
							value={s5.dependents}
						/>
						<Kv
							label='Vendedor informal (ventero)'
							value={s5.isInformalVendor}
						/>
						<Kv
							label='Familia ventera'
							value={s5.isFamilyOfInformalVendor}
						/>
					</CardContent>
				</Card>
			)}

			{s6 && hasRealData(s6) && (
				<Card>
					<CardHeader>
						<CardTitle>Información Adicional</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Víctima de violencia en Colombia'
							value={s6.isViolenceVictim}
						/>
						<Kv
							label='Accesibilidad'
							value={s6.accessibility}
						/>
						<Kv
							label='Con discapacidad'
							value={s6.hasDisability}
						/>
						<Kv
							label='Grupos étnicos'
							value={s6.ethnicGroups}
						/>
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
		</div>
	)
}
