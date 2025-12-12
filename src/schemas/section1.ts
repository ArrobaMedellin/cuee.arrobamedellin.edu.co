import { z } from 'zod'

export const section1Schema = z
	.object({
		firstName: z
			.string()
			.min(1, 'Nombres es requerido')
			.max(100, 'Máximo 100 caracteres'),
		lastName: z
			.string()
			.min(1, 'Apellidos es requerido')
			.max(100, 'Máximo 100 caracteres'),
		documentType: z.string().min(1, 'Tipo de documento es requerido'),
		otherDocumentType: z.string().optional(),
		documentNumber: z
			.string()
			.min(1, 'Número de documento es requerido')
			.regex(/^\d+$/, 'Solo números'),
		email: z.string().email('Correo electrónico inválido'),
		emailVerification: z.string().email('Correo electrónico inválido'),
		countryOfBirth: z.string().optional(),
		departmentOfBirth: z.string().optional(),
		municipalityOfBirth: z.string().optional(),
		communeOfBirth: z.string().optional(),
		neighborhoodOfBirth: z.string().optional(),
	})
	.refine(
		data => {
			if (data.documentType === 'Otro' && !data.otherDocumentType) {
				return false
			}
			return true
		},
		{
			message: 'Especifica el otro tipo de documento',
			path: ['otherDocumentType'],
		}
	)
	.refine(data => data.email === data.emailVerification, {
		message: 'Los correos electrónicos no coinciden',
		path: ['emailVerification'],
	})

export type Section1Form = z.infer<typeof section1Schema>
