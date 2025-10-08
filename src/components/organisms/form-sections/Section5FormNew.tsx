'use client'

import { MultiCheckboxField } from '@/components/atoms/multi-checkbox-field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
	DEVICE_OPTIONS,
	HOUSING_TYPE_OPTIONS,
	OCCUPATION_OPTIONS,
	SPECIAL_POPULATIONS,
} from '@/constants'
import type { Section5Form } from '@/schemas/section5'
import { section5Schema } from '@/schemas/section5'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function Section5Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section5Form>({
		resolver: zodResolver(section5Schema),
		defaultValues: data.section5 || {
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
			specialPopulations: [],
			healthSystem: '',
			educationLevel: '',
			internetConnection: '',
			hasChildren: false,
			numberOfChildren: undefined,
			singleParent: false,
			firstChildAge: undefined,
			pregnantOrLactating: false,
			socialSecurityContributions: [],
			emotionalSalaryOptions: [],
			missingCompetencies: [],
			otherMissingCompetencies: '',
			graduationToEmploymentTime: '',
			englishLevel: '',
			jobSearchAreas: [],
			otherJobSearchArea: '',
			salaryExpectationsMet: '',
			jobSatisfaction: '',
			remoteWorkOption: '',
			remoteWorkSpace: '',
		},
	})

	const hasChildren = form.watch('hasChildren')
	const occupation = form.watch('occupation')

	const onSubmit = (values: Section5Form) => {
		setSectionData('section5', values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				{/* Dispositivos tecnológicos */}
				<Card>
					<CardHeader>
						<CardTitle>Dispositivos Tecnológicos</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='devices'
							render={({ field }) => (
								<MultiCheckboxField
									options={DEVICE_OPTIONS}
									value={field.value || []}
									onChange={field.onChange}
									label='¿Con cuáles de estos dispositivos cuenta para su formación?'
									required
								/>
							)}
						/>
					</CardContent>
				</Card>

				{/* Vivienda y condiciones socioeconómicas */}
				<Card>
					<CardHeader>
						<CardTitle>Vivienda y Condiciones</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<FormField
							control={form.control}
							name='housingType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										¿Cuál es el tipo de tenencia de la vivienda en la cual
										reside?
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Seleccionar' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{HOUSING_TYPE_OPTIONS.map(option => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='occupation'
								render={({ field }) => (
									<FormItem>
										<FormLabel>¿A qué se dedica actualmente?</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccionar' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{OCCUPATION_OPTIONS.map(option => (
													<SelectItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{occupation === 'otro' && (
								<FormField
									control={form.control}
									name='otherOccupation'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Otro, ¿cuál?</FormLabel>
											<FormControl>
												<Input
													placeholder='Especifica tu actividad'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							<FormField
								control={form.control}
								name='dependents'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											¿Cuántas personas dependen económicamente de usted?
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												min='0'
												{...field}
												onChange={e =>
													field.onChange(parseInt(e.target.value) || 0)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Características especiales */}
				<Card>
					<CardHeader>
						<CardTitle>Características Especiales</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormField
								control={form.control}
								name='isInformalVendor'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es usted un ventero(a) informal registrado?
											</FormLabel>
											<p className='text-sm text-muted-foreground'>
												Registrado en las bases de datos de la secretaría de
												seguridad y convivencia - espacio público
											</p>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='isFamilyOfInformalVendor'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es familiar de un ventero informal?
											</FormLabel>
											<p className='text-sm text-muted-foreground'>
												Núcleo primario: Padres, hijos, hermanos, abuelos,
												nietos, tíos, sobrinos
											</p>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='isFamilyCaregiver'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es cuidador(a) de familiar en situación de
												discapacidad?
											</FormLabel>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='isYouthCouncilor'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es consejero/consejera Distrital de Juventud?
											</FormLabel>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='isCertifiedBarrista'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es barrista certificado de algún equipo de fútbol?
											</FormLabel>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						{/* Poblaciones especiales */}
						<FormField
							control={form.control}
							name='specialPopulations'
							render={({ field }) => (
								<MultiCheckboxField
									options={SPECIAL_POPULATIONS}
									value={field.value || []}
									onChange={field.onChange}
									label='¿Pertenece a alguno de estos grupos poblacionales?'
								/>
							)}
						/>
					</CardContent>
				</Card>

				{/* Salud y educación */}
				<Card>
					<CardHeader>
						<CardTitle>Salud y Educación</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='healthSystem'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sistema de salud</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Selecciona' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Contributivo'>
													Contributivo
												</SelectItem>
												<SelectItem value='Subsidiado'>Subsidiado</SelectItem>
												<SelectItem value='Especial'>Especial</SelectItem>
												<SelectItem value='No tiene afiliación'>
													No tiene afiliación
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='internetConnection'
								render={({ field }) => (
									<FormItem>
										<FormLabel>¿Tiene conexión a internet?</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Selecciona' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='si'>Sí</SelectItem>
												<SelectItem value='no'>No</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Información familiar */}
				<Card>
					<CardHeader>
						<CardTitle>Información Familiar</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<FormField
							control={form.control}
							name='hasChildren'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>¿Tiene hijos?</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{hasChildren && (
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<FormField
									control={form.control}
									name='numberOfChildren'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Número de hijos</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='1'
													{...field}
													onChange={e =>
														field.onChange(
															parseInt(e.target.value) || undefined
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='firstChildAge'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Edad del primer hijo/a</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='0'
													{...field}
													onChange={e =>
														field.onChange(
															parseInt(e.target.value) || undefined
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='singleParent'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
											<div className='space-y-0.5'>
												<FormLabel className='text-base'>
													¿Es padre/madre soltera?
												</FormLabel>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						)}

						<FormField
							control={form.control}
							name='pregnantOrLactating'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>
											¿Está embarazada o en lactancia?
										</FormLabel>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
