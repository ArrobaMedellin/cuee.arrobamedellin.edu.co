'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'

interface ActiveEnrollmentModalProps {
	open: boolean
	courseName: string
	onClose: () => void
}

export function ActiveEnrollmentModal({
	open,
	courseName,
	onClose,
}: ActiveEnrollmentModalProps) {
	return (
		<Dialog
			open={open}
			onOpenChange={open => {
				if (!open) onClose()
			}}
		>
			<DialogContent
				showCloseButton={false}
				className='sm:max-w-md'
			>
				<DialogHeader className='items-center'>
					<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 mb-2'>
						<AlertTriangle className='h-6 w-6 text-amber-600' />
					</div>
					<DialogTitle className='text-center'>
						Matrícula activa encontrada
					</DialogTitle>
					<DialogDescription className='text-center text-sm leading-relaxed'>
						Ya tienes una matrícula activa en el siguiente curso:{' '}
						<strong>{courseName}</strong>.
						<br />
						<br />
						Te invitamos a finalizar el curso <strong>{courseName}</strong> para
						realizar una nueva inscripción.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='sm:justify-center'>
					<Button
						onClick={onClose}
						variant='default'
					>
						Entendido
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
