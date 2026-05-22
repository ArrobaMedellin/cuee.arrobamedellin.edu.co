// Utility script to help map course IDs
// Run this script to generate the course mapping configuration

export interface CourseApiResponse {
	id: string
	name: string
	code?: string
	shortName?: string
}

/**
 * Fetch courses from API and generate mapping configuration
 *
 * @param apiUrl - URL of your API
 * @returns Promise with course mappings
 */
export async function generateCourseMapping(apiUrl: string): Promise<string> {
	try {
		const response = await fetch(`${apiUrl}/courses`)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const courses: CourseApiResponse[] = await response.json()

		// Map API courses to form values based on name similarity
		const formCourses = [
			{
				value: 'big-data-none-little',
				label: 'Big data; None data y Little data'
			},
			{
				value: 'captura-analisis-big-data',
				label: 'Captura y análisis de datos en Big Data'
			},
			{
				value: 'ciencia-ingenieria-datos',
				label: 'Ciencia e Ingeniería de Datos'
			},
			{
				value: 'inteligencia-negocios-bi',
				label: 'Inteligencia de Negocios BI'
			},
			{
				value: 'excel-avanzado',
				label: 'Excel Avanzado para la gestión y optimización de datos'
			},
			{ value: 'que-es-ia', label: 'Que es la inteligencia artificial' },
			{
				value: 'marketing-digital',
				label: 'Preparando los negocios hacia el marketing digital'
			},
			{
				value: 'excel-intermedio',
				label: 'Excel intermedio: fundamentos para la formulación y análisis'
			},
			{ value: 'crea-tu-ia', label: 'Crea tu propia IA' },
			{ value: 'ingles-basico', label: 'Inglés Básico' },
			{ value: 'ingles-intermedio', label: 'Inglés intermedio' },
			{
				value: 'ingles-turismo',
				label: 'Inglés básico para el sector turístico'
			},
			{
				value: 'primeros-auxilios',
				label: 'Primeros auxilios'
			},
			{
				value: 'vida-independiente',
				label: 'Vida independiente y toma de decisiones con apoyo'
			},
			{
				value: 'buenas-practicas-ambientales',
				label: 'Buenas prácticas ambientales en el hogar'
			},
			{
				value: 'economia-circular',
				label: 'Herramientas prácticas de economía circular'
			},
			{ value: 'conmemorando-etnico', label: 'Conmemorando lo étnico' }
		]

		let output = `// Auto-generated course mappings
// Generated on ${new Date().toISOString()}

export const COURSE_MAPPINGS: CourseMapping[] = [\n`

		formCourses.forEach(formCourse => {
			// Try to find matching course by name similarity
			const apiCourse = findBestMatch(formCourse.label, courses)

			output += `  {\n`
			output += `    value: '${formCourse.value}',\n`
			output += `    label: '${formCourse.label}',\n`
			output += `    apiId: '${apiCourse?.id || 'REPLACE-WITH-REAL-ID'}' // ${
				apiCourse ? `Matched: ${apiCourse.name}` : 'No match found'
			}\n`
			output += `  },\n`
		})

		output += `]\n`

		return output
	} catch (error) {
		console.error('Error fetching courses:', error)
		throw error
	}
}

/**
 * Find best matching course based on name similarity
 */
function findBestMatch(
	formLabel: string,
	apiCourses: CourseApiResponse[]
): CourseApiResponse | null {
	const keywords = extractKeywords(formLabel.toLowerCase())
	let bestMatch: CourseApiResponse | null = null
	let bestScore = 0

	for (const course of apiCourses) {
		const score = calculateSimilarity(keywords, course.name.toLowerCase())
		if (score > bestScore && score > 0.3) {
			// Minimum similarity threshold
			bestScore = score
			bestMatch = course
		}
	}

	return bestMatch
}

/**
 * Extract meaningful keywords from course name
 */
function extractKeywords(text: string): string[] {
	// Remove common words and extract meaningful terms
	const stopWords = [
		'de',
		'la',
		'el',
		'en',
		'y',
		'para',
		'con',
		'del',
		'los',
		'las',
		'un',
		'una'
	]
	return text
		.split(/\s+/)
		.filter(word => word.length > 2 && !stopWords.includes(word))
		.map(word => word.replace(/[^\w]/g, ''))
}

/**
 * Calculate similarity score between two text sets
 */
function calculateSimilarity(keywords1: string[], text2: string): number {
	const matches = keywords1.filter(keyword => text2.includes(keyword))
	return matches.length / keywords1.length
}

/**
 * Usage example:
 *
 * ```typescript
 * import { generateCourseMapping } from './course-mapping-generator'
 *
 * // Generate mapping configuration
 * const mapping = await generateCourseMapping('http://localhost:3001')
 * console.log(mapping)
 *
 * // Copy the output and paste it into src/constants/courses.ts
 * ```
 */

// You can also run this in the browser console:
// 1. Open your app in the browser
// 2. Open Developer Tools (F12)
// 3. Paste this code and run:
//
// generateCourseMapping('http://localhost:3001')
//   .then(mapping => console.log(mapping))
//   .catch(console.error)
