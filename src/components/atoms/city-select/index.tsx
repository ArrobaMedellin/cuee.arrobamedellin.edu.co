'use client'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useCities } from '@/hooks/use-cities'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import * as React from 'react'

interface CitySelectProps {
	value?: string
	onValueChange?: (value: string) => void
	placeholder?: string
	disabled?: boolean
	className?: string
}

export function CitySelect({
	value,
	onValueChange,
	placeholder = 'Selecciona una ciudad...',
	disabled = false,
	className,
}: CitySelectProps) {
	const [open, setOpen] = React.useState(false)
	const { filteredCities } = useCities()

	const selectedCity = React.useMemo(
		() => filteredCities.find(city => city.name === value),
		[filteredCities, value]
	)

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn(
						'w-full justify-between',
						!value && 'text-muted-foreground',
						className
					)}
					disabled={disabled}
				>
					{selectedCity ? selectedCity.name : placeholder}
					<ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-full p-0'
				align='start'
			>
				<Command>
					<CommandInput placeholder='Buscar ciudad...' />
					<CommandList>
						<CommandEmpty>No se encontró ninguna ciudad.</CommandEmpty>
						<CommandGroup>
							{filteredCities.map(city => (
								<CommandItem
									key={city.id}
									value={city.name}
									onSelect={currentValue => {
										onValueChange?.(currentValue === value ? '' : currentValue)
										setOpen(false)
									}}
								>
									<CheckIcon
										className={cn(
											'mr-2 h-4 w-4',
											value === city.name ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{city.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
