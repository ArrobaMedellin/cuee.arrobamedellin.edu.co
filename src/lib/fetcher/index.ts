/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/constants'
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

// Define a custom hook to handle API requests
export const useApiRequests = () => {
	const { data: session }: any = useSession()
	const token = session?.user?.token

	const get = useCallback(
		async (path: string | URL | Request) => {
			if (!token)
				throw new Error('No autenticado. Inicie sesión para continuar.')
			if (typeof path === 'string' && path.includes('undefined'))
				throw new Error('Parámetro requerido no definido.')

			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			}

			const options: RequestInit = {
				method: 'GET',
				headers,
			}

			const response = await fetch(`${API_URL}/${path}`, options)

			if (!response.ok) {
				// Clonar la respuesta para poder leer el cuerpo múltiples veces
				const responseClone = response.clone()

				// Intentar obtener mensaje de error como JSON
				try {
					const errorData = await response.json()
					throw new Error(
						errorData.message ||
							`Error ${response.status}: ${response.statusText}`
					)
				} catch (jsonError) {
					// Si no es JSON válido, usar el texto de la respuesta clonada
					try {
						const errorText = await responseClone.text()

						// Detectar diferentes tipos de errores de rate limiting
						if (
							errorText.includes('Too many requests') ||
							errorText.includes('Too many r') ||
							response.status === 429
						) {
							throw new Error(
								'Demasiadas solicitudes. El servidor está limitando las peticiones. Espere un momento e intente nuevamente.'
							)
						}

						// Detectar otros errores comunes del servidor
						if (
							errorText.includes('Service Unavailable') ||
							response.status === 503
						) {
							throw new Error(
								'Servicio temporalmente no disponible. Intente más tarde.'
							)
						}

						throw new Error(
							`Error ${response.status}: ${errorText || response.statusText}`
						)
					} catch (textError) {
						// Si también falla el texto, usar solo el status
						if (response.status === 429) {
							throw new Error(
								'Demasiadas solicitudes. Espere un momento e intente nuevamente.'
							)
						}
						throw new Error(`Error ${response.status}: ${response.statusText}`)
					}
				}
			}

			// Intentar parsear la respuesta como JSON
			const responseClone = response.clone()
			try {
				return await response.json()
			} catch (jsonError) {
				try {
					const responseText = await responseClone.text()
					console.error('Response is not valid JSON:', responseText)
					throw new Error(
						'El servidor devolvió una respuesta inválida. Intente más tarde.'
					)
				} catch (textError) {
					// Si también falla el texto, usar error genérico
					throw new Error(
						'El servidor devolvió una respuesta inválida. Intente más tarde.'
					)
				}
			}
		},
		[token]
	)

	const downloadFile = useCallback(
		async (path: string | URL | Request) => {
			if (!token)
				throw new Error('No autenticado. Inicie sesión para continuar.')
			if (typeof path === 'string' && path.includes('undefined'))
				throw new Error('Parámetro requerido no definido.')

			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
			}

			const options: RequestInit = {
				method: 'GET',
				headers,
			}

			const response = await fetch(`${API_URL}/${path}`, options)

			if (!response.ok) {
				const responseClone = response.clone()
				let errorMessage
				try {
					const errorData = await response.json()
					errorMessage = errorData.message
				} catch (e) {
					try {
						const errorText = await responseClone.text()
						errorMessage =
							errorText || `Error: ${response.status} ${response.statusText}`
					} catch (textError) {
						errorMessage = `Error: ${response.status} ${response.statusText}`
					}
				}
				throw new Error(errorMessage || 'Error al descargar archivo')
			}

			return response.arrayBuffer()
		},
		[token]
	)

	const post = useCallback(
		async (path: string | URL | Request, data: any) => {
			if (!token)
				throw new Error('No autenticado. Inicie sesión para continuar.')
			if (typeof path === 'string' && path.includes('undefined'))
				throw new Error('Parámetro requerido no definido.')

			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
			}

			let body: string | FormData

			// Check if data is FormData
			if (data instanceof FormData) {
				// Don't set Content-Type for FormData, let the browser set it with the boundary
				body = data
			} else {
				// For JSON data
				headers['Content-Type'] = 'application/json'
				body = JSON.stringify(data)
			}

			const options: RequestInit = {
				method: 'POST',
				headers,
				body,
			}

			const response = await fetch(`${API_URL}/${path}`, options)

			if (!response.ok) {
				const responseClone = response.clone()
				let errorMessage
				try {
					const errorData = await response.json()
					errorMessage = errorData.message
				} catch (e) {
					try {
						const errorText = await responseClone.text()
						errorMessage =
							errorText || `Error: ${response.status} ${response.statusText}`
					} catch (textError) {
						errorMessage = `Error: ${response.status} ${response.statusText}`
					}
				}
				throw new Error(errorMessage || 'Error making the request')
			}

			// Clone response for safe parsing
			const responseClone = response.clone()
			try {
				return await response.json()
			} catch (jsonError) {
				try {
					const textResponse = await responseClone.text()
					console.warn(
						'Response is not valid JSON, received text:',
						textResponse
					)
					return { message: textResponse }
				} catch (textError) {
					console.error(
						'Failed to parse response as JSON or text:',
						jsonError,
						textError
					)
					throw new Error('Invalid response format')
				}
			}
		},
		[token]
	)

	const put = useCallback(
		async (path: string | URL | Request, data: any) => {
			if (!token)
				throw new Error('No autenticado. Inicie sesión para continuar.')
			if (typeof path === 'string' && path.includes('undefined'))
				throw new Error('Parámetro requerido no definido.')

			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
			}

			let body: string | FormData

			if (data instanceof FormData) {
				body = data
			} else {
				headers['Content-Type'] = 'application/json'
				body = JSON.stringify(data)
			}

			const options: RequestInit = {
				method: 'PUT',
				headers,
				body,
			}

			const response = await fetch(`${API_URL}/${path}`, options)

			if (!response.ok) {
				const responseClone = response.clone()
				let errorMessage
				try {
					const errorData = await response.json()
					errorMessage = errorData.message
				} catch (e) {
					try {
						const errorText = await responseClone.text()
						errorMessage =
							errorText || `Error: ${response.status} ${response.statusText}`
					} catch (textError) {
						errorMessage = `Error: ${response.status} ${response.statusText}`
					}
				}
				throw new Error(errorMessage || 'Error making the request')
			}

			// Clone response for safe parsing
			const responseClone = response.clone()
			try {
				return await response.json()
			} catch (jsonError) {
				try {
					const textResponse = await responseClone.text()
					console.warn(
						'Response is not valid JSON, received text:',
						textResponse
					)
					return { message: textResponse }
				} catch (textError) {
					console.error(
						'Failed to parse response as JSON or text:',
						jsonError,
						textError
					)
					throw new Error('Invalid response format')
				}
			}
		},
		[token]
	)

	const patch = useCallback(
		async (path: string | URL | Request, data: any) => {
			if (!token)
				throw new Error('No autenticado. Inicie sesión para continuar.')
			if (typeof path === 'string' && path.includes('undefined'))
				throw new Error('Parámetro requerido no definido.')

			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
			}

			let body: string | FormData

			if (data instanceof FormData) {
				body = data
			} else {
				headers['Content-Type'] = 'application/json'
				body = JSON.stringify(data)
			}

			const options: RequestInit = {
				method: 'PATCH',
				headers,
				body,
			}

			const response = await fetch(`${API_URL}/${path}`, options)

			if (!response.ok) {
				const responseClone = response.clone()
				let errorMessage
				try {
					const errorData = await response.json()
					errorMessage = errorData.message
				} catch (e) {
					try {
						const errorText = await responseClone.text()
						errorMessage =
							errorText || `Error: ${response.status} ${response.statusText}`
					} catch (textError) {
						errorMessage = `Error: ${response.status} ${response.statusText}`
					}
				}
				throw new Error(errorMessage || 'Error making the request')
			}

			// Clone response for safe parsing
			const responseClone = response.clone()
			try {
				return await response.json()
			} catch (jsonError) {
				try {
					const textResponse = await responseClone.text()
					console.warn(
						'Response is not valid JSON, received text:',
						textResponse
					)
					return { message: textResponse }
				} catch (textError) {
					console.error(
						'Failed to parse response as JSON or text:',
						jsonError,
						textError
					)
					throw new Error('Invalid response format')
				}
			}
		},
		[token]
	)

	const remove = useCallback(
		async (path: string | URL | Request) => {
			if (!token)
				throw new Error('No autenticado. Inicie sesión para continuar.')
			if (typeof path === 'string' && path.includes('undefined'))
				throw new Error('Parámetro requerido no definido.')

			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			}

			const options: RequestInit = {
				method: 'DELETE',
				headers,
			}

			const response = await fetch(`${API_URL}/${path}`, options)

			if (!response.ok) {
				const responseClone = response.clone()
				let errorMessage
				try {
					const errorData = await response.json()
					errorMessage = errorData.message
				} catch (e) {
					try {
						const errorText = await responseClone.text()
						errorMessage =
							errorText || `Error: ${response.status} ${response.statusText}`
					} catch (textError) {
						errorMessage = `Error: ${response.status} ${response.statusText}`
					}
				}
				throw new Error(errorMessage || 'Error making the request')
			}

			// Clone response for safe parsing
			const responseClone = response.clone()
			try {
				return await response.json()
			} catch (jsonError) {
				try {
					const textResponse = await responseClone.text()
					console.warn(
						'Response is not valid JSON, received text:',
						textResponse
					)
					return { message: textResponse }
				} catch (textError) {
					console.error(
						'Failed to parse response as JSON or text:',
						jsonError,
						textError
					)
					throw new Error('Invalid response format')
				}
			}
		},
		[token]
	)

	return {
		get,
		downloadFile,
		post,
		put,
		patch,
		remove,
	}
}

