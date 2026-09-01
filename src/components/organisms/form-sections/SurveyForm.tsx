'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import {
	CAR05_NO_ACCESS,
	CAR07_NOT_APPLICABLE,
	surveySchema,
	type SurveyForm as SurveyFormValues,
} from '@/schemas/survey'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

interface RadioOption {
	value: string
	label: string
}

const CAR01_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Estudiante de bachillerato.' },
	{
		value: 'B',
		label:
			'Estudiante de educación postsecundaria (técnica, tecnológica o universitaria).',
	},
	{ value: 'C', label: 'Aspirante a la educación postsecundaria.' },
	{ value: 'D', label: 'Empleado(a).' },
	{ value: 'E', label: 'Desempleado(a) en búsqueda de empleo.' },
	{ value: 'F', label: 'Emprendedor(a) o independiente.' },
	{ value: 'G', label: 'Cuidador(a) del hogar.' },
	{ value: 'H', label: 'Ni estudia ni trabaja.' },
	{ value: 'I', label: 'Me dedico a otra actividad. ¿Cuál?' },
]

const CAR02_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Conseguir un mejor empleo.' },
	{ value: 'B', label: 'Fortalecer mis conocimientos y habilidades.' },
	{
		value: 'C',
		label: 'Descubrir si esta área de formación es adecuada para mí.',
	},
	{ value: 'D', label: 'Aprovechar el tiempo libre.' },
	{ value: 'E', label: 'Fortalecer o hacer crecer mi emprendimiento.' },
	{
		value: 'F',
		label: 'Aprovechar el acceso gratuito o el apoyo institucional.',
	},
	{ value: 'G', label: 'Me la recomendaron.' },
	{ value: 'H', label: 'Otro. ¿Cuál?' },
]

const CAR03_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Necesito flexibilidad en los horarios.' },
	{ value: 'B', label: 'No puedo desplazarme presencialmente.' },
	{ value: 'C', label: 'Trabajo y solo puedo estudiar en casa.' },
	{ value: 'D', label: 'Me resulta más útil estudiar de forma virtual.' },
	{
		value: 'E',
		label: 'No identifiqué oportunidades de formación presencial.',
	},
]

const CAR04_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Menos de 2 horas.' },
	{ value: 'B', label: 'Entre 2 y 4 horas.' },
	{ value: 'C', label: 'Entre 5 y 7 horas.' },
	{ value: 'D', label: 'Entre 8 y 10 horas.' },
	{ value: 'E', label: 'Más de 10 horas.' },
]

const CAR05_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Computador portátil.' },
	{ value: 'B', label: 'Computador de escritorio.' },
	{ value: 'C', label: 'Tableta.' },
	{ value: 'D', label: 'Teléfono celular inteligente (smartphone).' },
	{
		value: 'E',
		label: 'Computador o tableta compartida con otra persona.',
	},
	{
		value: CAR05_NO_ACCESS,
		label: 'No tengo acceso regular a ninguno de estos dispositivos.',
	},
]

const CAR06_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Internet fijo en mi vivienda.' },
	{ value: 'B', label: 'Datos móviles de un plan de celular.' },
	{
		value: 'C',
		label: 'Internet compartido por otra persona o vivienda.',
	},
	{
		value: 'D',
		label:
			'Internet disponible únicamente en espacios públicos, educativos o comunitarios.',
	},
	{ value: 'E', label: 'No cuento con acceso a internet.' },
]

const CAR07_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Muy estable: casi nunca presenta interrupciones.' },
	{ value: 'B', label: 'Estable: presenta pocas interrupciones.' },
	{
		value: 'C',
		label: 'Medianamente estable: presenta interrupciones ocasionales.',
	},
	{ value: 'D', label: 'Inestable: presenta interrupciones frecuentes.' },
	{
		value: 'E',
		label:
			'Muy inestable: con frecuencia no me permite realizar las actividades.',
	},
]

