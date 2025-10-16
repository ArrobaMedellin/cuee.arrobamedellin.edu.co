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
import { ScrollArea } from '@/components/ui/scroll-area'
import { useModalStore } from '@/stores/modalStore'
import { useEffect } from 'react'

export function TermsModal() {
	const { isTermsModalOpen, hasAcceptedTerms, openTermsModal, acceptTerms } =
		useModalStore()

	useEffect(() => {
		if (!hasAcceptedTerms) {
			openTermsModal()
		}
	}, [hasAcceptedTerms, openTermsModal])

	return (
		<Dialog
			open={isTermsModalOpen}
			onOpenChange={() => {}}
		>
			<DialogContent className='max-w-4xl max-h-[80vh]'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>¡Hola!</DialogTitle>
					<DialogDescription className='sr-only'>
						Términos y condiciones de uso de datos personales
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className='h-[60vh] pr-4'>
					<div className='space-y-4 text-sm leading-relaxed'>
						<p>
							En observancia de la Ley 1581 de 2012, reglamentada parcialmente
							por el Decreto 1377 de 2013 y en la política de tratamiento de
							datos adoptado por SAPIENCIA, la importancia de la neutralidad de
							los medios tecnológicos y de comunicación, e interpretando todos
							estos de manera sistémica e integral en aras de la protección de
							los derechos y principios que circundan el Habeas Data y el
							Tratamiento de Datos Personales, se establecen las siguientes
							condiciones:
						</p>

						<div className='space-y-3'>
							<p>
								<strong>
									1) FINALIDAD DEL TRATAMIENTO DE LOS DATOS PERSONALES PARA
									PERSONA JURÍDICA Y NATURAL: a)
								</strong>{' '}
								el cumplimiento del lleno de requisitos formales para la
								suscripción de actas de compromiso y la posterior aplicación de
								los derechos y obligaciones que surgen entre las partes con
								ocasión de su suscripción.
							</p>

							<p>
								<strong>b)</strong> el cumplimiento de la Ley de Transparencia y
								el Derecho de Acceso a la Información Pública Nacional (Ley 1712
								del 2014).
							</p>

							<p>
								<strong>c)</strong> La presentación de informes a los organismos
								de control.
							</p>

							<p>
								<strong>d)</strong> para la entrega de información a entidades
								cuyo objeto social y/o misional incluya la recolección de datos
								estadísticos, históricos y científicos.
							</p>

							<p>
								<strong>e)</strong> por solicitud de autoridad judicial.
								Manifiesto que me informaron que, si soy menor de edad y/o en
								caso de recolección de mi información sensible, tengo derecho a
								contestar o no las preguntas que me formulen y a entregar o no
								los datos solicitados. Entiendo que son datos sensibles aquellos
								que afectan la intimidad del titular o cuyo uso indebido pueda
								generar discriminación (información étnica, racial, su
								orientación política, convicciones religiosas o filosóficas, la
								pertenencia a sindicatos, organizaciones sociales, de derechos
								humanos, así como los relativos a la salud, vida sexual y datos
								biométricos). Manifiesto que me informaron que los datos
								sensibles que se recolectarán serán utilizados para las
								finalidades descritas por la Agencia (Uso, recolección,
								actualización, transferencia)
							</p>

							<p>
								<strong>Nota:</strong> Cualquier uso de la información distinto
								a lo aquí establecido, no es aceptado ni permitido por{' '}
								<strong>SAPIENCIA. 2) AVISO DE PRIVACIDAD:</strong> Para los
								efectos de esta cláusula y del aviso de privacidad, se
								consideran datos sensibles aquellos que puedan revelar aspectos
								como origen racial o étnico, estado de salud presente y futura,
								información genética, creencias religiosas, filosóficas y
								morales, afiliación sindical, opiniones políticas, preferencia
								sexual y todos aquellos datos que puedan afectar la intimidad
								del titular o cuyo uso indebido pueda generar su discriminación.
								Respecto a estos <strong>SAPIENCIA</strong> se obliga al uso
								adecuado de los mismos en concordancia con la normativa vigente,
								la buena fe, el orden público y el presente Aviso.
							</p>

							<p>
								<strong>
									3) MECANISMOS PARA LA PROTECCIÓN DE DATOS PERSONALES: ACCESO,
									RECTIFICACIÓN, CANCELACIÓN U OPOSICIÓN:
								</strong>{' '}
								la persona natural o jurídica Titular de Datos Personales puede
								solicitar a <strong>SAPIENCIA</strong> en cualquier momento, el
								acceso, la rectificación, la cancelación u oposición respecto a
								los datos personales que le conciernen, en este sentido,
								presentará su solicitud radicándola directamente en la Entidad o
								ingresando a la página web{' '}
								<a
									href='http://www.sapiencia.gov.co'
									target='_blank'
									rel='noopener noreferrer'
									className='text-primary underline hover:text-primary/80'
								>
									www.sapiencia.gov.co
								</a>{' '}
								en la opción de Contáctenos o escribiendo al correo{' '}
								<a
									href='mailto:info@sapiencia.gov.co'
									className='text-primary underline hover:text-primary/80'
								>
									info@sapiencia.gov.co
								</a>{' '}
								o comunicándose al teléfono en Medellín: (+57 4) 444 7947.
							</p>

							<p>
								<strong>PARÁGRAFO:</strong> con la suscripción de este
								formulario se entiende aceptada la finalidad del tratamiento de
								datos y que conoce los mecanismos para su protección.
							</p>
						</div>
					</div>
				</ScrollArea>

				<DialogFooter>
					<Button
						onClick={acceptTerms}
						className='w-full sm:w-auto'
					>
						Aceptar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
