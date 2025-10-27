import { z } from 'zod'

export const section4Schema = z
	.object({
		// Dispositivos tecnológicos
		devices: z.array(z.string()).min(1, 'Selecciona al menos un dispositivo'),

		// Vivienda y condiciones socioeconómicas
		housingType: z.string().min(1, 'Tipo de tenencia de vivienda es requerido'),
		occupation: z.string().min(1, 'Actividad actual es requerida'),
		otherOccupation: z.string().optional(),
		dependents: z.number().min(0, 'Debe ser 0 o más'),

		// Características especiales
		isInformalVendor: z.boolean(),
		isFamilyOfInformalVendor: z.boolean(),
		isFamilyCaregiver: z.boolean(),
		isYouthCouncilor: z.boolean(),
		isCertifiedBarrista: z.boolean(),
		belongsToSpecialPopulations: z.boolean(),
		specialPopulations: z.array(z.string()).optional(),

		// Salud y educación
		healthSystem: z.string().min(1, 'Sistema de salud es requerido'),
		internetConnection: z.string().min(1, 'Conexión a internet es requerida'),

		// Información familiar
		hasChildren: z.boolean(),
		numberOfChildren: z.number().optional(),
		singleParent: z.boolean(),
		firstChildAge: z.number().optional(),
		pregnantOrLactating: z.boolean()
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
			path: ['numberOfChildren']
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
			path: ['firstChildAge']
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
			path: ['otherOccupation']
		}
	)

export type Section4Form = z.infer<typeof section4Schema>
