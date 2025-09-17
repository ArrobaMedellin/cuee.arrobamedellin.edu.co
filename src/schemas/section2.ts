import { z } from 'zod'

export const section2Schema = z.object({
	birthDate: z.string().min(1, 'Fecha de nacimiento es requerida'),
	cityOfResidence: z.string().min(1, 'Ciudad dónde vive es requerida'),
	phone: z
		.string()
		.min(1, 'Teléfono es requerido')
		.regex(/^\d+$/, 'Solo números'),
	gender: z.string().min(1, 'Sexo es requerido'),
	sexualOrientation: z.string().min(1, 'Orientación sexual es requerida'),
	genderIdentity: z.string().min(1, 'Identidad de género es requerida'),
})

export type Section2Form = z.infer<typeof section2Schema>
