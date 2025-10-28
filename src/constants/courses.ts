// Course mapping configuration
// This maps the form course values to API course IDs

export interface CourseMapping {
	value: string
	label: string
	apiId: string // This should match the course IDs from your API
}

// Course mappings - Update the apiId values to match your actual API course IDs
export const COURSE_MAPPINGS: CourseMapping[] = [
	{
		value: 'big-data-none-little',
		label: 'Big data; None data y Little data',
		apiId: 'course-bigdata-001' // Replace with actual API ID
	},
	{
		value: 'captura-analisis-big-data',
		label: 'Captura y análisis de datos en Big Data',
		apiId: 'course-analytics-001' // Replace with actual API ID
	},
	{
		value: 'ciencia-ingenieria-datos',
		label: 'Ciencia e Ingeniería de Datos',
		apiId: 'course-datascience-001' // Replace with actual API ID
	},
	{
		value: 'inteligencia-negocios-bi',
		label: 'Inteligencia de Negocios BI',
		apiId: 'course-bi-001' // Replace with actual API ID
	},
	{
		value: 'excel-avanzado',
		label: 'Excel Avanzado para la gestión y optimización de datos',
		apiId: 'course-excel-advanced-001' // Replace with actual API ID
	},
	{
		value: 'que-es-ia',
		label: 'Que es la inteligencia artificial',
		apiId: 'course-ai-intro-001' // Replace with actual API ID
	},
	{
		value: 'marketing-digital',
		label: 'Preparando los negocios hacia el marketing digital',
		apiId: 'course-marketing-001' // Replace with actual API ID
	},
	{
		value: 'excel-intermedio',
		label: 'Excel intermedio: fundamentos para la formulación y análisis',
		apiId: 'course-excel-intermediate-001' // Replace with actual API ID
	},
	{
		value: 'crea-tu-ia',
		label: 'Crea tu propia IA',
		apiId: 'course-ai-create-001' // Replace with actual API ID
	},
	{
		value: 'ingles-basico',
		label: 'Inglés Básico',
		apiId: 'course-english-basic-001' // Replace with actual API ID
	},
	{
		value: 'ingles-intermedio',
		label: 'Inglés intermedio',
		apiId: 'course-english-intermediate-001' // Replace with actual API ID
	},
	{
		value: 'ingles-turismo',
		label: 'Inglés básico para el sector turístico',
		apiId: 'course-english-tourism-001' // Replace with actual API ID
	},
	{
		value: 'primeros-auxilios-psicologicos',
		label: 'Primeros auxilios psicológicos',
		apiId: 'course-psychology-001' // Replace with actual API ID
	},
	{
		value: 'vida-independiente',
		label: 'Vida independiente y toma de decisiones con apoyo',
		apiId: 'course-independent-life-001' // Replace with actual API ID
	},
	{
		value: 'buenas-practicas-ambientales',
		label: 'Buenas prácticas ambientales en el hogar',
		apiId: 'course-environment-001' // Replace with actual API ID
	},
	{
		value: 'economia-circular',
		label: 'Herramientas prácticas de economía circular',
		apiId: 'course-circular-economy-001' // Replace with actual API ID
	},
	{
		value: 'conmemorando-etnico',
		label: 'Conmemorando lo étnico',
		apiId: 'course-ethnic-001' // Replace with actual API ID
	}
]

// Helper function to get API ID from form value
export function getCourseApiId(formValue: string): string {
	const mapping = COURSE_MAPPINGS.find(course => course.value === formValue)
	return mapping?.apiId || formValue // Fallback to form value if not found
}

// Helper function to get all course API IDs from form values
export function getCourseApiIds(formValues: string[]): string[] {
	return formValues.map(value => getCourseApiId(value))
}

// Helper function to get form value from API ID
export function getCourseFormValue(apiId: string): string {
	const mapping = COURSE_MAPPINGS.find(course => course.apiId === apiId)
	return mapping?.value || apiId // Fallback to API ID if not found
}

// Helper function to get course label from form value
export function getCourseLabel(formValue: string): string {
	const mapping = COURSE_MAPPINGS.find(course => course.value === formValue)
	return mapping?.label || formValue // Fallback to form value if not found
}
