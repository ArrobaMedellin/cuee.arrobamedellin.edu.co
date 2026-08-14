// Company options for the CUEE form (period 51)
// TODO: reemplazar con el listado real de empresas del convenio CUEE

export interface CompanyOption {
	value: string
	label: string
}

export const COMPANY_OPTIONS: CompanyOption[] = [
	{ value: 'grupointer', label: 'Grupointer' },
	{ value: 'masterdent', label: 'Masterdent' },
	{ value: 'conconcreto', label: 'Conconcreto' },
]
