import { z } from 'zod'

export const section3Schema = z
	.object({
		// Campos de residencia - Opcionales porque ya se capturan en Section2
		countryOfResidence: z.string().optional(),
		departmentOfResidence: z.string().optional(),
		cityOfResidence: z.string().optional(),
		neighborhood: z.string().optional(),
		commune: z.string().optional(),
		stratum: z.string().min(1, 'Estrato socioeconómico es requerido'),
		isRuralZone: z.boolean().optional().default(false),

		// Constructor de dirección detallado - Condicional
		addressType: z.string().optional(),
		addressNumber1: z.string().optional(),
		addressLetter1: z.string().optional(), // OPCIONAL
		addressOrientation1: z.string().optional(), // OPCIONAL
		addressNumber2: z.string().optional(),
		addressLetter2: z.string().optional(), // OPCIONAL
		addressOrientation2: z.string().optional(), // OPCIONAL
		addressNumber3: z.string().optional(),
		addressComplement: z.string().optional(), // OPCIONAL
		fullAddress: z.string().optional(), // Dirección completa construida

		birthCity: z.string().optional(), // Ciudad de nacimiento (ya se captura en Section2)
		// Campos opcionales para IDs numéricos
		countryOfResidenceId: z.number().optional(),
		departmentOfResidenceId: z.number().optional(),
		cityOfResidenceId: z.number().optional(),
		communeId: z.number().optional(),
		neighborhoodId: z.number().optional(),
		birthCityId: z.number().optional(),
	})
	.superRefine((data, ctx) => {
		// Si NO es zona rural (Palmitas/Santa Elena), los campos de dirección son obligatorios
		if (!data.isRuralZone) {
			const requiredFields: Array<keyof typeof data> = [
				'addressType',
				'addressNumber1',
				'addressNumber2',
				'addressNumber3',
			]

			requiredFields.forEach(field => {
				if (!data[field] || String(data[field]).trim() === '') {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Campo requerido',
						path: [field],
					})
				}
			})
		} else {
			// Si es zona rural, se omite la dirección estructurada pero se exige complemento
			if (!data.addressComplement || data.addressComplement.trim() === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Complemento es requerido para zonas rurales',
					path: ['addressComplement'],
				})
			}
		}
	})

export type Section3Form = z.infer<typeof section3Schema>