export const postFetchRest = async (
	path: string,
	token: string | null,
	data: any
) => {
	const headers: HeadersInit = {
		Authorization: `Bearer ${token}`,
	}

	let body: string | FormData

	if (data instanceof FormData) {
		body = data
	} else {
		headers['Content-Type'] = 'application/json'
		body = JSON.stringify(data)
	}

	const options: RequestInit = {
		method: 'POST',
		headers,
		body,
	}

	const response = await fetch(`${API_URL}/${path}`, options)

	if (!response.ok) {
		const responseClone = response.clone()
		let errorMessage
		try {
			const errorData = await response.json()
			errorMessage = errorData.message
		} catch (e) {
			try {
				const errorText = await responseClone.text()
				errorMessage =
					errorText || `Error: ${response.status} ${response.statusText}`
			} catch (textError) {
				errorMessage = `Error: ${response.status} ${response.statusText}`
			}
		}
		throw new Error(errorMessage || 'Error making the request')
	}

	// Clone response for safe parsing
	const responseClone = response.clone()
	try {
		return await response.json()
	} catch (jsonError) {
		try {
			const textResponse = await responseClone.text()
			console.warn('Response is not valid JSON, received text:', textResponse)
			return { message: textResponse }
		} catch (textError) {
			console.error(
				'Failed to parse response as JSON or text:',
				jsonError,
				textError
			)
			throw new Error('Invalid response format')
		}
	}
}
