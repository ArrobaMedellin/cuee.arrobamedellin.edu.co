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

						<div className='space-y-4'>
							<h2 className='text-3xl font-bold text-foreground'>
								Requisitos no cumplidos
							</h2>

							<div className='text-lg text-black space-y-4'>
								<p>
									Gracias por tu interés en hacer parte de @Medellín. En este momento, los cursos están dirigidos a personas mayores de 18 años que hayan nacido en Medellín, residan en la ciudad o trabajen en alguna de sus empresas, según los criterios definidos para esta convocatoria.
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
