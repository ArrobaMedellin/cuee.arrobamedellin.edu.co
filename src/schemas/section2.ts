import { isMinor, isValidBirthDate } from '@/utils/age'
import { z } from 'zod'

export const section2Schema = z
	.object({
		birthDate: z
			.string()
			.min(1, 'Fecha de nacimiento es requerida')
			.refine(
				date => isValidBirthDate(date),
				'Fecha de nacimiento inválida o futura'
			),
		age: z.number().optional(), // Calculada automáticamente
		cityOfResidence: z.string().min(1, 'Ciudad dónde vive es requerida'),
		phone: z
			.string()
			.min(1, 'Teléfono es requerido')
			.regex(/^\d+$/, 'Solo números'),
		gender: z.string().min(1, 'Sexo es requerido'),
		sexualOrientation: z.string().min(1, 'Orientación sexual es requerida'),
		otherSexualOrientation: z.string().optional(),
		genderIdentity: z.string().min(1, 'Identidad de género es requerida'),
		// Campos del representante legal (condicionales para menores de edad)
		representativeFirstName: z.string().optional(),
		representativeDocumentType: z.string().optional(),
		representativeDocumentNumber: z.string().optional(),
		representativeEmail: z.string().optional(),
		representativePhone: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		// Si selecciona "Otro" en orientación sexual, debe especificar
		if (data.sexualOrientation === 'Otro' && !data.otherSexualOrientation) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Especifica la otra orientación sexual',
				path: ['otherSexualOrientation'],
			})
		}

		// Si es menor de edad, validar campos del representante
		if (isMinor(data.birthDate)) {
			if (!data.representativeFirstName) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						'Nombres del representante es requerido para menores de edad',
					path: ['representativeFirstName'],
				})
			}
			if (!data.representativeDocumentType) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Tipo de documento del representante es requerido',
					path: ['representativeDocumentType'],
				})
			}
			if (!data.representativeDocumentNumber) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Número de documento del representante es requerido',
					path: ['representativeDocumentNumber'],
				})
			} else if (!/^\d+$/.test(data.representativeDocumentNumber)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Solo números permitidos',
					path: ['representativeDocumentNumber'],
				})
			}
			if (!data.representativeEmail) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Correo del representante es requerido',
					path: ['representativeEmail'],
				})
			} else {
				// Validar formato de email
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				if (!emailRegex.test(data.representativeEmail)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Correo electrónico inválido',
						path: ['representativeEmail'],
					})
				}
			}
			if (!data.representativePhone) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Teléfono del representante es requerido',
					path: ['representativePhone'],
				})
			} else if (!/^\d+$/.test(data.representativePhone)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Solo números permitidos en el teléfono',
					path: ['representativePhone'],
				})
			}
		}
	})

export type Section2Form = z.infer<typeof section2Schema>
