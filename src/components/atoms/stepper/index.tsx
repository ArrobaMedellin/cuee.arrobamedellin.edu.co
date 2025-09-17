'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { ReactNode } from 'react'

export type StepState = 'completed' | 'current' | 'pending'

export interface StepProps {
	state: StepState
	title: string
	description?: string
	onClick?: () => void
	disabled?: boolean
	tooltip?: string
}

export function Step({
	state,
	title,
	description,
	tooltip,
	onClick,
	disabled,
}: StepProps) {
	const isCompleted = state === 'completed'
	const isCurrent = state === 'current'

	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled}
			aria-current={isCurrent ? 'step' : undefined}
			aria-disabled={disabled || undefined}
			title={tooltip}
			className={cn(
				'group relative w-full text-left rounded-xl transition-colors',
				disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/60',
				isCurrent ? 'bg-muted/60' : 'bg-transparent'
			)}
		>
			<div className='flex gap-3 p-3'>
				<div className='relative'>
					{/* track line */}
					<div
						className='absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-border'
						aria-hidden
					/>
					{/* indicator */}
					<div
						className={cn(
							'relative z-10 grid h-8 w-8 place-items-center rounded-full border-2',
							isCompleted &&
								'border-primary bg-primary text-primary-foreground',
							isCurrent && 'border-primary',
							!isCompleted && !isCurrent && 'border-muted-foreground/40'
						)}
					>
						{isCompleted ? (
							<Check className='h-4 w-4' />
						) : (
							<div
								className={cn(
									'h-2.5 w-2.5 rounded-full',
									isCurrent ? 'bg-primary' : 'bg-muted-foreground/40'
								)}
							/>
						)}
					</div>
				</div>

				<div className='flex-1 py-1'>
					<div
						className={cn(
							'text-sm font-semibold',
							isCurrent
								? 'text-foreground'
								: isCompleted
								? 'text-foreground'
								: 'text-muted-foreground'
						)}
					>
						{title}
					</div>
					{description ? (
						<div className='text-xs text-muted-foreground'>{description}</div>
					) : null}
				</div>
			</div>
		</button>
	)
}

export interface StepperProps {
	children: ReactNode
	className?: string
}

export function Stepper({ children, className }: StepperProps) {
	return (
		<div className={cn('relative flex flex-col gap-1', className)}>
			{children}
		</div>
	)
}
