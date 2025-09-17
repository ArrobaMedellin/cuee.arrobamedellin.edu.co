import { z } from 'zod'

export const section21Schema = z.object({
	representativeFirstName: z
		.string()
		.min(1, 'Nombres del representante es requerido'),
	representativeDocumentType: z
		.string()
		.min(1, 'Tipo de documento es requerido'),
	representativeDocumentNumber: z
		.string()
		.min(1, 'Número de documento es requerido')
		.regex(/^\d+$/, 'Solo números'),
	representativeEmail: z.string().email('Correo electrónico inválido'),
})

export type Section21Form = z.infer<typeof section21Schema>
