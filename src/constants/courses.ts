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
		apiId: '4193a28e-0059-41a6-9602-14f145e5d847',
	},
	{
		value: 'asociado-oci-foundations',
		label: 'Conviértete en asociado de OCI Foundations',
		apiId: '0424f40c-65f9-4378-a080-156c8a4d870d',
	},
	{
		value: 'asociado-oci-ai-foundations',
		label: 'Conviértete en asociado de OCI AI Foundations',
		apiId: 'd54757ae-ed88-4b27-a19e-062fceeabe9c',
	},
	{
		value: 'asociado-oracle-data-platform-foundations',
		label: 'Conviértase en asociado de Oracle Data Platform Foundations',
		apiId: '3281e21c-7540-42ce-8b90-44f7455e2f31',
	},
	{
		value: 'arquitecto-asociado-oci',
		label: 'Conviértete en arquitecto asociado de OCI',
		apiId: '131a82d4-0efc-4723-acac-c468a5c5b899',
	},
	{
		value: 'arquitecto-profesional-oci-2024',
		label: 'Conviértete en un arquitecto profesional de OCI (2024)',
		apiId: '59f09f45-2388-4172-808a-a87bb9cd9d6b',
	},
	{
		value: 'desarrollo-aplicaciones-oci',
		label: 'Desarrollo de aplicaciones en OCI',
		apiId: 'ae560929-dbb2-461c-b024-1ad5eb0152bd',
	},
	{
		value: 'profesional-devops-oci',
		label: 'Conviértete en un profesional de DevOps de OCI',
		apiId: 'ce90d468-7e5f-4485-96a0-3128272cbb2c',
	},
	{
		value: 'profesional-desarrollador-oracle-apex',
		label: 'Conviértase en un profesional desarrollador de Oracle APEX',
		apiId: 'b9f70742-430e-4544-be6f-56d5c3a9391d',
	},
	{
		value: 'profesional-ia-generativa-oci',
		label: 'Conviértete en un profesional de la IA generativa de OCI',
		apiId: 'd217a8a7-237c-4856-bf71-c8da2ee35de8',
	},
	{
		value: 'profesional-ciencia-datos-oci',
		label: 'Conviértete en un profesional de la ciencia de datos de OCI',
		apiId: '634b5794-b935-4d65-934d-a4ed8f2f6c8b',
	},
	{
		value: 'profesional-oracle-ai-vector-search',
		label: 'Conviértase en un profesional de Oracle AI Vector Search',
		apiId: 'b79f41f8-a975-4e0a-9007-264c28fd38a6',
	},
	{
		value: 'profesional-base-datos-nube-oracle',
		label: 'Conviértase en un profesional de los servicios de base de datos en la nube de Oracle',
		apiId: '9703766d-7b36-4c90-bab9-37905122dbeb',
	},
	{
		value: 'profesional-oracle-autonomous-database',
		label: 'Conviértase en un profesional de Oracle Autonomous Database',
		apiId: 'a5cf1a70-3440-48cb-ae11-3f96ad9f3c66',
	},
	{
		value: 'profesional-seguridad-nube',
		label: 'Conviértete en un profesional de la seguridad en la nube',
		apiId: '181c1dd2-9914-4aa1-bdab-44cb7e7500cb',
	},
	{
		value: 'fundamentos-hcm-oracle-fusion',
		label: 'Fundamentos del proceso HCM de Oracle Fusion Cloud Applications',
		apiId: 'da79bd1b-e815-42f1-9011-5f699b309f34',
	},
	{
		value: 'fundamentos-erp-oracle-fusion',
		label: 'Fundamentos del proceso ERP de Oracle Fusion Cloud Applications',
		apiId: '671f2d81-dbce-4279-bbef-51169b9003bc',
	},
	{
		value: 'fundamentos-scm-oracle-fusion',
		label: 'Fundamentos del proceso SCM de Oracle Fusion Cloud Applications',
		apiId: '86e194f4-aad2-4838-a639-de10efd4c49f',
	},
	{
		value: 'fundamentos-cx-oracle-fusion',
		label: 'Fundamentos del proceso CX de Oracle Fusion Cloud Applications',
		apiId: '7d79a900-f7a4-4c23-9767-69dbb14e7d46',
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
