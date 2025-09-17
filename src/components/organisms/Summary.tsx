'use client'

import { useFormStore } from '@/stores/formStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Sin acciones de envío aquí; el botón de Confirmar se mueve al footer del wizard

type Primitive = string | number | boolean | null | undefined

function display(value: Primitive | string[] | undefined): string {
	if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
	if (value === '' || value === undefined || value === null) return '—'
	if (typeof value === 'boolean') return value ? 'Sí' : 'No'
	return String(value)
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
	const { data, resetForm } = useFormStore()

	const s1 = data.section1
	const s2 = data.section2
	const s21 = data.section21
	const s3 = data.section3
	const s5 = data.section5
	const s6 = data.section6

	return (
		<div className='space-y-6'>
			<h2 className='text-xl font-semibold'>Resumen</h2>

			{s1 && (
				<Card>
					<CardHeader>
						<CardTitle>Información Personal</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Nombres'
							value={s1.firstName}
						/>
						<Kv
							label='Apellidos'
							value={s1.lastName}
						/>
						<Kv
							label='Tipo de documento'
							value={s1.documentType}
						/>
						<Kv
							label='Número de documento'
							value={s1.documentNumber}
						/>
						<Kv
							label='Correo electrónico'
							value={s1.email}
						/>
					</CardContent>
				</Card>
			)}

			{s2 && (
				<Card>
					<CardHeader>
						<CardTitle>Datos Personales</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Fecha de nacimiento'
							value={s2.birthDate}
						/>
						<Kv
							label='Ciudad de residencia'
							value={s2.cityOfResidence}
						/>
						<Kv
							label='Teléfono'
							value={s2.phone}
						/>
						<Kv
							label='Género'
							value={s2.gender}
						/>
						<Kv
							label='Orientación sexual'
							value={s2.sexualOrientation}
						/>
						<Kv
							label='Identidad de género'
							value={s2.genderIdentity}
						/>
					</CardContent>
				</Card>
			)}

			{s21 && (
				<Card>
					<CardHeader>
						<CardTitle>Representante</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Nombres representante'
							value={s21.representativeFirstName}
						/>
						<Kv
							label='Tipo documento rep.'
							value={s21.representativeDocumentType}
						/>
						<Kv
							label='Número documento rep.'
							value={s21.representativeDocumentNumber}
						/>
						<Kv
							label='Correo repres.'
							value={s21.representativeEmail}
						/>
					</CardContent>
				</Card>
			)}

			{s3 && (
				<Card>
					<CardHeader>
						<CardTitle>Ubicación</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='País de residencia'
							value={s3.countryOfResidence}
						/>
						<Kv
							label='Departamento'
							value={s3.departmentOfResidence}
						/>
						<Kv
							label='Ciudad'
							value={s3.cityOfResidence}
						/>
						<Kv
							label='Barrio'
							value={s3.neighborhood}
						/>
						{s3.commune !== undefined && (
							<Kv
								label='Comuna'
								value={s3.commune}
							/>
						)}
						<Kv
							label='Dirección'
							value={s3.address}
						/>
						<Kv
							label='Estrato'
							value={s3.stratum}
						/>
						<Kv
							label='Ciudad de nacimiento'
							value={s3.birthCity}
						/>
					</CardContent>
				</Card>
			)}

			{s5 && (
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
					</CardContent>
				</Card>
			)}

			{s6 && (
				<Card>
					<CardHeader>
						<CardTitle>Información Adicional</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						<Kv
							label='Víctima de violencia en Colombia'
							value={s6.violenceInColombia}
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
							label='Población'
							value={s6.population}
						/>
						<Kv
							label='Vendedor informal (ventero)'
							value={s6.ventero}
						/>
						<Kv
							label='Familia ventera'
							value={s6.familyVentero}
						/>
						<Kv
							label='Barrista'
							value={s6.barrista}
						/>
						<Kv
							label='Familia con discapacidad'
							value={s6.familyDisability}
						/>
						<Kv
							label='Etnias'
							value={s6.ethnicities}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
