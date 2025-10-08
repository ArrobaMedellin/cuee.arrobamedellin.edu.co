import { z } from 'zod'

export const section4Schema = z
	.object({
		// Información de graduación bachillerato
		graduationYear: z.string().min(1, 'Año de graduación es requerido'),
		graduatedFrom: z
			.string()
			.min(1, 'Institución donde se graduó es requerida'),

		// Selección de cursos (máximo 3)
		selectedCourses: z
			.array(z.string())
			.min(1, 'Debe seleccionar al menos un curso')
			.max(3, 'Máximo 3 cursos permitidos'),

		// Información Saber Pro
		hasIcfesPro: z.enum(['SI', 'NO']).default('NO'),
		icfesProScore: z.string().optional(),
		icfesProYear: z.string().optional(),

		// Campos condicionales para Saber Pro
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
			message: 'Si tiene ICFES Pro, debe especificar puntaje y año',
		}
	)

export type Section4Form = z.infer<typeof section4Schema>