const CAR08_OPTIONS: RadioOption[] = [
	{ value: 'A', label: 'Conseguir empleo.' },
	{ value: 'B', label: 'Mejorar mi desempeño laboral actual.' },
	{ value: 'C', label: 'Fortalecer mi emprendimiento.' },
	{
		value: 'D',
		label: 'Obtener el certificado para mejorar mis oportunidades.',
	},
	{ value: 'E', label: 'Continuar con otros cursos o estudios formales.' },
	{ value: 'F', label: 'Otro. ¿Cuál?' },
]

export function SurveyForm() {
	const { data, setSectionData, setSurveyWizardCompleted } = useFormStore()
	const form = useForm<SurveyFormValues>({
		resolver: zodResolver(surveySchema),
		defaultValues: data.survey || {
			car01: '',
			car01Other: '',
			car02: '',
			car02Other: '',
			car03: '',
			car04: '',
			car05: [],
			car06: '',
			car07: '',
			car08: '',
			car08Other: '',
		},
	})

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			if (values && Object.keys(values).length > 0) {
				setSectionData('survey', values as SurveyFormValues)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, setSectionData])

	// Se observa el formulario completo: cada pregunta necesita reaccionar a
	// sus propios cambios para habilitar el botón "Siguiente" del wizard.
	const values = form.watch()
	const { car01, car02, car05 = [], car06, car08 } = values

	// CAR_07 solo aplica cuando CAR_06 es diferente de "No cuento con acceso a internet"
	useEffect(() => {
		if (car06 === 'E') {
			if (form.getValues('car07') !== CAR07_NOT_APPLICABLE) {
				form.setValue('car07', CAR07_NOT_APPLICABLE, {
					shouldDirty: true,
					shouldValidate: true,
				})
			}
		} else if (form.getValues('car07') === CAR07_NOT_APPLICABLE) {
			form.setValue('car07', '', { shouldDirty: true, shouldValidate: true })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [car06])

	const toggleDevice = (value: string, checked: boolean) => {
		if (value === CAR05_NO_ACCESS) {
			form.setValue('car05', checked ? [CAR05_NO_ACCESS] : [], {
				shouldDirty: true,
				shouldValidate: true,
			})
			return
		}
		const current = form.getValues('car05') || []
		const next = checked
			? [...current.filter(v => v !== CAR05_NO_ACCESS), value]
			: current.filter(v => v !== value)
		form.setValue('car05', next, { shouldDirty: true, shouldValidate: true })
	}

	const onSubmit = (formValues: SurveyFormValues) => {
		setSectionData('survey', formValues)
	}

	interface Slide {
		key: string
		title: string
		isValid: (v: SurveyFormValues) => boolean
		render: () => React.ReactNode
	}

	const slides = useMemo<Slide[]>(() => {
		const list: Slide[] = [
			{
				key: 'car01',
				title: '¿Cuál es tu actividad principal actualmente?',
				isValid: v => !!v.car01 && (v.car01 !== 'I' || !!v.car01Other?.trim()),
				render: () => (
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='car01'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											value={field.value}
											className='grid grid-cols-1 gap-3'
										>
											{CAR01_OPTIONS.map(option => (
												<FormItem
													key={option.value}
													className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
												>
													<FormControl>
														<RadioGroupItem value={option.value} />
													</FormControl>
													<FormLabel className='font-normal cursor-pointer w-full'>
														{option.label}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{car01 === 'I' && (
							<FormField
								control={form.control}
								name='car01Other'
								render={({ field }) => (
									<FormItem>
										<FormLabel>¿Cuál?</FormLabel>
										<FormControl>
											<Input
												maxLength={150}
												placeholder='Describe tu actividad'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
				),
			},
			{
				key: 'car02',
				title:
					'¿Cuál fue tu principal motivación para iniciar este curso virtual?',
				isValid: v => !!v.car02 && (v.car02 !== 'H' || !!v.car02Other?.trim()),
				render: () => (
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='car02'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											value={field.value}
											className='grid grid-cols-1 gap-3'
										>
											{CAR02_OPTIONS.map(option => (
												<FormItem
													key={option.value}
													className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
												>
													<FormControl>
														<RadioGroupItem value={option.value} />
													</FormControl>
													<FormLabel className='font-normal cursor-pointer w-full'>
														{option.label}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{car02 === 'H' && (
							<FormField
								control={form.control}
								name='car02Other'
								render={({ field }) => (
									<FormItem>
										<FormLabel>¿Cuál?</FormLabel>
										<FormControl>
											<Input
												maxLength={150}
												placeholder='Describe tu motivación'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
				),
			},
			{
				key: 'car03',
				title: '¿Por qué elegiste estudiar en modalidad virtual?',
				isValid: v => !!v.car03,
				render: () => (
					<FormField
						control={form.control}
						name='car03'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										className='grid grid-cols-1 gap-3'
									>
										{CAR03_OPTIONS.map(option => (
											<FormItem
												key={option.value}
												className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
											>
												<FormControl>
													<RadioGroupItem value={option.value} />
												</FormControl>
												<FormLabel className='font-normal cursor-pointer w-full'>
													{option.label}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				),
			},
			{
				key: 'car04',
				title: '¿Cuánto tiempo real puedes dedicarle al curso cada semana?',
				isValid: v => !!v.car04,
				render: () => (
					<FormField
						control={form.control}
						name='car04'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										className='grid grid-cols-1 sm:grid-cols-2 gap-3'
									>
										{CAR04_OPTIONS.map(option => (
											<FormItem
												key={option.value}
												className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
											>
												<FormControl>
													<RadioGroupItem value={option.value} />
												</FormControl>
												<FormLabel className='font-normal cursor-pointer w-full'>
													{option.label}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				),
			},
			{
				key: 'car05',
				title:
					'¿A cuáles de los siguientes dispositivos tienes acceso regular para realizar tus actividades académicas?',
				isValid: v => (v.car05?.length ?? 0) > 0,
				render: () => (
					<FormField
						control={form.control}
						name='car05'
						render={() => (
							<FormItem>
								<div className='grid grid-cols-1 gap-3'>
									{CAR05_OPTIONS.map(option => (
										<div
											key={option.value}
											className='flex items-center space-x-2 rounded-md border p-3 shadow-sm hover:bg-accent'
										>
											<Checkbox
												id={`car05-${option.value}`}
												checked={car05.includes(option.value)}
												onCheckedChange={checked =>
													toggleDevice(option.value, checked === true)
												}
											/>
											<label
												htmlFor={`car05-${option.value}`}
												className='text-sm font-normal leading-none cursor-pointer w-full'
											>
												{option.label}
											</label>
										</div>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				),
			},
			{
				key: 'car06',
				title:
					'¿Cuál es el principal tipo de acceso a internet que utilizas para realizar tus actividades académicas?',
				isValid: v => !!v.car06,
				render: () => (
					<FormField
						control={form.control}
						name='car06'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										className='grid grid-cols-1 gap-3'
									>
										{CAR06_OPTIONS.map(option => (
											<FormItem
												key={option.value}
												className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
											>
												<FormControl>
													<RadioGroupItem value={option.value} />
												</FormControl>
												<FormLabel className='font-normal cursor-pointer w-full'>
													{option.label}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				),
			},
		]

		if (car06 !== 'E') {
			list.push({
				key: 'car07',
				title:
					'¿Qué tan estable es normalmente tu conexión a internet durante las actividades del curso?',
				isValid: v => !!v.car07,
				render: () => (
					<FormField
						control={form.control}
						name='car07'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										className='grid grid-cols-1 gap-3'
									>
										{CAR07_OPTIONS.map(option => (
											<FormItem
												key={option.value}
												className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
											>
												<FormControl>
													<RadioGroupItem value={option.value} />
												</FormControl>
												<FormLabel className='font-normal cursor-pointer w-full'>
													{option.label}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				),
			})
		}

		list.push({
			key: 'car08',
			title:
				'¿Cuál es el principal resultado que esperas lograr al finalizar el curso?',
			isValid: v => !!v.car08 && (v.car08 !== 'F' || !!v.car08Other?.trim()),
			render: () => (
				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='car08'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										className='grid grid-cols-1 gap-3'
									>
										{CAR08_OPTIONS.map(option => (
											<FormItem
												key={option.value}
												className='flex items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:bg-accent cursor-pointer'
											>
												<FormControl>
													<RadioGroupItem value={option.value} />
												</FormControl>
												<FormLabel className='font-normal cursor-pointer w-full'>
													{option.label}
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{car08 === 'F' && (
						<FormField
							control={form.control}
							name='car08Other'
							render={({ field }) => (
								<FormItem>
									<FormLabel>¿Cuál?</FormLabel>
									<FormControl>
										<Input
											maxLength={150}
											placeholder='Describe el resultado que esperas lograr'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>
			),
		})

		return list
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [car06, car01, car02, car05, car08])

	const [currentIndex, setCurrentIndex] = useState(0)

	// Si la lista de preguntas cambia de tamaño (p. ej. CAR_07 se oculta al
	// elegir CAR_06 = E), evita quedar apuntando a un índice inexistente.
	useEffect(() => {
		setCurrentIndex(i => Math.min(i, slides.length - 1))
	}, [slides.length])

	const currentSlide = slides[currentIndex] ?? slides[0]
	const isFirst = currentIndex === 0
	const isLast = currentIndex === slides.length - 1
	const canAdvance = currentSlide.isValid(values)

	// El botón "Siguiente" principal (hacia el Resumen) solo se habilita
	// cuando el usuario efectivamente recorrió el wizard hasta el final.
	useEffect(() => {
		if (isLast && canAdvance) {
			setSurveyWizardCompleted(true)
		}
	}, [isLast, canAdvance, setSurveyWizardCompleted])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<div>
					<h2 className='text-xl font-semibold'>
						Encuesta de caracterización y permanencia
					</h2>
					<p className='mt-2 text-sm text-muted-foreground'>
						Queremos conocer algunas condiciones, expectativas y recursos con
						los que cuentas al iniciar tu curso. Esta información será
						utilizada para orientar acciones de acompañamiento y permanencia.
					</p>
				</div>

				<Card>
					<CardHeader className='space-y-3'>
						<div className='flex items-center gap-2'>
							{slides.map((slide, i) => (
								<span
									key={slide.key}
									className={cn(
										'h-1.5 flex-1 rounded-full transition-colors',
										i <= currentIndex ? 'bg-primary' : 'bg-muted',
									)}
								/>
							))}
						</div>
						<div className='flex items-center justify-between'>
							<CardTitle className='text-base'>{currentSlide.title}</CardTitle>
							<span className='shrink-0 pl-4 text-xs text-muted-foreground'>
								Pregunta {currentIndex + 1} de {slides.length}
							</span>
						</div>
					</CardHeader>
					<CardContent className='space-y-6'>
						{currentSlide.render()}

						<div className='flex items-center justify-between border-t pt-4'>
							<Button
								type='button'
								variant='outline'
								disabled={isFirst}
								onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
							>
								<ChevronLeft className='h-4 w-4' />
								Anterior
							</Button>
							{!isLast && (
								<Button
									type='button'
									disabled={!canAdvance}
									onClick={() =>
										setCurrentIndex(i => Math.min(slides.length - 1, i + 1))
									}
								>
									Siguiente
									<ChevronRight className='h-4 w-4' />
								</Button>
							)}
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
