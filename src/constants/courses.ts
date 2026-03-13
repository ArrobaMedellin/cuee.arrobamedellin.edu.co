// Course mapping configuration
// This maps the form course values to API course IDs

export interface CourseMapping {
	value: string
	label: string
	apiId: string // This should match the course IDs from your API
	onlyForSantaElena?: boolean
}

// Course mappings - Sapiencia courses
export const COURSE_MAPPINGS: CourseMapping[] = [
	{
		value: 'ingles-basico',
		label: 'Inglés Básico',
		apiId: '30504000',
	},
	{
		value: 'ingles-intermedio',
		label: 'Inglés intermedio',
		apiId: '30504001',
	},
	{
		value: 'ingles-basico-sector-turistico',
		label: 'Inglés Basico para el Sector Turistico',
		apiId: '30504002',
	},
	{
		value: 'ingles-avanzado',
		label: 'Inglés avanzado',
		apiId: '30504003',
	},
	{
		value: 'ciencia-ingenieria-datos',
		label: 'Ciencia e Ingeniería de Datos',
		apiId: '30504004',
	},
	{
		value: 'excel-avanzado',
		label: 'Excel Avanzado para la gestión y optimización de datos',
		apiId: '30504005',
	},
	{
		value: 'excel-intermedio',
		label: 'Excel intermedio: fundamentos para la formulación y análisis',
		apiId: '30504006',
	},
	{
		value: 'inteligencia-negocios-bi',
		label: 'Inteligencia de Negocios (BI)',
		apiId: '30504007',
	},
	{
		value: 'creatividad',
		label: 'Creatividad',
		apiId: '30504008',
	},
	{
		value: 'fotoproducto',
		label: 'Fotoproducto',
		apiId: '30504009',
	},
	{
		value: 'fotorreportaje',
		label: 'Fotorreportaje',
		apiId: '30504010',
	},
	{
		value: 'emprendimientos-creativos',
		label: 'Emprendimientos creativos: De la idea al proyecto Sostenible',
		apiId: '30504011',
	},
	{
		value: 'diseno-basico-vestuario-escenico',
		label: 'Diseño básico de vestuario escénico',
		apiId: '30504012',
	},
	{
		value: 'stop-motion-moviles',
		label: 'Stop Motion con dispositivos móviles',
		apiId: '30504013',
	},
	{
		value: 'apreciacion-cinematografica',
		label: 'Apreciación cinematográfica',
		apiId: '30504014',
	},
	{
		value: 'produccion-musical-distribucion',
		label: 'Producción musical y Distribución Independiente en la Era Digital',
		apiId: '30504015',
	},
	{
		value: 'ia-creatividad-cultura',
		label: 'Inteligencia Artificial para la Creatividad Cultura',
		apiId: '30504016',
	},
	{
		value: 'derechos-autor-propiedad-intelectual',
		label: 'Derechos de Autor y Propiedad Intelectual para no abogados',
		apiId: '30504017',
	},
	{
		value: 'narrativas-digitales',
		label: 'Narrativas Digitales para las Industrias Culturales',
		apiId: '30504018',
	},
	{
		value: 'ia-asistente-administrativo',
		label:
			'Inteligencia Artificial Como Asistente Administrativo en el Sector Público',
		apiId: '30504019',
	},
	{
		value: 'primeros-auxilios-psicologicos',
		label: 'Primeros auxilios psicológicos',
		apiId: '30504032',
		onlyForSantaElena: true,
	},
]

export const getCourseApiIds = (courseValues: string[]): string[] => {
	return courseValues
		.map(value => {
			const course = COURSE_MAPPINGS.find(c => c.value === value)
			return course ? course.apiId : null
		})
		.filter((id): id is string => id !== null)
}

/**
 * Convierte una lista de API IDs (códigos de curso del backend) a valores del formulario.
 * Útil para convertir los disabledCourseIds del backend a valores que el frontend pueda usar.
 * @param apiIds - Lista de API IDs (ej: ['30504000', '30504001'])
 * @returns Lista de valores del formulario (ej: ['ingles-basico', 'ingles-intermedio'])
 */
export const getCourseValuesFromApiIds = (apiIds: string[]): string[] => {
	return apiIds
		.map(apiId => {
			const course = COURSE_MAPPINGS.find(c => c.apiId === apiId)
			return course ? course.value : null
		})
		.filter((value): value is string => value !== null)
}
