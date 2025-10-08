import communesData from '@/data/communes.json'
import { useMemo, useState } from 'react'

export interface Commune {
	id: number
	name: string
	cityId: number
}

export function useCommunes(cityId?: number) {
	const [searchQuery, setSearchQuery] = useState('')

	const communes: Commune[] = useMemo(() => communesData.data, [])

	const filteredCommunes = useMemo(() => {
		let filtered = communes

		// Filtrar por ciudad si se proporciona
		if (cityId) {
			filtered = filtered.filter(commune => commune.cityId === cityId)
		}

		// Filtrar por búsqueda
		if (searchQuery) {
			filtered = filtered.filter(commune =>
				commune.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		return filtered
	}, [communes, cityId, searchQuery])

	return {
		communes,
		filteredCommunes,
		searchQuery,
		setSearchQuery,
	}
}
