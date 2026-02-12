'use client'

import { Button } from '@/components/ui/button'
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
import { DOCUMENT_TYPE_OPTIONS } from '@/constants'
import { useAutofillForm } from '@/hooks/use-autofill-form'
import { useCountries } from '@/hooks/use-countries'
import { useDepartmentsCities } from '@/hooks/use-departments-cities'
import type { Section1Form } from '@/schemas/section1'
import { section1Schema } from '@/schemas/section1'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export function Section1Form() {
	const { data, setSectionData } = useFormStore()
	const { isSearching, searchByDocument } = useAutofillForm()

	// Estados para lugar de nacimiento
	const [selectedBirthCountryId, setSelectedBirthCountryId] = useState<
		number | undefined
	>()
	const [selectedBirthDepartmentName, setSelectedBirthDepartmentName] =
		useState<string>('')

	// Hooks geográficos
	const countries = useCountries()
	const departmentsCities = useDepartmentsCities()

	// Ciudades del departamento de nacimiento seleccionado
	const birthCities = useMemo(() => {
		if (!selectedBirthDepartmentName) return []
		return departmentsCities.getCitiesByDepartmentName(
			selectedBirthDepartmentName,
		)
	}, [selectedBirthDepartmentName, departmentsCities])

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
			otherDocumentType: '',
		},
	})

	// Restaurar selecciones geográficas desde datos guardados
	useEffect(() => {
		if (data.section1) {
			if (data.section1.countryOfBirth && !selectedBirthCountryId) {
				const savedCountry = countries.countries.find(
					c => c.name === data.section1?.countryOfBirth,
				)
				if (savedCountry) {
					setSelectedBirthCountryId(savedCountry.id)
				}
			}
			if (data.section1.departmentOfBirth && !selectedBirthDepartmentName) {
				setSelectedBirthDepartmentName(data.section1.departmentOfBirth)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.section1, countries.countries])

	// Sincronizar nombre del país con el ID seleccionado
	useEffect(() => {
		if (selectedBirthCountryId) {
			const country = countries.countries.find(
				c => c.id === selectedBirthCountryId,
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

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			// Solo guardar si hay datos válidos (no vacíos)
			if (values && Object.keys(values).length > 0) {
				// Asegurar que los campos opcionales siempre sean string (no undefined)
				const cleanValues = {
					...values,
					countryOfBirth: values.countryOfBirth ?? '',
					departmentOfBirth: values.departmentOfBirth ?? '',
					municipalityOfBirth: values.municipalityOfBirth ?? '',
					otherDocumentType: values.otherDocumentType ?? '',
				}
				setSectionData('section1', cleanValues as Section1Form)
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
					form.reset(freshData)
					// Re-restaurar selecciones geográficas
					if (freshData.countryOfBirth) {
						const country = countries.countries.find(
							c => c.name === freshData.countryOfBirth,
						)
						if (country) setSelectedBirthCountryId(country.id)
					}
					if (freshData.departmentOfBirth) {
						setSelectedBirthDepartmentName(freshData.departmentOfBirth)
					}
				}
			}
		}
	}

	const handleBirthCountryChange = (countryId: number) => {
		setSelectedBirthCountryId(countryId)
		setSelectedBirthDepartmentName('')
		form.setValue('departmentOfBirth', '', { shouldValidate: true })
		form.setValue('municipalityOfBirth', '', { shouldValidate: true })
	}

	const handleBirthDepartmentChange = (departmentName: string) => {
		setSelectedBirthDepartmentName(departmentName)
		form.setValue('departmentOfBirth', departmentName, {
			shouldValidate: true,
		})
		form.setValue('municipalityOfBirth', '', { shouldValidate: true })
	}

	const handleBirthMunicipalityChange = (cityName: string) => {
		form.setValue('municipalityOfBirth', cityName, { shouldValidate: true })
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

				{/* Lugar de Nacimiento */}
				<Card>
					<CardHeader>
						<CardTitle>Lugar de Nacimiento</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
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
												handleBirthCountryChange(Number(value))
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

							{/* Departamento solo si es Colombia (ID: 1) */}
							{selectedBirthCountryId === 1 && (
								<FormField
									control={form.control}
									name='departmentOfBirth'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Departamento de nacimiento</FormLabel>
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

						{/* Municipio solo si hay departamento seleccionado */}
						{selectedBirthCountryId === 1 && selectedBirthDepartmentName && (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='municipalityOfBirth'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Municipio de nacimiento</FormLabel>
											<Select
												value={field.value}
												onValueChange={value => {
													handleBirthMunicipalityChange(value)
												}}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Seleccione municipio' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{birthCities.map((city, index) => (
														<SelectItem
															key={`${city}-${index}`}
															value={city}
														>
															{city}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
