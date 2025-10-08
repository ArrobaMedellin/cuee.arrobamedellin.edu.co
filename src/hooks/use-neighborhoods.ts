import neighborhoodsData from '@/data/neighborhoods.json'
import { useMemo, useState } from 'react'

export interface Neighborhood {
	id: number
	name: string
	communeId: number
}

export function useNeighborhoods(communeId?: number) {
	const [searchQuery, setSearchQuery] = useState('')

	const neighborhoods: Neighborhood[] = useMemo(
		() => neighborhoodsData.data,
		[]
	)

	const filteredNeighborhoods = useMemo(() => {
		let filtered = neighborhoods

		// Filtrar por comuna si se proporciona
		if (communeId) {
			filtered = filtered.filter(
				neighborhood => neighborhood.communeId === communeId
			)
		}

		// Filtrar por búsqueda
		if (searchQuery) {
			filtered = filtered.filter(neighborhood =>
				neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		return filtered
	}, [neighborhoods, communeId, searchQuery])

	return {
		neighborhoods,
		filteredNeighborhoods,
		searchQuery,
		setSearchQuery,
	}
}
