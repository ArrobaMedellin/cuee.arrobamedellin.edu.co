import { z } from 'zod'

export const section3Schema = z.object({
	// Campos de residencia - Opcionales porque ya se capturan en Section2
	countryOfResidence: z.string().optional(),
	departmentOfResidence: z.string().optional(),
	cityOfResidence: z.string().optional(),
	neighborhood: z.string().optional(),
	commune: z.string().optional(),
	stratum: z.string().min(1, 'Estrato socioeconómico es requerido'),

	// Constructor de dirección detallado - OBLIGATORIOS
	addressType: z.string().min(1, 'Tipo de vía es requerido'),
	addressNumber1: z.string().min(1, 'Número principal es requerido'),
	addressLetter1: z.string().optional(), // OPCIONAL
	addressOrientation1: z.string().optional(), // OPCIONAL
	addressNumber2: z.string().min(1, 'Número secundario es requerido'),
	addressLetter2: z.string().optional(), // OPCIONAL
	addressOrientation2: z.string().optional(), // OPCIONAL
	addressNumber3: z.string().min(1, 'Número final es requerido'),
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

export type Section3Form = z.infer<typeof section3Schema>
