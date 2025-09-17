import { z } from 'zod'

export const section6Schema = z.object({
	violenceInColombia: z.boolean(),
	accessibility: z.string().min(1, 'Accesibilidad es requerida'),
	hasDisability: z.boolean(),
	population: z.string().min(1, 'Población es requerida'),
	ventero: z.boolean(),
	familyVentero: z.boolean(),
	barrista: z.boolean(),
	familyDisability: z.boolean(),
	ethnicities: z.array(z.string()),
})

export type Section6Form = z.infer<typeof section6Schema>
