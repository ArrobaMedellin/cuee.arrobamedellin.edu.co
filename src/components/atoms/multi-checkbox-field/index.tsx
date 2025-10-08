'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface Option {
	value: string
	label: string
}

interface MultiCheckboxFieldProps {
	options: Option[]
	value: string[]
	onChange: (value: string[]) => void
	label: string
	required?: boolean
	maxSelections?: number
	className?: string
	error?: string
}

export function MultiCheckboxField({
	options,
	value = [],
	onChange,
	label,
	required,
	maxSelections,
	className,
	error,
}: MultiCheckboxFieldProps) {
	const handleCheckboxChange = (optionValue: string, checked: boolean) => {
		let newValue: string[]

		if (checked) {
			// Si hay un límite máximo, verificar antes de agregar
			if (maxSelections && value.length >= maxSelections) {
				return // No permitir más selecciones
			}
			newValue = [...value, optionValue]
		} else {
			newValue = value.filter(v => v !== optionValue)
		}

		onChange(newValue)
	}

	return (
		<FormItem className={cn('space-y-3', className)}>
			<FormLabel className={cn(required && 'required')}>
				{label}
				{required && <span className='text-destructive ml-1'>*</span>}
			</FormLabel>
			<div className='grid grid-cols-1 gap-3'>
				{options.map(option => (
					<div
						key={option.value}
						className='flex items-center space-x-2'
					>
						<Checkbox
							id={option.value}
							checked={value.includes(option.value)}
							onCheckedChange={checked =>
								handleCheckboxChange(option.value, checked === true)
							}
							disabled={
								!!(
									maxSelections &&
									value.length >= maxSelections &&
									!value.includes(option.value)
								)
							}
						/>
						<label
							htmlFor={option.value}
							className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
			{maxSelections && (
				<p className='text-xs text-muted-foreground'>
					Máximo {maxSelections} selecciones. Seleccionadas: {value.length}
				</p>
			)}
			{error && <FormMessage>{error}</FormMessage>}
		</FormItem>
	)
}
