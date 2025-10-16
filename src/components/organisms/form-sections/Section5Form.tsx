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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import type { Section6Form } from '@/schemas/section6'
import { section6Schema } from '@/schemas/section6'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function Section5Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section6Form>({
		resolver: zodResolver(section6Schema),
		defaultValues: data.section6 || {
			hasDisability: false,
			disabilityTypes: [],
			belongsToEthnicGroup: false,
			ethnicGroups: [],
			isViolenceVictim: false,
			victimizingActs: [],
			accessibility: '',
			isExcombatant: false,
			isReintegrated: false,
			isFamilyOfExcombatant: false,
			isInternallyDisplaced: false,
			isRefugee: false,
			isFamilyCaregiver: false,
			isYouthCouncilor: false,
			isCertifiedBarrista: false,
		},
	})

	const onSubmit = (values: Section6Form) => {
		setSectionData('section6', values)
	}

	const belongsToEthnicGroup = form.watch('belongsToEthnicGroup')

	const ethnicGroupOptions = [
		{ value: 'afrocolombiano', label: 'Afrocolombiano' },
		{ value: 'indigena', label: 'Indígena' },
		{ value: 'raizal', label: 'Raizal del archipiélago' },
		{ value: 'palenquero', label: 'Palenquero' },
		{ value: 'rrom', label: 'Rrom o gitano' },
		{ value: 'mestizo', label: 'Mestizo' },
		{ value: 'otro', label: 'Otro' },
		{ value: 'ninguno', label: 'Ninguno' },
	]

	const disabilityTypeOptions = [
		{ value: 'fisica', label: 'Física o motriz' },
		{ value: 'intelectual', label: 'Intelectual' },
		{ value: 'psicosocial', label: 'Psicosocial (mental)' },
		{ value: 'visual', label: 'Sensorial visual' },
		{ value: 'auditiva', label: 'Sensorial auditiva' },
		{ value: 'multiple', label: 'Múltiple' },
		{ value: 'otra', label: 'Otra' },
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
			label: 'Delitos contra la libertad e integridad sexual',
		},
		{
			value: 'vinculacion_menores',
			label: 'Vinculación de niños, niñas y adolescentes',
		},
		{ value: 'terrorismo', label: 'Acto terrorista' },
		{ value: 'minas', label: 'Minas antipersonal' },
		{
			value: 'despojo_tierras',
			label: 'Abandono o despojo forzado de tierras',
		},
		{ value: 'otro', label: 'Otro' },
	]

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				{/* Discapacidad */}
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

				{form.watch('hasDisability') && (
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
				)}

				{/* Grupos étnicos */}
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
				)}

				{/* Víctima de violencia */}
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

				{form.watch('isViolenceVictim') && (
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
				)}

				{/* Accesibilidad */}
				<FormField
					control={form.control}
					name='accessibility'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Accesibilidad</FormLabel>
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
									<SelectItem value='ninguna'>Ninguna</SelectItem>
									<SelectItem value='fisica'>Accesibilidad física</SelectItem>
									<SelectItem value='comunicacional'>
										Accesibilidad comunicacional
									</SelectItem>
									<SelectItem value='tecnologica'>
										Accesibilidad tecnológica
									</SelectItem>
									<SelectItem value='otra'>Otra</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Características laborales y sociales */}
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
			</form>
		</Form>
	)
}
