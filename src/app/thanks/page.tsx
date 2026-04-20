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
								<div className='py-10'>
									<Button
										asChild
										className='w-full'
									>
										<a
											href='https://ciudadeladigital.arrobamedellin.edu.co/'
											target='_blank'
											rel='noopener noreferrer'
											className='text-xl py-6'
										>
											Haz click aquí para ingresar a tu curso
										</a>
									</Button>
								</div>
								<p>
									<a
										href='https://youtu.be/Kpw-4QbyrNg'
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary underline font-semibold'
									>
										Haciendo clic aquí
									</a>
									, podrás observar un video tutorial con el paso a paso para
									ingresar a la Ciudadela Digital de @Medellín.
								</p>
								<p>
									También puedes{' '}
									<a
										href='https://storage.googleapis.com/arroba-downloads/recursos/Manual%20de%20Ingreso%20a%20la%20Plataforma%20de%20Cursos%20%20Ciudadela%20Digital%20%E2%80%93%20Arroba%20Medelli%CC%81n%20.pdf'
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary underline font-semibold'
									>
										hacer clic aquí
									</a>{' '}
									para acceder al paso a paso en versión PDF.
								</p>
								<p className='font-semibold text-center'>
									¡Este es el momento de comenzar!
								</p>
								<p>
									Ingresa, activa tu cuenta y avanza en tu proceso de
									aprendizaje.
								</p>
								<p>
									Si tienes alguna novedad para el ingreso a la ciudadela puedes
									escribirnos al correo{' '}
									<a
										href='mailto:info@sapiencia.gov.co'
										className='text-primary underline font-semibold'
									>
										info@sapiencia.gov.co
									</a>{' '}
									o generar una solicitud en nuestro sistema de tickets,
									haciendo clic en el siguiente{' '}
									<a
										href='https://soporte.arrobamedellin.edu.co/support/upload/'
										target='_blank'
										rel='noopener noreferrer'
										className='text-primary underline font-semibold'
									>
										enlace
									</a>
									.
								</p>
							</div>
						</div>

						<div className='pt-6 space-y-3 w-full max-w-md'>
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
