'use client'

import { Button } from '@/components/ui/button'

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
						<div className='space-y-4'>
							<h2 className='text-3xl font-bold text-foreground'>
								Por ahora no cumples con los requisitos de esta convocatoria
							</h2>

							<div className='text-lg text-black space-y-4'>
								<p>
									Gracias por tu interés en ser parte de @Medellín. Actualmente,
									los cursos están dirigidos a personas desde los 15 años que
									hayan nacido en Medellín o que residan en la ciudad, según los
									criterios definidos para esta convocatoria.
								</p>
								<p>
									Valoramos tu interés y te invitamos a estar pendiente de
									nuestras próximas oportunidades.
								</p>
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
