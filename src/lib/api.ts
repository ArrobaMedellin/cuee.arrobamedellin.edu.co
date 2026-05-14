import {
	CreateApplicantDto,
	UpdateApplicantDto,
} from './mappers/applicant-mapper'

const DEFAULT_TIMEOUT_MS = 30_000

async function fetchWithTimeout(
	url: string,
	options: Omit<RequestInit, 'signal'> = {},
	timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
	try {
		return await fetch(url, { ...options, signal: controller.signal })
	} finally {
		clearTimeout(timeoutId)
	}
}

async function readErrorMessage(response: Response): Promise<string> {
	const text = await response.text()
	if (!text?.trim()) return `HTTP error! status: ${response.status}`
	try {
		const data = JSON.parse(text) as { message?: string }
		return data.message || `HTTP error! status: ${response.status}`
	} catch {
		return text.length > 300 ? `${text.slice(0, 300)}…` : text
	}
}

async function parseJsonFromResponse<T>(response: Response): Promise<T> {
	const text = await response.text()
	if (!text?.trim()) return {} as T
	try {
		return JSON.parse(text) as T
	} catch {
		throw new Error('La respuesta del servidor no es JSON válido')
	}
}

// API service for handling applicant submissions
export class ApiService {
	private baseUrl: string

	constructor(
		baseUrl: string = process.env.NEXT_PUBLIC_API_URL ||
			'http://localhost:4000/api',
	) {
		this.baseUrl = baseUrl
	}

	async createApplicant(applicantData: CreateApplicantDto) {
		try {
			const response = await fetchWithTimeout(`${this.baseUrl}/applicants`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(applicantData),
			})

			if (!response.ok) {
				throw new Error(await readErrorMessage(response))
			}

			return await parseJsonFromResponse<unknown>(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	async findApplicantByDocument(document: string, period?: string) {
		try {
			const url = period
				? `${this.baseUrl}/applicants/document/${encodeURIComponent(document)}?period=${encodeURIComponent(period)}`
				: `${this.baseUrl}/applicants/document/${encodeURIComponent(document)}`
			const response = await fetchWithTimeout(url)

			if (!response.ok) {
				if (response.status === 404) return null
				throw new Error(await readErrorMessage(response))
			}

			const text = await response.text()
			if (!text || text.trim() === '') return null

			try {
				return JSON.parse(text) as unknown
			} catch {
				throw new Error('Respuesta de aplicante no válida')
			}
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	async updateApplicant(id: string, applicantData: UpdateApplicantDto) {
		try {
			const response = await fetchWithTimeout(
				`${this.baseUrl}/applicants/${id}`,
				{
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(applicantData),
				},
			)

			if (!response.ok) {
				throw new Error(await readErrorMessage(response))
			}

			return await parseJsonFromResponse<unknown>(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	async checkActiveEnrollment(
		document: string,
		period?: string,
	): Promise<{
		hasActiveEnrollment: boolean
		enrollments: Array<{
			id: string
			courseCode: string
			courseName: string
			status: string
			enrollmentDate: Date
		}>
	}> {
		try {
			const url = period
				? `${this.baseUrl}/enrollment/check-active/${encodeURIComponent(document)}?period=${encodeURIComponent(period)}`
				: `${this.baseUrl}/enrollment/check-active/${encodeURIComponent(document)}`
			const response = await fetchWithTimeout(url)

			if (!response.ok) {
				throw new Error(await readErrorMessage(response))
			}

			return await parseJsonFromResponse(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	async getEnrollmentsByApplicant(applicantId: string) {
		try {
			const response = await fetchWithTimeout(
				`${this.baseUrl}/enrollment/applicant/${applicantId}`,
			)

			if (!response.ok) {
				if (response.status === 401 || response.status === 403) return []
				throw new Error(await readErrorMessage(response))
			}

			return await parseJsonFromResponse<unknown[]>(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	async getApplicantStatus(
		document: string,
		period?: string,
	): Promise<{
		flowType: 'NEW' | 'REENROLLMENT' | 'BLOCKED'
		message: string
		activeEnrollments: Array<{
			id: string
			courseCode: string
			courseName: string
			status: string
			period: string
			enrollmentDate?: Date
		}>
		finishedEnrollments: Array<{
			id: string
			courseCode: string
			courseName: string
			status: string
			period: string
			enrollmentDate?: Date
		}>
		disabledCourseIds: string[]
		applicantData?: {
			id: string
			documentType?: string
			document: string
			firstName?: string
			lastName?: string
			email?: string
			cellphone?: string
			gender?: string
			birthCountry?: string
			birthDepartment?: string
			birthMunicipality?: string
			birthDate?: Date
			residenceCountry?: string
			residenceDepartment?: string
			residenceMunicipality?: string
			neighborhood?: string
			commune?: string
			stratum?: string
			enrollmentDate?: Date
		}
	}> {
		try {
			const url = period
				? `${this.baseUrl}/enrollment/applicant-status/${encodeURIComponent(document)}?period=${encodeURIComponent(period)}`
				: `${this.baseUrl}/enrollment/applicant-status/${encodeURIComponent(document)}`
			const response = await fetchWithTimeout(url)

			if (!response.ok) {
				throw new Error(await readErrorMessage(response))
			}

			return await parseJsonFromResponse(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	// ─── Endpoints unificados por tipo de formulario (/form/:type/*) ──────────

	private get formType(): string {
		return process.env.NEXT_PUBLIC_FORM_TYPE || 'inscripciones'
	}

	async getFormStatus(document: string): Promise<{
		flowType: 'NEW' | 'REENROLLMENT' | 'BLOCKED'
		message: string
		period: string
		activeEnrollments: Array<{
			id: string
			courseCode: string
			courseName: string
			status: string
			period: string
			enrollmentDate?: Date
		}>
		finishedEnrollments: Array<{
			id: string
			courseCode: string
			courseName: string
			status: string
			period: string
			enrollmentDate?: Date
		}>
		disabledCourseIds: string[]
		applicantData?: {
			id: string
			documentType?: string
			document: string
			firstName?: string
			lastName?: string
			email?: string
			cellphone?: string
			gender?: string
			birthCountry?: string
			birthDepartment?: string
			birthMunicipality?: string
			birthDate?: Date
			residenceCountry?: string
			residenceDepartment?: string
			residenceMunicipality?: string
			neighborhood?: string
			commune?: string
			stratum?: string
		}
	}> {
		try {
			const url = `${this.baseUrl}/form/${this.formType}/status/${encodeURIComponent(document)}`
			const response = await fetchWithTimeout(url)
			if (!response.ok) {
				throw new Error(await readErrorMessage(response))
			}
			return await parseJsonFromResponse(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}

	async submitForm(dto: CreateApplicantDto): Promise<{
		success: boolean
		applicantId: string
		isNew: boolean
		enrollmentsCreated: number
	}> {
		try {
			const url = `${this.baseUrl}/form/${this.formType}/submit`
			const response = await fetchWithTimeout(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dto),
			})
			if (!response.ok) {
				throw new Error(await readErrorMessage(response))
			}
			return await parseJsonFromResponse(response)
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('La solicitud tardó demasiado. Intenta de nuevo.')
			}
			throw error
		}
	}
}

export const apiService = new ApiService()
