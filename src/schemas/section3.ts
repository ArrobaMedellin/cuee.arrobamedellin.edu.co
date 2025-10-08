import { z } from 'zod'

export const section3Schema = z.object({
	countryOfResidence: z.string().min(1, 'País de residencia es requerido'),
	departmentOfResidence: z
		.string()
		.min(1, 'Departamento de residencia es requerido'),
	cityOfResidence: z.string().min(1, 'Ciudad de residencia es requerida'),
	neighborhood: z.string().min(1, 'Barrio es requerido'),
	commune: z.string().min(1, 'Comuna es requerida'),
	stratum: z.string().min(1, 'Estrato socioeconómico es requerido'),

	// Constructor de dirección detallado
	addressType: z.string().min(1, 'Tipo de vía es requerido'),
	addressNumber1: z.string().min(1, 'Número principal es requerido'),
	addressLetter1: z.string().optional(),
	addressOrientation1: z.string().optional(),
	addressNumber2: z.string().min(1, 'Número secundario es requerido'),
	addressLetter2: z.string().optional(),
	addressOrientation2: z.string().optional(),
	addressNumber3: z.string().min(1, 'Número final es requerido'),
	addressComplement: z.string().optional(),
	fullAddress: z.string().optional(), // Dirección completa construida

	birthCity: z.string().min(1, 'Ciudad de nacimiento es requerida'),
	// Campos opcionales para IDs numéricos
	countryOfResidenceId: z.number().optional(),
	departmentOfResidenceId: z.number().optional(),
	cityOfResidenceId: z.number().optional(),
	communeId: z.number().optional(),
	neighborhoodId: z.number().optional(),
	birthCityId: z.number().optional(),
})

export type Section3Form = z.infer<typeof section3Schema>
