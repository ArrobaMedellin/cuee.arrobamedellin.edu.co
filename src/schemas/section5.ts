import { z } from 'zod'

export const section5Schema = z
	.object({
		// Dispositivos tecnológicos (ampliados)
		devices: z.array(z.string()).min(1, 'Selecciona al menos un dispositivo'),

		// Vivienda (expandido)
		housingType: z.string().min(1, 'Tipo de tenencia de vivienda es requerido'),
		familyMembers: z
			.number()
			.min(1, 'Número de personas en la familia es requerido'),

		// Ocupación y trabajo (expandido)
		occupation: z.string().min(1, 'Actividad actual es requerida'),
		otherOccupation: z.string().optional(),
		dependents: z.number().min(0, 'Debe ser 0 o más'),
		workStatus: z.enum([
			'TRABAJANDO',
			'BUSCANDO_TRABAJO',
			'ESTUDIANDO',
			'INDEPENDIENTE',
			'OTRO',
		]),
		monthlyIncome: z.string().optional(),

		// Situación maternal
		isPregnant: z.enum(['SI', 'NO']),
		isLactating: z.enum(['SI', 'NO']),

		// Ventero informal
		isInformalVendor: z.boolean(),
		isFamilyOfInformalVendor: z.boolean(),

		// Otras características sociales
		isFamilyCaregiver: z.boolean(),
		isYouthCouncilor: z.boolean(),
		isCertifiedBarrista: z.boolean(),

		// Poblaciones especiales
		specialPopulations: z.array(z.string()).optional(),

		// Salud y educación
		healthSystem: z.string().min(1, 'Sistema de salud es requerido'),
		educationLevel: z.string().min(1, 'Nivel de estudio es requerido'),

		// Internet y conectividad
		internetConnection: z.string().min(1, 'Conexión a internet es requerida'),

		// Información familiar
		hasChildren: z.boolean(),
		numberOfChildren: z.number().optional(),
		singleParent: z.boolean(),
		firstChildAge: z.number().optional(),
		pregnantOrLactating: z.boolean(),

		// Seguridad social
		socialSecurityContributions: z.array(z.string()).optional(),

		// Salario emocional
		emotionalSalaryOptions: z.array(z.string()).optional(),

		// Competencias
		missingCompetencies: z.array(z.string()).optional(),
		otherMissingCompetencies: z.string().optional(),

		// Empleo y búsqueda laboral
		graduationToEmploymentTime: z.string().optional(),
		englishLevel: z.string().optional(),
		jobSearchAreas: z.array(z.string()).optional(),
		otherJobSearchArea: z.string().optional(),
		salaryExpectationsMet: z.string().optional(),
		jobSatisfaction: z.string().optional(),
		remoteWorkOption: z.string().optional(),
		remoteWorkSpace: z.string().optional(),
	})
	.refine(
		data => {
			if (data.hasChildren && !data.numberOfChildren) {
				return false
			}
			return true
		},
		{
			message: 'Número de hijos es requerido si tiene hijos',
			path: ['numberOfChildren'],
		}
	)
	.refine(
		data => {
			if (data.hasChildren && !data.firstChildAge) {
				return false
			}
			return true
		},
		{
			message: 'Edad del primer hijo es requerida si tiene hijos',
			path: ['firstChildAge'],
		}
	)
	.refine(
		data => {
			if (data.occupation === 'otro' && !data.otherOccupation) {
				return false
			}
			return true
		},
		{
			message: 'Especifica la otra actividad',
			path: ['otherOccupation'],
		}
	)

export type Section5Form = z.infer<typeof section5Schema>
