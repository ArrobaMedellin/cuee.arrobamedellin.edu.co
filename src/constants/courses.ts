// Course mapping configuration
// This maps the form course values to API course IDs

export interface CourseMapping {
	value: string
	label: string
	apiId: string // This should match the course IDs from your API
}

// Course mappings - Oracle Cloud Infrastructure courses
export const COURSE_MAPPINGS: CourseMapping[] = [
	{
		value: 'nuevo-oracle-cloud-inicia-aqui',
		label: 'Nuevo en Oracle Cloud – Inicia aquí',
		apiId: '30502580',
	},
	{
		value: 'asociado-oci-foundations',
		label: 'Conviértete en asociado de OCI Foundations',
		apiId: '30502581',
	},
	{
		value: 'asociado-oci-ai-foundations',
		label: 'Conviértete en asociado de OCI AI Foundations',
		apiId: '30502582',
	},
	{
		value: 'asociado-oracle-data-platform-foundations',
		label: 'Conviértase en asociado de Oracle Data Platform Foundations',
		apiId: '30502583',
	},
	{
		value: 'arquitecto-asociado-oci',
		label: 'Conviértete en arquitecto asociado de OCI',
		apiId: '30502584',
	},
	{
		value: 'arquitecto-profesional-oci-2024',
		label: 'Conviértete en un arquitecto profesional de OCI (2024)',
		apiId: '30502585',
	},
	{
		value: 'desarrollo-aplicaciones-oci',
		label: 'Desarrollo de aplicaciones en OCI',
		apiId: '30502586',
	},
	{
		value: 'profesional-devops-oci',
		label: 'Conviértete en un profesional de DevOps de OCI',
		apiId: '30502587',
	},
	{
		value: 'profesional-desarrollador-oracle-apex',
		label: 'Conviértase en un profesional desarrollador de Oracle APEX',
		apiId: '30502588',
	},
	{
		value: 'profesional-ia-generativa-oci',
		label: 'Conviértete en un profesional de la IA generativa de OCI',
		apiId: '30502589',
	},
	{
		value: 'profesional-ciencia-datos-oci',
		label: 'Conviértete en un profesional de la ciencia de datos de OCI',
		apiId: '30502590',
	},
	{
		value: 'profesional-oracle-ai-vector-search',
		label: 'Conviértase en un profesional de Oracle AI Vector Search',
		apiId: '30502591',
	},
	{
		value: 'profesional-servicios-base-datos-nube-oracle',
		label:
			'Conviértase en un profesional de los servicios de base de datos en la nube de Oracle',
		apiId: '30502592',
	},
	{
		value: 'profesional-oracle-autonomous-database',
		label: 'Conviértase en un profesional de Oracle Autonomous Database',
		apiId: '30502593',
	},
	{
		value: 'profesional-seguridad-nube',
		label: 'Conviértete en un profesional de la seguridad en la nube',
		apiId: '30502594',
	},
	{
		value: 'fundamentos-proceso-hcm-oracle-fusion',
		label: 'Fundamentos del proceso HCM de Oracle Fusion Cloud Applications',
		apiId: '30502595',
	},
	{
		value: 'fundamentos-proceso-erp-oracle-fusion',
		label: 'Fundamentos del proceso ERP de Oracle Fusion Cloud Applications',
		apiId: '30502596',
	},
	{
		value: 'fundamentos-proceso-scm-oracle-fusion',
		label: 'Fundamentos del proceso SCM de Oracle Fusion Cloud Applications',
		apiId: '30502597',
	},
	{
		value: 'fundamentos-proceso-cx-oracle-fusion',
		label: 'Fundamentos del proceso CX de Oracle Fusion Cloud Applications',
		apiId: '30502598',
	},
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
