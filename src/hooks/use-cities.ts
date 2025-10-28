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

		// Ordenar para que Medellín siempre esté de primero y el resto alfabéticamente
		return filtered.sort((a, b) => {
			if (a.name === 'Medellín') return -1
			if (b.name === 'Medellín') return 1
			return a.name.localeCompare(b.name)
		})
	}, [cities, departmentId, searchQuery])

	return {
		cities,
		filteredCities,
		searchQuery,
		setSearchQuery
	}
}
