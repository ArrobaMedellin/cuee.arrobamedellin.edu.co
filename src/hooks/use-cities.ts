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

		// Ordenar para que Medellín siempre esté de primero
		return filtered.sort((a, b) => {
			if (a.name === 'Medellín') return -1
			if (b.name === 'Medellín') return 1
			return 0
		})
	}, [cities, departmentId, searchQuery])

	return {
		cities,
		filteredCities,
		searchQuery,
		setSearchQuery
	}
}
