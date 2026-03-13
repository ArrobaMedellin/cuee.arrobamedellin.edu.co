'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { COURSE_MAPPINGS } from '@/constants/courses'
import type { Section6Form } from '@/schemas/section6'
import { section6Schema } from '@/schemas/section6'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

export function Section6Form() {
	const { data, setSectionData, disabledCourses } = useFormStore()

	const isFromSantaElena = useMemo(() => {
		const residenceCommune = data.section2?.commune ?? ''
		const birthCommune = data.section1?.communeOfBirth ?? ''
		return (
			residenceCommune.includes('Santa Elena') ||
			birthCommune.includes('Santa Elena')
		)
	}, [data.section2?.commune, data.section1?.communeOfBirth])

	const availableCourses = useMemo(
		() =>
			COURSE_MAPPINGS.filter(
				course => !course.onlyForSantaElena || isFromSantaElena,
			),
		[isFromSantaElena],
	)

	const form = useForm<Section6Form>({
		resolver: zodResolver(section6Schema),
		defaultValues: data.section6 || {
			selectedCourses: [],
			howDidYouHear: '',
			otherSource: '',
		},
	})

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			if (values && Object.keys(values).length > 0) {
				setSectionData('section6', values as Section6Form)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, setSectionData])

	const onSubmit = (values: Section6Form) => {
		setSectionData('section6', values)
	}

	const howDidYouHearOptions = [
		{ value: 'facebook', label: 'Redes sociales - Facebook' },
		{ value: 'x-twitter', label: 'Redes sociales - X' },
		{ value: 'instagram', label: 'Redes sociales - Instagram' },
		{ value: 'linkedin', label: 'Redes sociales - Linkedin' },
		{ value: 'tiktok', label: 'Redes sociales - TikTok' },
		{ value: 'medios-digitales', label: 'Medios de comunicación digitales' },
		{
			value: 'medios-tradicionales',
			label: 'Medios de comunicación tradicionales (radio, televisión, prensa)',
		},
		{ value: 'recomendacion', label: 'Recomendación de un conocido' },
		{
			value: 'stand-informativo',
			label: 'Stand informativo en algún lugar de la ciudad',
		},
		{ value: 'otro', label: 'Otro' },
	]

	const howDidYouHear = form.watch('howDidYouHear')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				{/* Selección de cursos */}
				<FormField
					control={form.control}
					name='selectedCourses'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base font-semibold'>
								Solo puedes seleccionar uno de los siguientes cursos en el que
								quieres participar
							</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={value => field.onChange([value])}
									defaultValue={field.value?.[0]}
									className='grid grid-cols-1 md:grid-cols-2 gap-3'
								>
									{availableCourses.map(option => {
										const isDisabled = disabledCourses.includes(option.value)
										return (
											<FormItem
												key={option.value}
												className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm ${isDisabled ? 'opacity-60 cursor-not-allowed bg-muted' : 'hover:bg-accent cursor-pointer'}`}
											>
												<FormControl>
													<RadioGroupItem
														value={option.value}
														disabled={isDisabled}
													/>
												</FormControl>
												<FormLabel className='font-normal cursor-pointer w-full'>
													{option.label}
													{isDisabled && (
														<span className='ml-2 text-xs text-muted-foreground'>
															(Curso finalizado)
														</span>
													)}
												</FormLabel>
											</FormItem>
										)
									})}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Cómo se enteró de la convocatoria */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='howDidYouHear'
						render={({ field }) => (
							<FormItem>
								<FormLabel>¿Cómo te enteraste de la convocatoria?</FormLabel>
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
										{howDidYouHearOptions.map(option => (
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

					{howDidYouHear === 'otro' && (
						<FormField
							control={form.control}
							name='otherSource'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Otro, ¿cuál?</FormLabel>
									<FormControl>
										<Input
											placeholder='Especifica cómo te enteraste'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>
			</form>
		</Form>
	)
}
