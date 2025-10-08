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
import type { Section6Form } from '@/schemas/section6'
import { section6Schema } from '@/schemas/section6'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function Section6Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section6Form>({
		resolver: zodResolver(section6Schema),
		defaultValues: data.section6 || {
			hasDisability: false,
			disabilityTypes: [],
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='isViolenceVictim'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Víctima de violencia en Colombia</FormLabel>
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
					name='isCertifiedBarrista'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Barrista certificado</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='isFamilyCaregiver'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Cuidador familiar</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='ethnicGroups'
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
										name='ethnicGroups'
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
																	? field.onChange([
																			...(field.value || []),
																			item,
																	  ])
																	: field.onChange(
																			field.value?.filter(
																				value => value !== item
																			) || []
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
