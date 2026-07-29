// Company options for the CUEE form (period 51)
// TODO: reemplazar con el listado real de empresas del convenio CUEE

export interface CompanyOption {
	value: string
	label: string
}

export const COMPANY_OPTIONS: CompanyOption[] = [
	{ value: 'empresa-1', label: 'Empresa 1' },
	{ value: 'empresa-2', label: 'Empresa 2' },
]
