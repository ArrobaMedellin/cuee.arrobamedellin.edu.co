import { z } from 'zod'

export const section6Schema = z
	.object({
		// Discapacidades (expandido con tipos específicos)
		hasDisability: z.boolean(),
		disabilityTypes: z.array(z.string()).optional(),
		disabilityDescription: z.string().optional(),
		requiresSupport: z.boolean().optional(),
		supportType: z.string().optional(),

		// Grupos étnicos
		ethnicGroups: z
			.array(z.string())
			.min(1, 'Selecciona al menos una opción étnica'),

		// Víctima de violencia (expandido)
		isViolenceVictim: z.boolean(),
		victimizingActs: z.array(z.string()).optional(),
		violenceType: z.string().optional(),
		registeredWithVictimUnit: z.boolean().optional(),
		victimRegistrationNumber: z.string().optional(),

		// Poblaciones especiales del conflicto
		isExcombatant: z.boolean(),
		isReintegrated: z.boolean(),
		isFamilyOfExcombatant: z.boolean(),
		isInternallyDisplaced: z.boolean(),
		isRefugee: z.boolean(),

		// Accesibilidad y apoyo
		accessibility: z.string().min(1, 'Accesibilidad es requerida'),

		// Otras características especiales
		isFamilyCaregiver: z.boolean(),
		isYouthCouncilor: z.boolean(),
		isCertifiedBarrista: z.boolean(),
	})
	.refine(
		data => {
			if (
				data.hasDisability &&
				(!data.disabilityTypes || data.disabilityTypes.length === 0)
			) {
				return false
			}
			return true
		},
		{
			message: 'Selecciona al menos un tipo de discapacidad',
			path: ['disabilityTypes'],
		}
	)
	.refine(
		data => {
			if (
				data.isViolenceVictim &&
				(!data.victimizingActs || data.victimizingActs.length === 0)
			) {
				return false
			}
			return true
		},
		{
			message: 'Selecciona al menos un hecho victimizante',
			path: ['victimizingActs'],
		}
	)

export type Section6Form = z.infer<typeof section6Schema>
