import { z } from 'zod'

export const section1Schema = z.object({
	firstName: z
		.string()
		.min(1, 'Nombres es requerido')
		.max(100, 'Máximo 100 caracteres'),
	lastName: z
		.string()
		.min(1, 'Apellidos es requerido')
		.max(100, 'Máximo 100 caracteres'),
	documentType: z.string().min(1, 'Tipo de documento es requerido'),
	documentNumber: z
		.string()
		.min(1, 'Número de documento es requerido')
		.regex(/^\d+$/, 'Solo números'),
	email: z.string().email('Correo electrónico inválido'),
})

export type Section1Form = z.infer<typeof section1Schema>
