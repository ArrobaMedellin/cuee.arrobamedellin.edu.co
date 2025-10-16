import { z } from 'zod'

export const section7Schema = z.object({
	// Selección de cursos (máximo 3)
	selectedCourses: z
		.array(z.string())
		.min(1, 'Debe seleccionar al menos un curso')
		.max(3, 'Puede seleccionar máximo 3 cursos'),

	// Cómo se enteró de la convocatoria
	howDidYouHear: z.string().min(1, 'Este campo es requerido'),
	otherSource: z.string().optional(),
})

export type Section7Form = z.infer<typeof section7Schema>
