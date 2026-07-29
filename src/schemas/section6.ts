import { z } from 'zod'

export const section6Schema = z.object({
	// Empresa asociada a la inscripción (CUEE)
	company: z.string().min(1, 'Debe seleccionar una empresa'),

	// Selección de cursos (máximo 3)
	selectedCourses: z
		.array(z.string())
		.min(1, 'Debe seleccionar al menos un curso')
		.max(1, 'Puede seleccionar máximo 1 curso'),

	// Cómo se enteró de la convocatoria
	howDidYouHear: z.string().min(1, 'Este campo es requerido'),
	otherSource: z.string().optional()
})

export type Section6Form = z.infer<typeof section6Schema>
