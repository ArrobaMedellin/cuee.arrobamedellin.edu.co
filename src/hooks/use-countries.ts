import countriesData from '@/data/countries.json'
import { useMemo, useState } from 'react'

export interface Country {
	id: number
	name: string
}

export function useCountries() {
	const [searchQuery, setSearchQuery] = useState('')

	const countries: Country[] = useMemo(() => countriesData.data, [])

	const filteredCountries = useMemo(() => {
		if (!searchQuery) return countries

		return countries.filter(country =>
			country.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [countries, searchQuery])

	return {
		countries,
		filteredCountries,
		searchQuery,
		setSearchQuery,
	}
}
