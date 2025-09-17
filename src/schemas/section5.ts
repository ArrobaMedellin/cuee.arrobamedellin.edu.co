import { z } from 'zod'

export const section5Schema = z
	.object({
		healthSystem: z.string().min(1, 'Sistema de salud es requerido'),
		internetConnection: z.string().min(1, 'Conexión a internet es requerida'),
		devices: z.array(z.string()).min(1, 'Selecciona al menos un dispositivo'),
		occupation: z.string().min(1, 'Ocupación es requerida'),
		educationLevel: z.string().min(1, 'Nivel de estudio es requerido'),
		housingType: z.string().min(1, 'Tipo de vivienda es requerido'),
		hasChildren: z.boolean(),
		numberOfChildren: z.number().optional(),
		singleParent: z.boolean(),
		firstChildAge: z.number().optional(),
		pregnantOrLactating: z.boolean(),
		dependents: z.number().min(0, 'Debe ser 0 o más'),
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

export type Section5Form = z.infer<typeof section5Schema>
