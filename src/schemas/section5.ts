import { z } from 'zod'

export const section5Schema = z
	.object({
		// Discapacidades
		hasDisability: z.boolean(),
		disabilityTypes: z.array(z.string()).optional(),
		disabilityDescription: z.string().optional(),
		requiresSupport: z.boolean().optional(),
		supportType: z.string().optional(),
		// Grupos étnicos
		belongsToEthnicGroup: z.boolean(),
		ethnicGroups: z.array(z.string()).optional(),
		afroSubgroup: z.string().optional(),
		indigenousPeople: z.string().optional(),

		// Víctima de violencia
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

		// Otras características especiales
		isFamilyCaregiver: z.boolean(),
		isYouthCouncilor: z.boolean(),
		isCertifiedBarrista: z.boolean()
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
			path: ['disabilityTypes']
		}
	)
	.refine(
		data => {
			if (
				data.belongsToEthnicGroup &&
				(!data.ethnicGroups || data.ethnicGroups.length === 0)
			) {
				return false
			}
			return true
		},
		{
			message: 'Selecciona al menos un grupo étnico',
			path: ['ethnicGroups']
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
			path: ['victimizingActs']
		}
	)

export type Section5Form = z.infer<typeof section5Schema>
