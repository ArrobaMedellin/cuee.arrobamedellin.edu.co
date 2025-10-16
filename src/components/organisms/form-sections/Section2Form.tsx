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
	const allCities = useCities()
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
			gender: '',
			sexualOrientation: '',
			genderIdentity: '',
			representativeFirstName: '',
			representativeDocumentType: '',
			representativeDocumentNumber: '',
			representativeEmail: '',
			representativePhone: '',
		},
	})

	// Sincronizar nombres con IDs
	useEffect(() => {
		if (selectedCountryId) {
			const country = countries.countries.find(c => c.id === selectedCountryId)
			if (country) {
				form.setValue('countryOfResidence', country.name)
			}
		}
	}, [selectedCountryId, countries.countries, form])

	useEffect(() => {
		if (selectedDepartmentId) {
			const department = departments.departments.find(
				d => d.id === selectedDepartmentId
			)
			if (department) {
				form.setValue('departmentOfResidence', department.name)
			}
		}
	}, [selectedDepartmentId, departments.departments, form])

	useEffect(() => {
		if (selectedCityId) {
			const city = cities.cities.find(c => c.id === selectedCityId)
			if (city) {
				form.setValue('cityOfResidence', city.name)
			}
		}
	}, [selectedCityId, cities.cities, form])

	useEffect(() => {
		if (selectedCommuneId) {
			const commune = communes.communes.find(c => c.id === selectedCommuneId)
			if (commune) {
				form.setValue('commune', commune.name)
			}
		}
	}, [selectedCommuneId, communes.communes, form])

	const birthDate = form.watch('birthDate')
	const { showRepresentativeFields } = useConditionalFields(birthDate)

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

	const handleCommuneChange = (communeId: number) => {
		setSelectedCommuneId(communeId)
		form.setValue('neighborhood', '')
	}

	const handleNeighborhoodChange = (neighborhoodId: number) => {
		const neighborhood = neighborhoods.neighborhoods.find(
			n => n.id === neighborhoodId
		)
		if (neighborhood) {
			form.setValue('neighborhood', neighborhood.name)
			form.setValue('neighborhoodId', neighborhoodId)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<Card>
					<CardHeader>
						<CardTitle>Información Personal</CardTitle>
					</CardHeader>
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
															const matchingCity = allCities.cities.find(
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
												{allCities.cities
													.filter(city => {
														// Solo ciudades de departamentos de Colombia
														const department = allDepartments.departments.find(
															d => d.id === city.departmentId
														)
														return department && department.countryId === 1
													})
													.sort((a, b) => a.name.localeCompare(b.name))
													.map(city => {
														// Obtener el nombre del departamento para ciudades duplicadas
														const department = allDepartments.departments.find(
															d => d.id === city.departmentId
														)
														const departmentName = department?.name || ''

														// Verificar si hay otras ciudades con el mismo nombre
														const citiesWithSameName = allCities.cities.filter(
															c =>
																c.name === city.name &&
																allDepartments.departments.find(
																	d =>
																		d.id === c.departmentId && d.countryId === 1
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
											defaultValue={field.value}
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
											defaultValue={field.value}
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
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Hombre'>Hombre</SelectItem>
												<SelectItem value='Mujer'>Mujer</SelectItem>
												<SelectItem value='No binario'>No binario</SelectItem>
												<SelectItem value='Transgénero'>Transgénero</SelectItem>
												<SelectItem value='Otro'>Otro</SelectItem>
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

							{selectedCountryId && (
								<FormField
									control={form.control}
									name='departmentOfResidence'
									render={() => (
										<FormItem>
											<FormLabel>Departamento</FormLabel>
											<Select
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

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{selectedDepartmentId && (
								<FormField
									control={form.control}
									name='cityOfResidence'
									render={() => (
										<FormItem>
											<FormLabel>Ciudad</FormLabel>
											<Select
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

							{selectedCityId && (
								<FormField
									control={form.control}
									name='commune'
									render={() => (
										<FormItem>
											<FormLabel>Comuna</FormLabel>
											<Select
												onValueChange={value => {
													const communeId = Number(value)
													handleCommuneChange(communeId)
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
															value={commune.id.toString()}
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

						{selectedCommuneId && (
							<FormField
								control={form.control}
								name='neighborhood'
								render={() => (
									<FormItem>
										<FormLabel>Barrio</FormLabel>
										<Select
											onValueChange={value => {
												const neighborhoodId = Number(value)
												handleNeighborhoodChange(neighborhoodId)
											}}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Seleccione barrio' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{neighborhoods.neighborhoods.map(neighborhood => (
													<SelectItem
														key={neighborhood.id}
														value={neighborhood.id.toString()}
													>
														{neighborhood.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</CardContent>
				</Card>

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
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Seleccione' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='CC'>
														Cédula de Ciudadanía
													</SelectItem>
													<SelectItem value='CE'>
														Cédula de Extranjería
													</SelectItem>
													<SelectItem value='PP'>Pasaporte</SelectItem>
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
