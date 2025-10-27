'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
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
			hasDisability: false,
			disabilityTypes: [],
			disabilityDescription: '',
			requiresSupport: false,
			supportType: '',
			belongsToEthnicGroup: false,
			ethnicGroups: [],
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
			accessibility: '',
			isFamilyCaregiver: false,
			isYouthCouncilor: false,
			isCertifiedBarrista: false
		}
	})

	const onSubmit = (values: Section5Form) => {
		setSectionData('section5', values)
	}

	const hasDisability = form.watch('hasDisability')
	const belongsToEthnicGroup = form.watch('belongsToEthnicGroup')
	const isViolenceVictim = form.watch('isViolenceVictim')

	const ethnicGroupOptions = [
		{ value: 'afrocolombiano', label: 'Afrocolombiano' },
		{ value: 'indigena', label: 'Indígena' },
		{ value: 'raizal', label: 'Raizal del archipiélago' },
		{ value: 'palenquero', label: 'Palenquero' },
		{ value: 'rrom', label: 'Rrom o gitano' },
		{ value: 'mestizo', label: 'Mestizo' },
		{ value: 'prefiero_no_responder', label: 'Prefiero no responder' },
		{ value: 'ninguno', label: 'Ninguno' }
	]

	const disabilityTypeOptions = [
		{ value: 'fisica', label: 'Física o motriz' },
		{ value: 'intelectual', label: 'Intelectual' },
		{ value: 'psicosocial', label: 'Psicosocial (mental)' },
		{ value: 'visual', label: 'Sensorial visual' },
		{ value: 'auditiva', label: 'Sensorial auditiva' },
		{ value: 'multiple', label: 'Múltiple' },
		{ value: 'otra', label: 'Otra' }
	]

	const victimizingActOptions = [
		{ value: 'desplazamiento', label: 'Desplazamiento forzado' },
		{ value: 'homicidio', label: 'Homicidio' },
		{ value: 'masacre', label: 'Masacre' },
		{ value: 'secuestro', label: 'Secuestro' },
		{ value: 'desaparicion', label: 'Desaparición forzada' },
		{ value: 'tortura', label: 'Tortura' },
		{
			value: 'delitos_sexuales',
			label: 'Delitos contra la libertad e integridad sexual'
		},
		{
			value: 'vinculacion_menores',
			label: 'Vinculación de niños, niñas y adolescentes'
		},
		{ value: 'terrorismo', label: 'Acto terrorista' },
		{ value: 'minas', label: 'Minas antipersonal' },
		{
			value: 'despojo_tierras',
			label: 'Abandono o despojo forzado de tierras'
		},
		{ value: 'otro', label: 'Otro' }
	]

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				{/* Discapacidad */}
				<Card>
					<CardHeader>
						<CardTitle>Discapacidad</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<FormField
							control={form.control}
							name='hasDisability'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
									<div className='space-y-0.5'>
										<FormLabel className='text-base'>
											¿Tiene alguna discapacidad?
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
																				option.value
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

								<FormField
									control={form.control}
									name='disabilityDescription'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Descripción de la discapacidad</FormLabel>
											<FormControl>
												<Input
													placeholder='Describe brevemente tu discapacidad'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='requiresSupport'
										render={({ field }) => (
											<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
												<div className='space-y-0.5'>
													<FormLabel className='text-base'>
														¿Requiere apoyo especial?
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
					</CardContent>
				</Card>

				{/* Grupos étnicos */}
				<Card>
					<CardHeader>
						<CardTitle>Pertenencia Étnica</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
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
							<FormField
								control={form.control}
								name='ethnicGroups'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Selecciona los grupos étnicos a los que perteneces:
										</FormLabel>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
											{ethnicGroupOptions.map(option => (
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
																			option.value
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
						)}
					</CardContent>
				</Card>

				{/* Víctima de violencia */}
				<Card>
					<CardHeader>
						<CardTitle>Víctima del Conflicto Armado</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
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
																				option.value
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

								<FormField
									control={form.control}
									name='registeredWithVictimUnit'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
											<div className='space-y-0.5'>
												<FormLabel className='text-base'>
													¿Está registrado en la Unidad de Víctimas?
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

								{form.watch('registeredWithVictimUnit') && (
									<FormField
										control={form.control}
										name='victimRegistrationNumber'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Número de registro</FormLabel>
												<FormControl>
													<Input
														placeholder='Número de registro en la Unidad de Víctimas'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</>
						)}
					</CardContent>
				</Card>

				{/* Poblaciones especiales del conflicto */}
				<Card>
					<CardHeader>
						<CardTitle>Poblaciones Especiales</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='isExcombatant'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es excombatiente?
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
								name='isReintegrated'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es reintegrado?
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
								name='isFamilyOfExcombatant'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es familiar de excombatiente?
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
								name='isInternallyDisplaced'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es desplazado interno?
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
								name='isRefugee'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es refugiado?
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
					</CardContent>
				</Card>

				{/* Características laborales y sociales */}
				<Card>
					<CardHeader>
						<CardTitle>Características Adicionales</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='isFamilyCaregiver'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
										<div className='space-y-0.5'>
											<FormLabel className='text-base'>
												¿Es cuidador familiar?
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
												¿Es concejal juvenil?
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
												¿Es barrista certificado?
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
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
