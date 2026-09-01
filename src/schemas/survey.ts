import { z } from 'zod'

export const CAR05_NO_ACCESS = 'F'
export const CAR07_NOT_APPLICABLE = 'NO_APLICA'

export const surveySchema = z
	.object({
		car01: z.string().min(1, 'Selecciona tu actividad principal actual'),
		car01Other: z.string().max(150).optional(),

		car02: z.string().min(1, 'Selecciona tu principal motivación'),
		car02Other: z.string().max(150).optional(),

		car03: z
			.string()
			.min(1, 'Selecciona por qué elegiste la modalidad virtual'),

		car04: z
			.string()
			.min(1, 'Selecciona el tiempo que puedes dedicarle al curso'),

		car05: z
			.array(z.string())
			.min(1, 'Selecciona al menos un dispositivo'),

		car06: z
			.string()
			.min(1, 'Selecciona tu principal tipo de acceso a internet'),

		car07: z.string().optional(),

		car08: z.string().min(1, 'Selecciona el resultado que esperas lograr'),
		car08Other: z.string().max(150).optional(),
	})
	.refine(data => data.car01 !== 'I' || !!data.car01Other?.trim(), {
		message: 'Especifica cuál es tu actividad',
		path: ['car01Other'],
	})
	.refine(data => data.car02 !== 'H' || !!data.car02Other?.trim(), {
		message: 'Especifica tu motivación',
		path: ['car02Other'],
	})
	.refine(
		data => !data.car05.includes(CAR05_NO_ACCESS) || data.car05.length === 1,
		{
			message:
				'"No tengo acceso regular a ninguno de estos dispositivos" no se puede combinar con otras opciones',
			path: ['car05'],
		},
	)
	.refine(data => data.car06 === 'E' || !!data.car07, {
		message: 'Selecciona qué tan estable es tu conexión',
		path: ['car07'],
	})
	.refine(data => data.car08 !== 'F' || !!data.car08Other?.trim(), {
		message: 'Especifica el resultado que esperas lograr',
		path: ['car08Other'],
	})

export type SurveyForm = z.infer<typeof surveySchema>
