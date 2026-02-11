'use client'

import { Button } from '@/components/ui/button'
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
import { DOCUMENT_TYPE_OPTIONS } from '@/constants'
import { useAutofillForm } from '@/hooks/use-autofill-form'
import type { Section1Form } from '@/schemas/section1'
import { section1Schema } from '@/schemas/section1'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function Section1Form() {
	const { data, setSectionData } = useFormStore()
	const { isSearching, searchByDocument } = useAutofillForm()
	const form = useForm<Section1Form>({
		resolver: zodResolver(section1Schema),
		defaultValues: data.section1 || {
			firstName: '',
			lastName: '',
			documentType: '',
			documentNumber: '',
			email: '',
			emailVerification: '',
			countryOfBirth: '',
			departmentOfBirth: '',
			municipalityOfBirth: '',
			communeOfBirth: '',
			neighborhoodOfBirth: '',
			otherDocumentType: '',
		},
	})

	// Restaurar valores desde los nombres guardados
	useEffect(() => {
		if (data.section1) {
			// Restaurar país
			if (data.section1.countryOfBirth && !selectedBirthCountryId) {
				const savedCountry = countries.countries.find(
					c => c.name === data.section1?.countryOfBirth
				)
				if (savedCountry) {
					setSelectedBirthCountryId(savedCountry.id)
				}
			}

			// Restaurar departamento
			if (data.section1.departmentOfBirth && !selectedBirthDepartmentName) {
				setSelectedBirthDepartmentName(data.section1.departmentOfBirth)
			}

			// Restaurar ciudad (municipalityOfBirth)
			if (data.section1.municipalityOfBirth && !selectedBirthCityName) {
				setSelectedBirthCityName(data.section1.municipalityOfBirth)
			}

			// Restaurar comuna (solo si es Medellín)
			if (
				data.section1.communeOfBirth &&
				data.section1.municipalityOfBirth === 'Medellín' &&
				!selectedBirthCommuneId
			) {
				const savedCommune = communes.communes.find(
					c => c.name === data.section1?.communeOfBirth
				)
				if (savedCommune) {
					setSelectedBirthCommuneId(savedCommune.id)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.section1, countries.countries])

	// Sincronizar nombres con IDs
	useEffect(() => {
		if (selectedBirthCountryId) {
			const country = countries.countries.find(
				c => c.id === selectedBirthCountryId
			)
			const currentValue = form.getValues('countryOfBirth')
			if (country && currentValue !== country.name) {
				form.setValue('countryOfBirth', country.name, {
					shouldValidate: false,
					shouldDirty: false,
					shouldTouch: false,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedBirthCountryId, countries.countries])

	useEffect(() => {
		if (selectedBirthCommuneId) {
			const commune = communes.communes.find(
				c => c.id === selectedBirthCommuneId
			)
			const currentValue = form.getValues('communeOfBirth')
			if (commune && currentValue !== commune.name) {
				form.setValue('communeOfBirth', commune.name, {
					shouldValidate: false,
					shouldDirty: false,
					shouldTouch: false,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedBirthCommuneId, communes.communes])

	const handleBirthCountryChange = (countryId: number) => {
		setSelectedBirthCountryId(countryId)
		setSelectedBirthDepartmentName('')
		setSelectedBirthCityName('')
		setSelectedBirthCommuneId(undefined)
		form.setValue('departmentOfBirth', '')
		form.setValue('municipalityOfBirth', '')
		form.setValue('communeOfBirth', '')
		form.setValue('neighborhoodOfBirth', '')
	}

	const handleBirthDepartmentChange = (departmentName: string) => {
		setSelectedBirthDepartmentName(departmentName)
		setSelectedBirthCityName('')
		setSelectedBirthCommuneId(undefined)
		form.setValue('departmentOfBirth', departmentName)
		form.setValue('municipalityOfBirth', '')
		form.setValue('communeOfBirth', '')
		form.setValue('neighborhoodOfBirth', '')
	}

	const handleBirthCityChange = (cityName: string) => {
		setSelectedBirthCityName(cityName)
		setSelectedBirthCommuneId(undefined)
		form.setValue('municipalityOfBirth', cityName)
		form.setValue('communeOfBirth', '')
		form.setValue('neighborhoodOfBirth', '')
	}

	// Verificar si la comuna seleccionada es un corregimiento
	const isCorregimiento = () => {
		if (!selectedBirthCommuneId) return false
		const selectedCommune = communes.communes.find(
			c => c.id === selectedBirthCommuneId
		)
		return selectedCommune?.name.includes('(Corregimiento)') || false
	}

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			// Solo guardar si hay datos válidos (no vacíos)
			if (values && Object.keys(values).length > 0) {
				setSectionData('section1', values as Section1Form)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, setSectionData])

	const onSubmit = (values: Section1Form) => {
		setSectionData('section1', values)
	}

	const handleSearch = async () => {
		const documentNumber = form.getValues('documentNumber')
		if (documentNumber) {
			const found = await searchByDocument(documentNumber)
			if (found) {
				const freshData = useFormStore.getState().data.section1
				if (freshData) {
					// Actualizar el formulario con los datos del store
					form.reset(freshData)
				}
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<p className='text-xs text-muted-foreground mt-1'>
					Si ya te inscribiste antes, haz clic en buscar para autocompletar el
					formulario
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='documentType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo de documento</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona tipo' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{DOCUMENT_TYPE_OPTIONS.map(option => (
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
					{form.watch('documentType') === 'Otro' && (
						<FormField
							control={form.control}
							name='otherDocumentType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Especifica el tipo de documento</FormLabel>
									<FormControl>
										<Input
											placeholder='Ingresa el tipo de documento'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='documentNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Número de documento</FormLabel>
								<div className='flex gap-2'>
									<FormControl>
										<Input
											placeholder='Ingresa número'
											{...field}
											onKeyDown={e => {
												if (e.key === 'Enter') {
													e.preventDefault()
													handleSearch()
												}
											}}
										/>
									</FormControl>
									<Button
										type='button'
										variant='outline'
										size='icon'
										onClick={handleSearch}
										disabled={isSearching || !field.value}
										title='Buscar inscripción previa'
									>
										{isSearching ? (
											<Loader2 className='h-4 w-4 animate-spin' />
										) : (
											<Search className='h-4 w-4' />
										)}
									</Button>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombres</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa tus nombres'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellidos</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa tus apellidos'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='correo@ejemplo.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='emailVerification'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verificar correo electrónico</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='correo@ejemplo.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Información de Nacimiento */}
				<div className='space-y-4 border p-4 rounded-md'>
					<h3 className='font-medium'>Lugar de Nacimiento</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='countryOfBirth'
							render={() => (
								<FormItem>
									<FormLabel>País de nacimiento</FormLabel>
									<Select
										value={selectedBirthCountryId?.toString()}
										onValueChange={value => {
											const countryId = Number(value)
											handleBirthCountryChange(countryId)
										}}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Seleccione país' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{countries.countries.map(country => (
												<SelectItem
													key={country.id}
													value={country.id.toString()}
												>
													{country.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Solo mostrar departamento si el país es Colombia (ID: 1) */}
						{selectedBirthCountryId === 1 && (
							<FormField
								control={form.control}
								name='departmentOfBirth'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Departamento</FormLabel>
										<Select
											value={field.value}
											onValueChange={value => {
												handleBirthDepartmentChange(value)
											}}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione departamento' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{departmentsCities.departments.map(department => (
													<SelectItem
														key={department.id}
														value={department.departamento}
													>
														{department.departamento}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>

					{/* Solo mostrar ciudad y comuna si el país es Colombia */}
					{selectedBirthCountryId === 1 && (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{selectedBirthDepartmentName && (
								<FormField
									control={form.control}
									name='municipalityOfBirth'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ciudad</FormLabel>
											<Select
												value={field.value}
												onValueChange={value => {
													handleBirthCityChange(value)
												}}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Seleccione ciudad' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{citiesOfSelectedBirthDepartment.map(
														(city, index) => (
															<SelectItem
																key={`${city}-${index}`}
																value={city}
															>
																{city}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{/* Solo mostrar comuna si la ciudad es Medellín */}
							{selectedBirthCityName === 'Medellín' && (
								<FormField
									control={form.control}
									name='communeOfBirth'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Comuna</FormLabel>
											<Select
												value={field.value}
												onValueChange={value => {
													// El valor ahora es el nombre completo (ej: "1 - Popular")
													const commune = communes.communes.find(
														c => c.name === value
													)
													if (commune) {
														setSelectedBirthCommuneId(commune.id)
														form.setValue('communeOfBirth', value)
													}
												}}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Seleccione comuna' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{communes.communes.map(commune => (
														<SelectItem
															key={commune.id}
															value={commune.name}
														>
															{commune.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>
					)}

					{/* Solo mostrar barrio si hay una comuna seleccionada (Medellín) y NO es corregimiento */}
					{selectedBirthCountryId === 1 &&
						selectedBirthCityName === 'Medellín' &&
						selectedBirthCommuneId &&
						!isCorregimiento() && (
							<FormField
								control={form.control}
								name='neighborhoodOfBirth'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Barrio</FormLabel>
										<Select
											value={field.value}
											onValueChange={value => {
												// El value ahora es el nombre del barrio
												const neighborhood =
													neighborhoods.filteredNeighborhoods.find(
														n => n.name === value
													)
												if (neighborhood) {
													form.setValue('neighborhoodOfBirth', value)
												}
											}}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione barrio' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{neighborhoods.filteredNeighborhoods.map(
													neighborhood => (
														<SelectItem
															key={neighborhood.id}
															value={neighborhood.name}
														>
															{neighborhood.name}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
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
