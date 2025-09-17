'use client'

import { Button } from '@/components/ui/button'
import { Stepper, Step } from '@/components/atoms/stepper'
import { Section1Form } from './form-sections/Section1Form'
import { Section2Form } from './form-sections/Section2Form'
import { Section3Form } from './form-sections/Section3Form'
import { Section21Form } from './form-sections/Section21Form'
import { Section5Form } from './form-sections/Section5Form'
import { Section6Form } from './form-sections/Section6Form'
import { useFormStore } from '@/stores/formStore'
import { useMemo } from 'react'
import { Summary } from './Summary'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

export function RegistrationForm() {
	const { currentSection, setCurrentSection } = useFormStore()

	const steps = useMemo(
		() => [
			{
				key: 1,
				title: 'Información Personal',
				description: 'Datos básicos',
				tooltip: 'Nombres, apellidos y documento',
			},
			{
				key: 2,
				title: 'Datos Personales',
				description: 'Contacto y perfil',
				tooltip: 'Nacimiento, contacto, género',
			},
			{
				key: 21,
				title: 'Representante',
				description: 'Sección 2.1',
				tooltip: 'Datos del representante legal',
			},
			{
				key: 3,
				title: 'Ubicación',
				description: 'Dirección y nacimiento',
				tooltip: 'Residencia y ciudad de nacimiento',
			},
			{
				key: 5,
				title: 'Socioeconómica',
				description: 'Condiciones y hogar',
				tooltip: 'Salud, vivienda, hijos',
			},
			{
				key: 6,
				title: 'Población y Etnias',
				description: 'Discapacidad y pertenencia étnica',
				tooltip: 'Discapacidad y pertenencia étnica',
			},
			{
				key: 7,
				title: 'Resumen',
				description: 'Verificación final',
				tooltip: 'Revisa y envía',
			},
		],
		[]
	)

	const goto = (target: number) => setCurrentSection(target)

	const renderForm = () => {
		switch (currentSection) {
			case 1:
				return <Section1Form />
			case 2:
				return <Section2Form />
			case 21:
				return <Section21Form />
			case 3:
				return <Section3Form />
			case 5:
				return <Section5Form />
			case 6:
				return <Section6Form />
			default:
				return <Section1Form />
		}
	}

	const stepIndex = steps.findIndex(s => s.key === currentSection)
	const canGoPrev = stepIndex > 0
	const canGoNext = stepIndex < steps.length - 1
	const nextKey = canGoNext ? steps[stepIndex + 1].key : currentSection
	const prevKey = canGoPrev ? steps[stepIndex - 1].key : currentSection

	return (
		<div className='mx-auto max-w-6xl p-6 min-h-[70vh]'>
			<div className='grid gap-6 md:grid-cols-[280px_1fr]'>
				<aside className='rounded-xl border bg-card p-2'>
					<Stepper>
						{steps.map((s, i) => (
							<Step
								key={s.key}
								state={
									i < stepIndex
										? 'completed'
										: i === stepIndex
										? 'current'
										: 'pending'
								}
								title={`Paso ${i + 1}: ${s.title}`}
								description={s.description}
								tooltip={s.tooltip}
								disabled={i > stepIndex}
								onClick={() => i <= stepIndex && goto(s.key)}
							/>
						))}
					</Stepper>
				</aside>

				<section className='rounded-xl border bg-card p-4 shadow-sm flex flex-col'>
					<div className='flex-1'>
						{currentSection === 7 ? <Summary /> : renderForm()}
					</div>

					<div className='mt-auto pt-6 flex items-center justify-between gap-3'>
						<Button
							variant='outline'
							disabled={!canGoPrev}
							onClick={() => goto(prevKey)}
						>
							Anterior
						</Button>
						<div className='flex items-center gap-3'>
							{canGoNext ? (
								<Button onClick={() => goto(nextKey)}>Siguiente</Button>
							) : (
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button className='bg-primary hover:bg-primary/90'>
											Confirmar y Enviar
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												¿Enviar la información?
											</AlertDialogTitle>
											<AlertDialogDescription>
												Verifica que los datos sean correctos. Podrás editar
												después si es necesario.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancelar</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => {
													toast.success('Información enviada correctamente')
												}}
											>
												Enviar
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							)}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
