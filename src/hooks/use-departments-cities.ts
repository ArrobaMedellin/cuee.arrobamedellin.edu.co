import departmentsCitiesData from '@/data/departments-cities.json'
import { useMemo, useState } from 'react'

export interface DepartmentCity {
	id: number
	departamento: string
	ciudades: string[]
}

export function useDepartmentsCities() {
	const [searchQuery, setSearchQuery] = useState('')

	const departments: DepartmentCity[] = useMemo(
		() => departmentsCitiesData as DepartmentCity[],
		[]
	)

	const filteredDepartments = useMemo(() => {
		if (!searchQuery) return departments

		return departments.filter(dept =>
			dept.departamento.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [departments, searchQuery])

	const getCitiesByDepartmentId = (departmentId: number): string[] => {
		const department = departments.find(d => d.id === departmentId)
		const cities = department?.ciudades || []

		// Crear una copia del array
		const citiesCopy = [...cities]

		// Solo ordenar con Medellín primero si es Antioquia
		if (department?.departamento === 'Antioquia') {
			return citiesCopy.sort((a, b) => {
				if (a === 'Medellín') return -1
				if (b === 'Medellín') return 1
				return a.localeCompare(b)
			})
		}

		// Para otros departamentos, orden alfabético normal
		return citiesCopy.sort((a, b) => a.localeCompare(b))
	}

	const getCitiesByDepartmentName = (departmentName: string): string[] => {
		const department = departments.find(d => d.departamento === departmentName)
		const cities = department?.ciudades || []

		// Crear una copia del array
		const citiesCopy = [...cities]

		// Solo ordenar con Medellín primero si es Antioquia
		if (departmentName === 'Antioquia') {
			return citiesCopy.sort((a, b) => {
				if (a === 'Medellín') return -1
				if (b === 'Medellín') return 1
				return a.localeCompare(b)
			})
		}

		// Para otros departamentos, orden alfabético normal
		return citiesCopy.sort((a, b) => a.localeCompare(b))
	}

	const getDepartmentById = (id: number) => {
		return departments.find(d => d.id === id)
	}

	const getDepartmentByName = (name: string) => {
		return departments.find(d => d.departamento === name)
	}

	// Obtener todas las ciudades de Colombia
	const allCities = useMemo(() => {
		const cities: string[] = []
		departments.forEach(dept => {
			dept.ciudades.forEach(city => {
				cities.push(city)
			})
		})
		return cities.sort()
	}, [departments])

	// Obtener ciudades con su departamento (para ciudades duplicadas)
	const citiesWithDepartment = useMemo(() => {
		const citiesMap: Array<{
			city: string
			department: string
			departmentId: number
		}> = []
		departments.forEach(dept => {
			dept.ciudades.forEach(city => {
				citiesMap.push({
					city,
					department: dept.departamento,
					departmentId: dept.id,
				})
			})
		})
		// Ordenar poniendo Medellín de Antioquia de primero, luego alfabéticamente
		return citiesMap.sort((a, b) => {
			// Medellín de Antioquia va primero
			if (a.city === 'Medellín' && a.department === 'Antioquia') return -1
			if (b.city === 'Medellín' && b.department === 'Antioquia') return 1
			// El resto en orden alfabético por ciudad
			return a.city.localeCompare(b.city)
		})
	}, [departments])

	return {
		departments,
		filteredDepartments,
		getCitiesByDepartmentId,
		getCitiesByDepartmentName,
		getDepartmentById,
		getDepartmentByName,
		allCities,
		citiesWithDepartment,
		searchQuery,
		setSearchQuery,
	}
}
