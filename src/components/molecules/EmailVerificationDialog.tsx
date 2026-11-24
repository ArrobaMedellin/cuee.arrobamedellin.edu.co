'use client'

import { useEffect, useState } from 'react'
import { Loader2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'

interface Props {
	/** Correo enmascarado (a***z@gmail.com); null cierra el diálogo. */
	maskedEmail: string | null
	onRequestCode: () => Promise<boolean>
	onConfirm: (code: string) => Promise<boolean>
	onSkip: () => void
}

/**
 * Antes de cargar los datos guardados de una persona se le envía un código a
 * su correo registrado: el número de documento no es secreto.
 */
export function EmailVerificationDialog({
	maskedEmail,
	onRequestCode,
	onConfirm,
	onSkip,
}: Props) {
	const [step, setStep] = useState<'intro' | 'code'>('intro')
	const [code, setCode] = useState('')
	const [busy, setBusy] = useState(false)

	useEffect(() => {
		if (maskedEmail) {
			setStep('intro')
			setCode('')
		}
	}, [maskedEmail])

	const send = async () => {
		setBusy(true)
		const ok = await onRequestCode()
		setBusy(false)
		if (ok) setStep('code')
	}

	const confirm = async () => {
		if (code.length !== 6) return
		setBusy(true)
		const ok = await onConfirm(code)
		setBusy(false)
		if (!ok) setCode('')
	}

	return (
		<Dialog
			open={!!maskedEmail}
			onOpenChange={open => {
				if (!open && !busy) onSkip()
			}}
		>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Mail className='h-5 w-5' /> Encontramos tu inscripción
					</DialogTitle>
					<DialogDescription>
						{step === 'intro' ? (
							<>
								Para proteger tus datos, te enviaremos un código a{' '}
								<strong>{maskedEmail}</strong>. Con él cargamos la información que
								ya registraste.
							</>
						) : (
							<>
								Escribe el código de 6 dígitos que enviamos a{' '}
								<strong>{maskedEmail}</strong>. Vence en 10 minutos; revisa también
								la carpeta de spam.
							</>
						)}
					</DialogDescription>
				</DialogHeader>

				{step === 'code' && (
					<div className='flex justify-center py-2'>
						<InputOTP
							maxLength={6}
							value={code}
							onChange={setCode}
							inputMode='numeric'
							pattern='^[0-9]*$'
							autoFocus
							aria-label='Código de verificación'
						>
							<InputOTPGroup>
								{[0, 1, 2, 3, 4, 5].map(i => (
									<InputOTPSlot key={i} index={i} />
								))}
							</InputOTPGroup>
						</InputOTP>
					</div>
				)}

				<DialogFooter className='flex-col gap-2 sm:flex-col'>
					{step === 'intro' ? (
						<Button onClick={send} disabled={busy} className='w-full'>
							{busy && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							Enviar código
						</Button>
					) : (
						<>
							<Button
								onClick={confirm}
								disabled={busy || code.length !== 6}
								className='w-full'
							>
								{busy && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								Verificar y cargar mis datos
							</Button>
							<Button variant='ghost' onClick={send} disabled={busy} className='w-full'>
								Enviar otro código
							</Button>
						</>
					)}
					<Button
						variant='link'
						onClick={onSkip}
						disabled={busy}
						className='w-full text-muted-foreground'
					>
						No tengo acceso a ese correo: llenar el formulario
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
