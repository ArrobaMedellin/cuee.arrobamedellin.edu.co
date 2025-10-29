import {
	CreateApplicantDto,
	UpdateApplicantDto,
} from './mappers/applicant-mapper'

// API service for handling applicant submissions
export class ApiService {
	private baseUrl: string

	constructor(
		baseUrl: string = process.env.NEXT_PUBLIC_API_URL ||
			'http://localhost:4000/api'
	) {
		this.baseUrl = baseUrl
	}

	async createApplicant(applicantData: CreateApplicantDto) {
		try {
			console.log(
				'Sending applicant data:',
				JSON.stringify(applicantData, null, 2)
			)

			const response = await fetch(`${this.baseUrl}/applicants`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(applicantData),
			})

			console.log('Response status:', response.status)

			if (!response.ok) {
				const errorData = await response.json()
				console.error('Error response:', errorData)
				throw new Error(
					errorData.message || `HTTP error! status: ${response.status}`
				)
			}

			const result = await response.json()
			console.log('Applicant created:', result)
			return result
		} catch (error) {
			console.error('Error creating applicant:', error)
			throw error
		}
	}

	async findApplicantByDocument(document: string) {
		try {
			const response = await fetch(
				`${this.baseUrl}/applicants/document/${document}`
			)

			if (!response.ok) {
				if (response.status === 404) {
					return null
				}
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			// Verificar si hay contenido en la respuesta
			const text = await response.text()
			if (!text || text.trim() === '') {
				return null
			}

			return JSON.parse(text)
		} catch (error) {
			console.error('Error finding applicant by document:', error)
			throw error
		}
	}

	async updateApplicant(id: string, applicantData: UpdateApplicantDto) {
		try {
			const response = await fetch(`${this.baseUrl}/applicants/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(applicantData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(
					errorData.message || `HTTP error! status: ${response.status}`
				)
			}

			return await response.json()
		} catch (error) {
			console.error('Error updating applicant:', error)
			throw error
		}
	}
}

export const apiService = new ApiService()
