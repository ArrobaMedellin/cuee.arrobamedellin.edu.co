'use client'

import { CitySelect } from '@/components/atoms/city-select'
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
import { useCountries } from '@/hooks/use-countries'
import { useDepartments } from '@/hooks/use-departments'
import { useNeighborhoods } from '@/hooks/use-neighborhoods'
import type { Section3Form } from '@/schemas/section3'
import { section3Schema } from '@/schemas/section3'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function Section3FormNew() {
	const { data, setSectionData } = useFormStore()
	const countries = useCountries()
	const [selectedCountryId, setSelectedCountryId] = useState<
		number | undefined
	>(data.section3?.countryOfResidenceId)
	const [selectedDepartmentId, setSelectedDepartmentId] = useState<
		number | undefined
	>(data.section3?.departmentOfResidenceId)
	const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
		data.section3?.cityOfResidenceId
	)
	const [selectedCommuneId, setSelectedCommuneId] = useState<
		number | undefined
	>(data.section3?.communeId)

	const departments = useDepartments(selectedCountryId)
	const cities = useCities(selectedDepartmentId)
	const communes = useCommunes(selectedCityId)
	const neighborhoods = useNeighborhoods(selectedCommuneId)

	const form = useForm<Section3Form>({
		resolver: zodResolver(section3Schema),
		defaultValues: data.section3 || {
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
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Residencia actual</h3>

					{/* País */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>País de residencia</label>
						<Select
							value={selectedCountryId?.toString()}
							onValueChange={value => handleCountryChange(Number(value))}
						>
							<SelectTrigger>
								<SelectValue placeholder='Selecciona país' />
							</SelectTrigger>
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
					</div>

					{/* Departamento */}
					{selectedCountryId && departments.departments.length > 0 && (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Departamento</label>
							<Select
								value={selectedDepartmentId?.toString()}
								onValueChange={value => handleDepartmentChange(Number(value))}
							>
								<SelectTrigger>
									<SelectValue placeholder='Selecciona departamento' />
								</SelectTrigger>
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
						</div>
					)}

					{/* Ciudad */}
					{selectedDepartmentId && cities.cities.length > 0 && (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Ciudad</label>
							<Select
								value={selectedCityId?.toString()}
								onValueChange={value => handleCityChange(Number(value))}
							>
								<SelectTrigger>
									<SelectValue placeholder='Selecciona ciudad' />
								</SelectTrigger>
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
						</div>
					)}

					{/* Comuna */}
					{selectedCityId && communes.communes.length > 0 && (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Comuna</label>
							<Select
								value={selectedCommuneId?.toString()}
								onValueChange={value => handleCommuneChange(Number(value))}
							>
								<SelectTrigger>
									<SelectValue placeholder='Selecciona comuna' />
								</SelectTrigger>
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
						</div>
					)}

					{/* Barrio */}
					{selectedCommuneId && neighborhoods.neighborhoods.length > 0 && (
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Barrio</label>
							<Select
								onValueChange={value => handleNeighborhoodChange(Number(value))}
							>
								<SelectTrigger>
									<SelectValue placeholder='Selecciona barrio' />
								</SelectTrigger>
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
						</div>
					)}
				</div>

				{/* Constructor de dirección */}
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

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='birthCity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ciudad de nacimiento</FormLabel>
								<FormControl>
									<CitySelect
										value={field.value}
										onValueChange={field.onChange}
										placeholder='Selecciona una ciudad'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}
