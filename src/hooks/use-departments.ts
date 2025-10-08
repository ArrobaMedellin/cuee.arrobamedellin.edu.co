import departmentsData from '@/data/departments.json'
import { useMemo, useState } from 'react'

export interface Department {
	id: number
	name: string
	countryId: number
}

export function useDepartments(countryId?: number) {
	const [searchQuery, setSearchQuery] = useState('')

	const departments: Department[] = useMemo(() => departmentsData.data, [])

	const filteredDepartments = useMemo(() => {
		let filtered = departments

		// Filtrar por país si se proporciona
		if (countryId) {
			filtered = filtered.filter(dept => dept.countryId === countryId)
		}

		// Filtrar por búsqueda
		if (searchQuery) {
			filtered = filtered.filter(dept =>
				dept.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		return filtered
	}, [departments, countryId, searchQuery])

	return {
		departments,
		filteredDepartments,
		searchQuery,
		setSearchQuery,
	}
}
