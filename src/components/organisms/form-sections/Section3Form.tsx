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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { Section3Form } from '@/schemas/section3'
import { section3Schema } from '@/schemas/section3'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export function Section3Form() {
	const { data, setSectionData } = useFormStore()

	const isRuralZone = useMemo(() => {
		const communeName = data.section2?.commune || ''
		return (
			communeName.includes('Palmitas') || communeName.includes('Santa Elena')
		)
	}, [data.section2?.commune])
	const [selectedCountryId] = useState<number | undefined>(
		data.section3?.countryOfResidenceId,
	)
	const [selectedDepartmentId] = useState<number | undefined>(
		data.section3?.departmentOfResidenceId,
	)
	const [selectedCityId] = useState<number | undefined>(
		data.section3?.cityOfResidenceId,
	)
	const [selectedCommuneId] = useState<number | undefined>(
		data.section3?.communeId,
	)

	const form = useForm<Section3Form>({
		resolver: zodResolver(section3Schema),
		defaultValues: data.section3
			? {
					...data.section3,
					isRuralZone: data.section3.isRuralZone ?? isRuralZone,
				}
			: {
					countryOfResidence: '',
					departmentOfResidence: '',
					cityOfResidence: '',
					neighborhood: '',
					commune: '',
					stratum: '',
					addressType: '',
					addressNumber1: '',
					addressLetter1: '',
					addressOrientation1: '',
					addressNumber2: '',
					addressLetter2: '',
					addressOrientation2: '',
					addressNumber3: '',
					addressComplement: '',
					fullAddress: '',
					birthCity: '',
					isRuralZone: isRuralZone,
				},
	})

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			if (values && Object.keys(values).length > 0) {
				const submitData = {
					...values,
					countryOfResidenceId: selectedCountryId,
					departmentOfResidenceId: selectedDepartmentId,
					cityOfResidenceId: selectedCityId,
					communeId: selectedCommuneId,
					neighborhoodId: form.getValues('neighborhoodId'),
				}
				setSectionData('section3', submitData as Section3Form)
			}
		})
		return () => subscription.unsubscribe()
	}, [
		form,
		setSectionData,
		selectedCountryId,
		selectedDepartmentId,
		selectedCityId,
		selectedCommuneId,
	])

	useEffect(() => {
		form.setValue('isRuralZone', isRuralZone, {
			shouldValidate: true,
			shouldDirty: false,
			shouldTouch: false,
		})
	}, [form, isRuralZone])

	const onSubmit = (values: Section3Form) => {
		const submitData = {
			...values,
			countryOfResidenceId: selectedCountryId,
			departmentOfResidenceId: selectedDepartmentId,
			cityOfResidenceId: selectedCityId,
			communeId: selectedCommuneId,
			neighborhoodId: form.watch('neighborhoodId'),
		}
		setSectionData('section3', submitData)
	}

	const showStratumFirst =
		isRuralZone && (data.section2?.commune?.includes('Santa Elena') ?? false)

	const renderStratumField = () => (
		<FormField
			control={form.control}
			name='stratum'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Estrato</FormLabel>
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
							<SelectItem value='1'>1</SelectItem>
							<SelectItem value='2'>2</SelectItem>
							<SelectItem value='3'>3</SelectItem>
							<SelectItem value='4'>4</SelectItem>
							<SelectItem value='5'>5</SelectItem>
							<SelectItem value='6'>6</SelectItem>
							<SelectItem value='sin clasificar'>Sin Clasificar</SelectItem>
							<SelectItem value='no sabe/no responde'>
								No Sabe/No Responde
							</SelectItem>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				{showStratumFirst && renderStratumField()}

				{!isRuralZone && (
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Constructor de Dirección</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							<FormField
								control={form.control}
								name='addressType'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo de vía</FormLabel>
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
												<SelectItem value='CALLE'>Calle</SelectItem>
												<SelectItem value='CARRERA'>Carrera</SelectItem>
												<SelectItem value='DIAGONAL'>Diagonal</SelectItem>
												<SelectItem value='TRANSVERSAL'>Transversal</SelectItem>
												<SelectItem value='AVENIDA'>Avenida</SelectItem>
												<SelectItem value='CIRCULAR'>Circular</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='addressNumber1'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Número principal</FormLabel>
										<FormControl>
											<Input
												placeholder='ej: 45'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='addressLetter1'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Letra (opcional)</FormLabel>
										<FormControl>
											<Input
												placeholder='ej: A'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='addressOrientation1'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Orientación (opcional)</FormLabel>
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
												<SelectItem value='NORTE'>Norte</SelectItem>
												<SelectItem value='SUR'>Sur</SelectItem>
												<SelectItem value='ESTE'>Este</SelectItem>
												<SelectItem value='OESTE'>Oeste</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='addressNumber2'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Número secundario</FormLabel>
										<FormControl>
											<Input
												placeholder='ej: 12'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='addressNumber3'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Número final</FormLabel>
										<FormControl>
											<Input
												placeholder='ej: 34'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='addressComplement'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Complemento (opcional)</FormLabel>
									<FormControl>
										<Input
											placeholder='ej: Apartamento 302, Interior 5, etc.'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}

				{isRuralZone && (
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold'>Dirección</h3>
						<p className='text-sm text-muted-foreground'>
							Para Palmitas y Santa Elena solo se requiere complemento de
							dirección.
						</p>
						<FormField
							control={form.control}
							name='addressComplement'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Complemento (requerido)</FormLabel>
									<FormControl>
										<Input
											placeholder='Vereda, sector, referencia'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}

				{!showStratumFirst && renderStratumField()}
			</form>
		</Form>
	)
}
