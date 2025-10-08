import { Label } from '@/components/ui/label'
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
import { useState } from 'react'

interface GeographicSelectorProps {
	onCountryChange?: (countryId: number) => void
	onDepartmentChange?: (departmentId: number) => void
	onCityChange?: (cityId: number) => void
	onCommuneChange?: (communeId: number) => void
	onNeighborhoodChange?: (neighborhoodId: number) => void
	defaultValues?: {
		countryId?: number
		departmentId?: number
		cityId?: number
		communeId?: number
		neighborhoodId?: number
	}
}

export function GeographicSelector({
	onCountryChange,
	onDepartmentChange,
	onCityChange,
	onCommuneChange,
	onNeighborhoodChange,
	defaultValues,
}: GeographicSelectorProps) {
	const [selectedCountry, setSelectedCountry] = useState<number | undefined>(
		defaultValues?.countryId
	)
	const [selectedDepartment, setSelectedDepartment] = useState<
		number | undefined
	>(defaultValues?.departmentId)
	const [selectedCity, setSelectedCity] = useState<number | undefined>(
		defaultValues?.cityId
	)
	const [selectedCommune, setSelectedCommune] = useState<number | undefined>(
		defaultValues?.communeId
	)

	const { filteredCountries } = useCountries()
	const { filteredDepartments } = useDepartments(selectedCountry)
	const { filteredCities } = useCities(selectedDepartment)
	const { filteredCommunes } = useCommunes(selectedCity)
	const { filteredNeighborhoods } = useNeighborhoods(selectedCommune)

	const handleCountryChange = (value: string) => {
		const countryId = parseInt(value)
		setSelectedCountry(countryId)
		setSelectedDepartment(undefined)
		setSelectedCity(undefined)
		setSelectedCommune(undefined)
		onCountryChange?.(countryId)
	}

	const handleDepartmentChange = (value: string) => {
		const departmentId = parseInt(value)
		setSelectedDepartment(departmentId)
		setSelectedCity(undefined)
		setSelectedCommune(undefined)
		onDepartmentChange?.(departmentId)
	}

	const handleCityChange = (value: string) => {
		const cityId = parseInt(value)
		setSelectedCity(cityId)
		setSelectedCommune(undefined)
		onCityChange?.(cityId)
	}

	const handleCommuneChange = (value: string) => {
		const communeId = parseInt(value)
		setSelectedCommune(communeId)
		onCommuneChange?.(communeId)
	}

	const handleNeighborhoodChange = (value: string) => {
		const neighborhoodId = parseInt(value)
		onNeighborhoodChange?.(neighborhoodId)
	}

	return (
		<div className='space-y-4'>
			{/* País */}
			<div>
				<Label htmlFor='country'>País</Label>
				<Select
					value={selectedCountry?.toString()}
					onValueChange={handleCountryChange}
				>
					<SelectTrigger id='country'>
						<SelectValue placeholder='Selecciona un país' />
					</SelectTrigger>
					<SelectContent>
						{filteredCountries.map(country => (
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
			{selectedCountry && (
				<div>
					<Label htmlFor='department'>Departamento</Label>
					<Select
						value={selectedDepartment?.toString()}
						onValueChange={handleDepartmentChange}
					>
						<SelectTrigger id='department'>
							<SelectValue placeholder='Selecciona un departamento' />
						</SelectTrigger>
						<SelectContent>
							{filteredDepartments.map(department => (
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
			{selectedDepartment && (
				<div>
					<Label htmlFor='city'>Ciudad</Label>
					<Select
						value={selectedCity?.toString()}
						onValueChange={handleCityChange}
					>
						<SelectTrigger id='city'>
							<SelectValue placeholder='Selecciona una ciudad' />
						</SelectTrigger>
						<SelectContent>
							{filteredCities.map(city => (
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

			{/* Comuna (solo para Medellín) */}
			{selectedCity === 5001 && (
				<div>
					<Label htmlFor='commune'>Comuna</Label>
					<Select
						value={selectedCommune?.toString()}
						onValueChange={handleCommuneChange}
					>
						<SelectTrigger id='commune'>
							<SelectValue placeholder='Selecciona una comuna' />
						</SelectTrigger>
						<SelectContent>
							{filteredCommunes.map(commune => (
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

			{/* Barrio (solo para Medellín) */}
			{selectedCommune && (
				<div>
					<Label htmlFor='neighborhood'>Barrio</Label>
					<Select onValueChange={handleNeighborhoodChange}>
						<SelectTrigger id='neighborhood'>
							<SelectValue placeholder='Selecciona un barrio' />
						</SelectTrigger>
						<SelectContent>
							{filteredNeighborhoods.map(neighborhood => (
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
	)
}
