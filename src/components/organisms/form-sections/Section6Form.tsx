'use client'

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { COURSE_MAPPINGS } from '@/constants/courses'
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
			selectedCourses: [],
			howDidYouHear: '',
			otherSource: ''
		}
	})

	const onSubmit = (values: Section6Form) => {
		setSectionData('section6', values)
	}

	const courseOptions = [
		{
			value: 'big-data-none-little',
			label: 'Big data; None data y Little data'
		},
		{
			value: 'captura-analisis-big-data',
			label: 'Captura y análisis de datos en Big Data'
		},
		{
			value: 'ciencia-ingenieria-datos',
			label: 'Ciencia e Ingeniería de Datos'
		},
		{ value: 'inteligencia-negocios-bi', label: 'Inteligencia de Negocios BI' },
		{
			value: 'excel-avanzado',
			label: 'Excel Avanzado para la gestión y optimización de datos'
		},
		{ value: 'que-es-ia', label: 'Que es la inteligencia artificial' },
		{
			value: 'marketing-digital',
			label: 'Preparando los negocios hacia el marketing digital'
		},
		{
			value: 'excel-intermedio',
			label: 'Excel intermedio: fundamentos para la formulación y análisis'
		},
		{ value: 'crea-tu-ia', label: 'Crea tu propia IA' },
		{ value: 'ingles-basico', label: 'Inglés Básico' },
		{ value: 'ingles-intermedio', label: 'Inglés intermedio' },
		{
			value: 'ingles-turismo',
			label: 'Inglés básico para el sector turístico'
		},
		{
			value: 'primeros-auxilios-psicologicos',
			label: 'Primeros auxilios psicológicos'
		},
		{
			value: 'vida-independiente',
			label: 'Vida independiente y toma de decisiones con apoyo'
		},
		{
			value: 'buenas-practicas-ambientales',
			label: 'Buenas prácticas ambientales en el hogar'
		},
		{
			value: 'economia-circular',
			label: 'Herramientas prácticas de economía circular'
		},
		{ value: 'conmemorando-etnico', label: 'Conmemorando lo étnico' }
	]

	const howDidYouHearOptions = [
		{ value: 'facebook', label: 'Redes sociales - Facebook' },
		{ value: 'x-twitter', label: 'Redes sociales - X' },
		{ value: 'instagram', label: 'Redes sociales - Instagram' },
		{ value: 'linkedin', label: 'Redes sociales - Linkedin' },
		{ value: 'tiktok', label: 'Redes sociales - TikTok' },
		{ value: 'medios-digitales', label: 'Medios de comunicación digitales' },
		{
			value: 'medios-tradicionales',
			label: 'Medios de comunicación tradicionales (radio, televisión, prensa)'
		},
		{ value: 'recomendacion', label: 'Recomendación de un conocido' },
		{
			value: 'stand-informativo',
			label: 'Stand informativo en algún lugar de la ciudad'
		},
		{ value: 'otro', label: 'Otro' }
	]

	const selectedCourses = form.watch('selectedCourses')
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
								Seleccione una de las siguientes rutas en la que quieras participar
							</FormLabel>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								{COURSE_MAPPINGS.map(option => (
									<FormItem
										key={option.value}
										className='flex flex-row items-start space-x-3 space-y-0'
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(option.value)}
												onCheckedChange={checked => {
													if (checked) {
														// Verificar que no exceda el límite de 1
														if ((field.value || []).length < 1) {
															field.onChange([
																...(field.value || []),
																option.value
															])
														}
													} else {
														field.onChange(
															field.value?.filter(
																value => value !== option.value
															) || []
														)
													}
												}}
												disabled={
													!field.value?.includes(option.value) &&
													field.value?.length >= 3
												}
											/>
										</FormControl>
										<FormLabel className='text-sm font-normal leading-5'>
											{option.label}
										</FormLabel>
									</FormItem>
								))}
							</div>
							<div className='text-sm text-muted-foreground mt-2'>
								Cursos seleccionados: {selectedCourses?.length || 0}/1
							</div>
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
