'use client'

import { Checkbox } from '@/components/ui/checkbox'
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
import { AFRO_SUBGROUPS, ETHNIC_GROUPS, INDIGENOUS_PEOPLES } from '@/constants'
import type { Section5Form } from '@/schemas/section5'
import { section5Schema } from '@/schemas/section5'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function Section5Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section5Form>({
		resolver: zodResolver(section5Schema),
		defaultValues: data.section5 || {
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
			isMigrant: false,
			isPeasant: false,
			isVendor: false,
			isVeteran: false,
		},
	})

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			if (values && Object.keys(values).length > 0) {
				setSectionData('section5', values as Section5Form)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, setSectionData])

	const onSubmit = (values: Section5Form) => {
		setSectionData('section5', values)
	}

	const hasDisability = form.watch('hasDisability')
	const belongsToEthnicGroup = form.watch('belongsToEthnicGroup')
	const ethnicGroups = form.watch('ethnicGroups')
	const isViolenceVictim = form.watch('isViolenceVictim')

	const disabilityTypeOptions = [
		{ value: 'auditiva', label: 'Auditiva' },
		{ value: 'fisica', label: 'Física' },
		{ value: 'intelectual', label: 'Intelectual' },
		{ value: 'visual', label: 'Visual' },
		{ value: 'sordoceguera', label: 'Sordoceguera' },
		{ value: 'psicosocial', label: 'Psicosocial' },
		{ value: 'multiple', label: 'Múltiple' },
		{ value: 'prefiero no responder', label: 'Prefiero no responder' },
	]

	const victimizingActOptions = [
		{ value: 'homicidio', label: 'Homicidio' },
		{ value: 'desplazamiento-forzado', label: 'Desplazamiento forzado' },
		{ value: 'tortura', label: 'Tortura' },
		{ value: 'secuestro', label: 'Secuestro' },
		{ value: 'lesiones-personales', label: 'Lesiones personales' },
		{ value: 'desaparicion-forzada', label: 'Desaparición forzada' },
		{
			value: 'reclutamiento-ilegal-menores',
			label: 'Reclutamiento ilegal de menores',
		},
		{ value: 'mina-antipersonal', label: 'Mina antipersonal' },
		{ value: 'amenazas', label: 'Amenazas' },
		{ value: 'prefiero-no-responder', label: 'Prefiero no responder' },
	]

	const showAfroSubgroup = ethnicGroups === 'Afrodescendiente'
	const showIndigenousPeople = ethnicGroups === 'Indígena'

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				{/* Discapacidad */}
				<div className='space-y-6'>
					<FormField
						control={form.control}
						name='hasDisability'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
								<div className='space-y-0.5'>
									<FormLabel className='text-base'>
										¿Tiene alguna de las siguientes discapacidades certificadas
										por entidad o profesional competente?
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

					{hasDisability && (
						<>
							<FormField
								control={form.control}
								name='disabilityTypes'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipos de discapacidad</FormLabel>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
											{disabilityTypeOptions.map(option => (
												<FormItem
													key={option.value}
													className='flex flex-row items-start space-x-3 space-y-0'
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(option.value)}
															onCheckedChange={checked => {
																return checked
																	? field.onChange([
																			...(field.value || []),
																			option.value,
																	  ])
																	: field.onChange(
																			field.value?.filter(
																				value => value !== option.value
																			) || []
																	  )
															}}
														/>
													</FormControl>
													<FormLabel className='text-sm font-normal'>
														{option.label}
													</FormLabel>
												</FormItem>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{form.watch('requiresSupport') && (
									<FormField
										control={form.control}
										name='supportType'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tipo de apoyo</FormLabel>
												<FormControl>
													<Input
														placeholder='Especifica el tipo de apoyo'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>
						</>
					)}
				</div>

				{/* Grupos étnicos */}
				<div className='space-y-6'>
					<FormField
						control={form.control}
						name='belongsToEthnicGroup'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
								<div className='space-y-0.5'>
									<FormLabel className='text-base'>
										¿Pertenece a algún grupo étnico?
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

					{belongsToEthnicGroup && (
						<>
							<FormField
								control={form.control}
								name='ethnicGroups'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Grupo étnico</FormLabel>
										<div className='grid grid-cols-1 gap-2'>
											{ETHNIC_GROUPS.map(option => (
												<FormItem
													key={option.value}
													className='flex flex-row items-start space-x-3 space-y-0'
												>
													<FormControl>
														<Checkbox
															checked={field.value === option.value}
															onCheckedChange={checked => {
																// Si se selecciona, establecer este valor
																// Si se deselecciona, limpiar el valor
																field.onChange(checked ? option.value : '')
															}}
														/>
													</FormControl>
													<FormLabel className='text-sm font-normal'>
														{option.label}
													</FormLabel>
												</FormItem>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{showAfroSubgroup && (
								<FormField
									control={form.control}
									name='afroSubgroup'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Subgrupo Afrodescendiente</FormLabel>
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
													{AFRO_SUBGROUPS.map(option => (
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
							)}

							{showIndigenousPeople && (
								<FormField
									control={form.control}
									name='indigenousPeople'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Pueblo Indígena</FormLabel>
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
													{INDIGENOUS_PEOPLES.map(option => (
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
							)}
						</>
					)}
				</div>

				{/* Víctima de violencia */}
				<div className='space-y-6'>
					<FormField
						control={form.control}
						name='isViolenceVictim'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
								<div className='space-y-0.5'>
									<FormLabel className='text-base'>
										¿Es víctima del conflicto armado en Colombia?
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

					{isViolenceVictim && (
						<>
							<FormField
								control={form.control}
								name='victimizingActs'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Hechos victimizantes</FormLabel>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
											{victimizingActOptions.map(option => (
												<FormItem
													key={option.value}
													className='flex flex-row items-start space-x-3 space-y-0'
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(option.value)}
															onCheckedChange={checked => {
																return checked
																	? field.onChange([
																			...(field.value || []),
																			option.value,
																	  ])
																	: field.onChange(
																			field.value?.filter(
																				value => value !== option.value
																			) || []
																	  )
															}}
														/>
													</FormControl>
													<FormLabel className='text-sm font-normal'>
														{option.label}
													</FormLabel>
												</FormItem>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
				</div>

				{/* Características laborales y sociales */}
				<div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='isMigrant'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>
											¿Es población migrante?
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
							name='isPeasant'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>
											¿Es población campesina?
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
							name='isVeteran'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>
											¿Es veterano (retirado de las fuerzas militares)?
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
				</div>
			</form>
		</Form>
	)
}
