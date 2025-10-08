import { isMinor } from '@/utils/age'
import { useCallback, useMemo } from 'react'

/**
 * Hook para manejar campos condicionales basados en la edad
 * @param birthDate - Fecha de nacimiento en formato string (YYYY-MM-DD)
 * @returns Objetos y funciones para manejar campos condicionales
 */
export function useConditionalFields(birthDate: string) {
	const showRepresentativeFields = useMemo(() => {
		return isMinor(birthDate)
	}, [birthDate])

	const getConditionalClass = useCallback(
		(baseClass = '') => {
			return showRepresentativeFields
				? `${baseClass} transition-all duration-300 ease-in-out`
				: baseClass
		},
		[showRepresentativeFields]
	)

	return {
		showRepresentativeFields,
		getConditionalClass,
		isMinor: showRepresentativeFields,
	}
}
