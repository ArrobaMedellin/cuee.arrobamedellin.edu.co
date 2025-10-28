import { z } from 'zod'

export const section7Schema = z
	.object({
		// Información de graduación bachillerato
		graduationYear: z.string().min(1, 'Año de graduación es requerido'),
		graduatedFrom: z
			.string()
			.min(1, 'Institución donde se graduó es requerida'),

		// Información Saber Pro
		hasIcfesPro: z.enum(['SI', 'NO']),
		icfesProScore: z.string().optional(),
		icfesProYear: z.string().optional()
	})
	.refine(
		data => {
			// Si tiene Saber Pro, debe tener puntaje y año
			if (data.hasIcfesPro === 'SI') {
				return data.icfesProScore && data.icfesProYear
			}
			return true
		},
		{
			message: 'Si tiene ICFES Pro, debe especificar puntaje y año'
		}
	)

export type Section7Form = z.infer<typeof section7Schema>
