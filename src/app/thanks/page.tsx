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
								Tu inscripción en @Medellín fue exitosa
							</h2>

							<div className='text-lg text-black space-y-4'>
								<p>
									Desde este momento puedes ingresar a la Ciudadela Digital.
								</p>
								<p>
									Tu usuario y contraseña inicial son tu número de documento de
									identidad. Al ingresar por primera vez, el sistema te pedirá
									actualizar la contraseña para mayor seguridad.
								</p>
								<p>
									Igualmente, a tu correo electrónico llegará toda la
									información detallada para el ingreso y el inicio de tu curso.
									Te recomendamos estar pendiente del correo que registraste y
									revisar también tu bandeja de spam o correo no deseado.
								</p>
								<p>
									<a
										href='https://ciudadeladigital.arrobamedellin.edu.co/'
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary underline font-semibold'
									>
										Haciendo clic aquí
									</a>
									, podrás observar un video tutorial con el paso a paso para
									ingresar a la Ciudadela Digital de @Medellín.
								</p>
								<p className='font-semibold'>
									Este es el momento de comenzar. Ingresa, activa tu cuenta y
									avanza en tu proceso de aprendizaje.
								</p>
							</div>
						</div>

						<div className='pt-6 space-y-3 w-full max-w-md'>
							<Button
								asChild
								className='w-full'
							>
								<a
									href='https://ciudadeladigital.arrobamedellin.edu.co/'
									target='_blank'
									rel='noopener noreferrer'
								>
									Ir a la Ciudadela
								</a>
							</Button>
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
