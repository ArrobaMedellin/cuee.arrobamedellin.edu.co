'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { section6Schema } from '@/schemas/section6'
import type { Section6Form } from '@/schemas/section6'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useFormStore } from '@/stores/formStore'

export function Section6Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section6Form>({
		resolver: zodResolver(section6Schema),
		defaultValues: data.section6 || {
			violenceInColombia: false,
			accessibility: '',
			hasDisability: false,
			population: '',
			ventero: false,
			familyVentero: false,
			barrista: false,
			familyDisability: false,
			ethnicities: [],
		},
	})

	const onSubmit = (values: Section6Form) => {
		setSectionData('section6', values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='violenceInColombia'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Violencia en Colombia</FormLabel>
							</div>
						</FormItem>
					)}
				/>
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
									<SelectItem value='si'>Sí</SelectItem>
									<SelectItem value='no'>No</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='hasDisability'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Tiene discapacidad</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='population'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Población</FormLabel>
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
									<SelectItem value='general'>General</SelectItem>
									<SelectItem value='vulnerable'>Vulnerable</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='ventero'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Ventero</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='familyVentero'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Familiar ventero</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='barrista'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Barrista</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='familyDisability'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Familiar con discapacidad</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='ethnicities'
					render={() => (
						<FormItem>
							<div className='mb-4'>
								<FormLabel className='text-base'>Etnias</FormLabel>
							</div>
							{['indigena', 'afrodescendiente', 'gitano', 'ninguna'].map(
								item => (
									<FormField
										key={item}
										control={form.control}
										name='ethnicities'
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
																			field.value?.filter(
																				value => value !== item
																			)
																	  )
															}}
														/>
													</FormControl>
													<FormLabel className='font-normal'>{item}</FormLabel>
												</FormItem>
											)
										}}
									/>
								)
							)}
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
