import { isMinor, isValidBirthDate } from '@/utils/age'
import { z } from 'zod'

export const section2Schema = z
	.object({
		birthDate: z
			.string()
			.min(1, 'Fecha de nacimiento es requerida')
			.refine(
				date => isValidBirthDate(date),
				'Fecha de nacimiento inválida o futura',
			),
		age: z.number().optional(), // Calculada automáticamente
		countryOfResidence: z.string().min(1, 'País de residencia es requerido'),
		// Condicionales según el país de residencia
		departmentOfResidence: z.string().optional(),
		cityOfResidence: z.string().optional(),
		commune: z.string().optional(),
		neighborhood: z.string().optional(),
		neighborhoodId: z.number().optional(),
		phone: z
			.string()
			.min(1, 'Teléfono es requerido')
			.regex(/^\d+$/, 'Solo números'),
		gender: z.string().min(1, 'Sexo es requerido'),
		isPregnant: z.string().optional(), // Campo condicional para embarazo
		// Campos del representante legal (condicionales para menores de edad)
		representativeFirstName: z.string().optional(),
		representativeDocumentType: z.string().optional(),
		representativeDocumentNumber: z.string().optional(),
		representativeEmail: z.string().optional(),
		representativePhone: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		// Validación condicional según el país de residencia
		// Si es Colombia, requerir departamento, ciudad, comuna y barrio
		if (data.countryOfResidence === 'Colombia') {
			if (!data.departmentOfResidence) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Departamento de residencia es requerido',
					path: ['departmentOfResidence'],
				})
			}
			if (!data.cityOfResidence) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Ciudad dónde vive es requerida',
					path: ['cityOfResidence'],
				})
			}
			// Solo requerir comuna y barrio si la ciudad es Medellín
			if (data.cityOfResidence === 'Medellín') {
				if (!data.commune) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Comuna es requerida para residentes de Medellín',
						path: ['commune'],
					})
				}
				// Solo requerir barrio si NO es un corregimiento
				const isCorregimiento = data.commune?.includes('(Corregimiento)')
				if (!data.neighborhood && !isCorregimiento) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Barrio es requerido para residentes de Medellín',
						path: ['neighborhood'],
					})
				}
			}
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
