'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Switch } from '@/components/ui/switch'
import { DOCUMENT_TYPE_OPTIONS, GENDER_IDENTITY_OPTIONS } from '@/constants'
import { useCities } from '@/hooks/use-cities'
import { useCommunes } from '@/hooks/use-communes'
import { useConditionalFields } from '@/hooks/use-conditional-fields'
import { useCountries } from '@/hooks/use-countries'
import { useDepartments } from '@/hooks/use-departments'
import { useNeighborhoods } from '@/hooks/use-neighborhoods'
import type { Section2Form } from '@/schemas/section2'
import { section2Schema } from '@/schemas/section2'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function Section2Form() {
	const { data, setSectionData } = useFormStore()

	// Estados para manejar las selecciones de ubicación
	const [selectedCountryId, setSelectedCountryId] = useState<
		number | undefined
	>()
	const [selectedDepartmentId, setSelectedDepartmentId] = useState<
		number | undefined
	>()
	const [selectedCityId, setSelectedCityId] = useState<number | undefined>()
	const [selectedCommuneId, setSelectedCommuneId] = useState<
		number | undefined
	>()

	// Hooks para obtener datos geográficos
	const countries = useCountries()
	const departments = useDepartments(selectedCountryId)
	const cities = useCities(selectedDepartmentId)
	const communes = useCommunes(selectedCityId)
	const neighborhoods = useNeighborhoods(selectedCommuneId)

	// Hook para obtener todas las ciudades de Colombia (para ciudad de nacimiento)
	const allCitiesData = useCities() // Todas las ciudades sin filtro
	const allDepartments = useDepartments(1) // Departamentos de Colombia (countryId: 1)

	const form = useForm<Section2Form>({
		resolver: zodResolver(section2Schema),
		defaultValues: data.section2 || {
			birthDate: '',
			bornCity: '',
			countryOfResidence: '',
			departmentOfResidence: '',
			cityOfResidence: '',
			neighborhood: '',
			commune: '',
			phone: '',
			worksInMedellin: false,
			gender: '',
			isPregnant: '',
			sexualOrientation: '',
			genderIdentity: '',
			representativeFirstName: '',
			representativeDocumentType: '',
			representativeDocumentNumber: '',
			representativeEmail: '',
			representativePhone: '',
		},
	})

	// Restaurar IDs desde los nombres guardados cuando se carga el componente (solo una vez)
	useEffect(() => {
		if (data.section2) {
			// Restaurar país
			if (data.section2.countryOfResidence && !selectedCountryId) {
				const savedCountry = countries.countries.find(
					c => c.name === data.section2?.countryOfResidence
				)
				if (savedCountry) {
					setSelectedCountryId(savedCountry.id)
				}
			}

			// Restaurar departamento (solo si es Colombia)
			if (
				data.section2.departmentOfResidence &&
				selectedCountryId === 1 &&
				!selectedDepartmentId
			) {
				const savedDepartment = departments.departments.find(
					d => d.name === data.section2?.departmentOfResidence
				)
				if (savedDepartment) {
					setSelectedDepartmentId(savedDepartment.id)
				}
			}

			// Restaurar ciudad
			if (
				data.section2.cityOfResidence &&
				selectedDepartmentId &&
				!selectedCityId
			) {
				const savedCity = cities.cities.find(
					c => c.name === data.section2?.cityOfResidence
				)
				if (savedCity) {
					setSelectedCityId(savedCity.id)
				}
			}

			// Restaurar comuna (solo si es Medellín)
			if (
				data.section2.commune &&
				selectedCityId === 5001 &&
				!selectedCommuneId
			) {
				const savedCommune = communes.communes.find(
					c => c.name === data.section2?.commune
				)
				if (savedCommune) {
					setSelectedCommuneId(savedCommune.id)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		data.section2,
		countries.countries,
		departments.departments,
		cities.cities,
		communes.communes,
	])

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			// Solo guardar si hay datos válidos (no vacíos)
			if (values && Object.keys(values).length > 0) {
				setSectionData('section2', values as Section2Form)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, setSectionData])

	// Sincronizar nombres con IDs (solo cuando cambian los IDs por interacción del usuario)
	useEffect(() => {
		if (selectedCountryId) {
			const country = countries.countries.find(c => c.id === selectedCountryId)
			const currentValue = form.getValues('countryOfResidence')
			if (country && currentValue !== country.name) {
				form.setValue('countryOfResidence', country.name, {
					shouldValidate: false,
					shouldDirty: false,
					shouldTouch: false,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCountryId, countries.countries])

	useEffect(() => {
		if (selectedDepartmentId) {
			const department = departments.departments.find(
				d => d.id === selectedDepartmentId
			)
			const currentValue = form.getValues('departmentOfResidence')
			if (department && currentValue !== department.name) {
				form.setValue('departmentOfResidence', department.name, {
					shouldValidate: false,
					shouldDirty: false,
					shouldTouch: false,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDepartmentId, departments.departments])

	useEffect(() => {
		if (selectedCityId) {
			const city = cities.cities.find(c => c.id === selectedCityId)
			const currentValue = form.getValues('cityOfResidence')
			if (city && currentValue !== city.name) {
				form.setValue('cityOfResidence', city.name, {
					shouldValidate: false,
					shouldDirty: false,
					shouldTouch: false,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCityId, cities.cities])

	useEffect(() => {
		if (selectedCommuneId) {
			const commune = communes.communes.find(c => c.id === selectedCommuneId)
			const currentValue = form.getValues('commune')
			if (commune && currentValue !== commune.name) {
				form.setValue('commune', commune.name, {
					shouldValidate: false,
					shouldDirty: false,
					shouldTouch: false,
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCommuneId, communes.communes])

	const birthDate = form.watch('birthDate')
	const gender = form.watch('gender')
	const { showRepresentativeFields } = useConditionalFields(birthDate)

	// Limpiar campo de embarazo si no es mujer
	useEffect(() => {
		if (gender !== 'Femenino') {
			form.setValue('isPregnant', '')
		}
	}, [gender, form])

	const onSubmit = (values: Section2Form) => {
		setSectionData('section2', values)
	}

	const handleCountryChange = (countryId: number) => {
		setSelectedCountryId(countryId)
		setSelectedDepartmentId(undefined)
		setSelectedCityId(undefined)
		setSelectedCommuneId(undefined)
		form.setValue('departmentOfResidence', '')
		form.setValue('cityOfResidence', '')
		form.setValue('commune', '')
		form.setValue('neighborhood', '')
	}

	const handleDepartmentChange = (departmentId: number) => {
		setSelectedDepartmentId(departmentId)
		setSelectedCityId(undefined)
		setSelectedCommuneId(undefined)
		form.setValue('cityOfResidence', '')
		form.setValue('commune', '')
		form.setValue('neighborhood', '')
	}

	const handleCityChange = (cityId: number) => {
		setSelectedCityId(cityId)
		setSelectedCommuneId(undefined)
		form.setValue('commune', '')
		form.setValue('neighborhood', '')
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<Card>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='birthDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha de nacimiento</FormLabel>
										<FormControl>
											<Input
												type='date'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='bornCity'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ciudad de nacimiento</FormLabel>
										<Select
											onValueChange={value => {
												// Extraer solo el nombre de la ciudad del formato "nombre-departmentId"
												const cityName = value.split('-')[0]
												field.onChange(cityName)
											}}
											value={
												field.value
													? (() => {
															// Buscar la ciudad que coincida con el nombre guardado
															const matchingCity = allCitiesData.cities.find(
																city => {
																	const department =
																		allDepartments.departments.find(
																			d => d.id === city.departmentId
																		)
																	return (
																		department &&
																		department.countryId === 1 &&
																		city.name === field.value
																	)
																}
															)
															return matchingCity
																? `${matchingCity.name}-${matchingCity.departmentId}`
																: ''
													  })()
													: ''
											}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione ciudad de nacimiento' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{allCitiesData.filteredCities
													.filter(city => {
														// Solo ciudades de departamentos de Colombia
														const department = allDepartments.departments.find(
															d => d.id === city.departmentId
														)
														return department && department.countryId === 1
													})
													.map(city => {
														// Obtener el nombre del departamento para ciudades duplicadas
														const department = allDepartments.departments.find(
															d => d.id === city.departmentId
														)
														const departmentName = department?.name || ''

														// Verificar si hay otras ciudades con el mismo nombre
														const citiesWithSameName =
															allCitiesData.cities.filter(
																c =>
																	c.name === city.name &&
																	allDepartments.departments.find(
																		d =>
																			d.id === c.departmentId &&
																			d.countryId === 1
																	)
															)

														const displayName =
															citiesWithSameName.length > 1
																? `${city.name} (${departmentName})`
																: city.name

														const uniqueValue = `${city.name}-${city.departmentId}`

														return (
															<SelectItem
																key={city.id}
																value={uniqueValue}
															>
																{displayName}
															</SelectItem>
														)
													})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Teléfono</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='gender'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sexo</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Masculino'>Masculino</SelectItem>
												<SelectItem value='Femenino'>Femenino</SelectItem>
												<SelectItem value='Intersexual'>Intersexual</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='sexualOrientation'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Orientación sexual</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Heterosexual'>
													Heterosexual
												</SelectItem>
												<SelectItem value='Homosexual'>Homosexual</SelectItem>
												<SelectItem value='Bisexual'>Bisexual</SelectItem>
												<SelectItem value='Pansexual'>Pansexual</SelectItem>
												<SelectItem value='Asexual'>Asexual</SelectItem>
												<SelectItem value='Otro'>Otro</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.watch('sexualOrientation') === 'Otro' && (
								<FormField
									control={form.control}
									name='otherSexualOrientation'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Especificar orientación sexual</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							<FormField
								control={form.control}
								name='genderIdentity'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Identidad de género</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{GENDER_IDENTITY_OPTIONS.map(option => (
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
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Información de Residencia</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='countryOfResidence'
								render={() => (
									<FormItem>
										<FormLabel>País de residencia</FormLabel>
										<Select
											value={selectedCountryId?.toString()}
											onValueChange={value => {
												const countryId = Number(value)
												handleCountryChange(countryId)
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
							{selectedCountryId === 1 && (
								<FormField
									control={form.control}
									name='departmentOfResidence'
									render={() => (
										<FormItem>
											<FormLabel>Departamento</FormLabel>
											<Select
												value={selectedDepartmentId?.toString()}
												onValueChange={value => {
													const departmentId = Number(value)
													handleDepartmentChange(departmentId)
												}}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Seleccione departamento' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{departments.departments.map(department => (
														<SelectItem
															key={department.id}
															value={department.id.toString()}
														>
															{department.name}
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
						{selectedCountryId === 1 && (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{selectedDepartmentId && (
									<FormField
										control={form.control}
										name='cityOfResidence'
										render={() => (
											<FormItem>
												<FormLabel>Ciudad</FormLabel>
												<Select
													value={selectedCityId?.toString()}
													onValueChange={value => {
														const cityId = Number(value)
														handleCityChange(cityId)
													}}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Seleccione ciudad' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{cities.cities.map(city => (
															<SelectItem
																key={city.id}
																value={city.id.toString()}
															>
																{city.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								{/* Solo mostrar comuna si la ciudad es Medellín (ID: 5001) */}
								{selectedCityId === 5001 && (
									<FormField
										control={form.control}
										name='commune'
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
															setSelectedCommuneId(commune.id)
															form.setValue('commune', value)
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

						{/* Solo mostrar barrio si hay una comuna seleccionada (Medellín) */}
						{selectedCountryId === 1 &&
							selectedCityId === 5001 &&
							selectedCommuneId && (
								<FormField
									control={form.control}
									name='neighborhood'
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
														form.setValue('neighborhood', value)
														form.setValue('neighborhoodId', neighborhood.id)
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
					</CardContent>
				</Card>
				<FormField
					control={form.control}
					name='worksInMedellin'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
							<div className='space-y-0.5'>
								<FormLabel className='text-base'>
									¿Trabajas para alguna empresa de Medellín?
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
				{showRepresentativeFields && (
					<Card>
						<CardHeader>
							<CardTitle>Datos del Representante Legal</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='representativeFirstName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombres del representante</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='representativeDocumentType'
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
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='representativeDocumentNumber'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Número de documento</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='representativeEmail'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Correo electrónico</FormLabel>
											<FormControl>
												<Input
													type='email'
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
								name='representativePhone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Teléfono del representante</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				)}
			</form>
		</Form>
	)
}
