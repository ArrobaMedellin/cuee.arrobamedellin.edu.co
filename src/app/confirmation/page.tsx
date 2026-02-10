'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function ConfirmationPage() {
	const handleClose = () => {
		// Limpiar el localStorage del formulario para permitir nuevas inscripciones
		localStorage.removeItem('registration-form')
		localStorage.removeItem('modal-store')

		// Intentar cerrar la pestaña/ventana
		window.close()

		// Si no se puede cerrar (bloqueado por el navegador), redirigir al inicio
		setTimeout(() => {
			window.location.href = '/'
		}, 100)
	}

	return (
		<main className='min-h-full bg-secondary py-8'>
			<div className='mx-auto max-w-3xl p-6'>
				<div className='rounded-xl border bg-card p-8 shadow-lg'>
					<div className='flex flex-col items-center text-center space-y-6'>
						<div className='rounded-full bg-green-100 p-4'>
							<CheckCircle className='h-16 w-16 text-green-600' />
						</div>

						<div className='space-y-4'>
							<h2 className='text-2xl font-bold text-foreground'>
								Tu inscripción en @Medellín fue exitosa
							</h2>

							<div className='text-lg text-muted-foreground space-y-4'>
								<p>
									En las próximas horas recibirás un correo con las indicaciones para comenzar tu curso en la Ciudadela Digital.
								</p>
								<p>
									Te recomendamos estar pendiente del correo electrónico que registraste y revisar también tu bandeja de spam o correo no deseado.
								</p>
								<p>Cada paso hace parte de tu ruta de aprendizaje. ¡Gracias por avanzar con nosotros!</p>
							</div>
						</div>

						<div className='pt-6 space-y-3 w-full max-w-md'>
							{/* <p className='text-sm text-muted-foreground'>
								Por favor, revisa tu correo electrónico en los próximos días
								para conocer el resultado de tu inscripción.
							</p> */}

							<Button
								variant='outline'
								className='w-full'
								onClick={handleClose}
							>
								Cerrar
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
