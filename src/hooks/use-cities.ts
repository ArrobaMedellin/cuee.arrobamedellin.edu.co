import citiesData from '@/data/cities.json'
import { useMemo, useState } from 'react'

export interface City {
	id: number
	name: string
	departmentId: number
}

export function useCities(departmentId?: number) {
	const [searchQuery, setSearchQuery] = useState('')

	const cities: City[] = useMemo(() => citiesData.data, [])

	const filteredCities = useMemo(() => {
		let filtered = cities

		// Filtrar por departamento si se proporciona
		if (departmentId) {
			filtered = filtered.filter(city => city.departmentId === departmentId)
		}

		// Filtrar por búsqueda
		if (searchQuery) {
			filtered = filtered.filter(city =>
				city.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		return filtered
	}, [cities, departmentId, searchQuery])

	return {
		cities,
		filteredCities,
		searchQuery,
		setSearchQuery,
	}
}
