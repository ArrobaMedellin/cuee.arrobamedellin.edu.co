'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { section5Schema } from '@/schemas/section5'
import type { Section5Form } from '@/schemas/section5'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useFormStore } from '@/stores/formStore'

export function Section5Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section5Form>({
		resolver: zodResolver(section5Schema),
		defaultValues: data.section5 || {
			healthSystem: '',
			internetConnection: '',
			devices: [],
			occupation: '',
			educationLevel: '',
			housingType: '',
			hasChildren: false,
			singleParent: false,
			pregnantOrLactating: false,
			dependents: 0,
		},
	})

	const hasChildren = form.watch('hasChildren')

	const onSubmit = (values: Section5Form) => {
		setSectionData('section5', values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
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
										<SelectItem value='contributivo'>Contributivo</SelectItem>
										<SelectItem value='subsidiado'>Subsidiado</SelectItem>
										<SelectItem value='otro'>Otro</SelectItem>
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
								<FormLabel>Conexión a internet</FormLabel>
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
				<FormField
					control={form.control}
					name='devices'
					render={() => (
						<FormItem>
							<div className='mb-4'>
								<FormLabel className='text-base'>Dispositivos</FormLabel>
							</div>
							{['computador', 'telefono', 'tablet'].map(item => (
								<FormField
									key={item}
									control={form.control}
									name='devices'
									render={({ field }) => {
										return (
											<FormItem
												key={item}
												className='flex flex-row items-start space-x-3 space-y-0'
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(item)}
														onCheckedChange={checked => {
															return checked
																? field.onChange([...field.value, item])
																: field.onChange(
																		field.value?.filter(value => value !== item)
																  )
														}}
													/>
												</FormControl>
												<FormLabel className='font-normal'>{item}</FormLabel>
											</FormItem>
										)
									}}
								/>
							))}
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
								<FormLabel>Ocupación</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa ocupación'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='educationLevel'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nivel de estudio</FormLabel>
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
										<SelectItem value='primaria'>Primaria</SelectItem>
										<SelectItem value='secundaria'>Secundaria</SelectItem>
										<SelectItem value='universitario'>Universitario</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='housingType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de vivienda</FormLabel>
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
									<SelectItem value='casa'>Casa</SelectItem>
									<SelectItem value='apartamento'>Apartamento</SelectItem>
									<SelectItem value='otro'>Otro</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='hasChildren'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Tiene hijos</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				{hasChildren && (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='numberOfChildren'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número de hijos</FormLabel>
									<FormControl>
										<Input
											type='number'
											{...field}
											onChange={e => field.onChange(parseInt(e.target.value))}
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
											{...field}
											onChange={e => field.onChange(parseInt(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}
				<FormField
					control={form.control}
					name='singleParent'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Padre o madre soltera</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='pregnantOrLactating'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Madre gestante o lactante</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='dependents'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Personas que depende de usted</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={e => field.onChange(parseInt(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
