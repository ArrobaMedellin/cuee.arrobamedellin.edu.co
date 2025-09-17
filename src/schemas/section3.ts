import { z } from 'zod'

export const section3Schema = z.object({
	countryOfResidence: z.string().min(1, 'País de residencia es requerido'),
	departmentOfResidence: z
		.string()
		.min(1, 'Departamento de residencia es requerido'),
	cityOfResidence: z.string().min(1, 'Ciudad de residencia es requerida'),
	neighborhood: z.string().min(1, 'Barrio es requerido'),
	commune: z.string().optional(),
	address: z.string().min(1, 'Dirección es requerida'),
	stratum: z.string().min(1, 'Estrato es requerido'),
	birthCity: z.string().min(1, 'Ciudad de nacimiento es requerida'),
})

export type Section3Form = z.infer<typeof section3Schema>
