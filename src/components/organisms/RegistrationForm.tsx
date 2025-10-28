'use client'

import { Step, Stepper } from '@/components/atoms/stepper'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useFormStore } from '@/stores/formStore'
import { useModalStore } from '@/stores/modalStore'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { Section1Form } from './form-sections/Section1Form'
import { Section2Form } from './form-sections/Section2Form'
import { Section3Form } from './form-sections/Section3Form'
import { Section4Form } from './form-sections/Section4Form'
import { Section5Form } from './form-sections/Section5Form'
import { Section6Form } from './form-sections/Section6Form'
import { Section7Form } from './form-sections/Section7Form'
import { Summary } from './Summary'

export function RegistrationForm() {
	const { currentSection, setCurrentSection } = useFormStore()
	const { hasAcceptedTerms } = useModalStore()

	const steps = useMemo(() => {
		const baseSteps = [
			{
				key: 1,
				title: 'Información Personal',
				description: 'Datos básicos',
				tooltip: 'Nombres, apellidos y documento'
			},
			{
				key: 2,
				title: 'Datos Personales',
				description: 'Contacto y perfil',
				tooltip: 'Nacimiento, contacto, género y representante (si aplica)'
			},
			{
				key: 3,
				title: 'Ubicación',
				description: 'Dirección y nacimiento',
				tooltip: 'Residencia y ciudad de nacimiento'
			},
			{
				key: 4,
				title: 'Socioeconómica',
				description: 'Condiciones y hogar',
				tooltip: 'Salud, vivienda, hijos'
			},
			{
				key: 5,
				title: 'Población y Etnias',
				description: 'Discapacidad y pertenencia étnica',
				tooltip: 'Discapacidad y pertenencia étnica'
			},
			{
				key: 6,
				title: 'Elección de Cursos',
				description: 'Selección de formación',
				tooltip: 'Cursos y cómo se enteró'
			},
			{
				key: 7,
				title: 'Resumen',
				description: 'Verificación final',
				tooltip: 'Revisa y envía'
			}
		]

		return baseSteps
	}, [])

	const goto = (target: number) => {
		setCurrentSection(target)
	}

	const renderForm = () => {
		switch (currentSection) {
			case 1:
				return <Section1Form />
			case 2:
				return <Section2Form />
			case 3:
				return <Section3Form />
			case 4:
				return <Section4Form />
			case 5:
				return <Section5Form />
			case 6:
				return <Section6Form />
			case 7:
				return <Section7Form />
			case 8:
				return <Summary />
			default:
				return <Section1Form />
		}
	}

	const stepIndex = steps.findIndex(s => s.key === currentSection)
	const canGoPrev = stepIndex > 0
	const canGoNext = stepIndex < steps.length - 1

	// Navegación simplificada
	const getNextStep = () => {
		if (!canGoNext) return currentSection
		return steps[stepIndex + 1].key
	}

	const getPrevStep = () => {
		if (!canGoPrev) return currentSection
		return steps[stepIndex - 1].key
	}

	const nextKey = getNextStep()
	const prevKey = getPrevStep()

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
								disabled={i > stepIndex || !hasAcceptedTerms}
								onClick={() =>
									hasAcceptedTerms && i <= stepIndex && goto(s.key)
								}
							/>
						))}
					</Stepper>
				</aside>

				<section className='rounded-xl border bg-card p-4 shadow-sm flex flex-col'>
					<div className='flex-1'>
						{!hasAcceptedTerms ? (
							<div className='flex items-center justify-center h-64'>
								<div className='text-center text-muted-foreground'>
									<h3 className='text-lg font-medium mb-2'>
										Acepta los términos y condiciones
									</h3>
									<p className='text-sm'>
										Para continuar con el registro, debes aceptar nuestros
										términos y condiciones de tratamiento de datos personales.
									</p>
								</div>
							</div>
						) : currentSection === 7 ? (
							<Summary />
						) : (
							renderForm()
						)}
					</div>

					<div className='mt-auto pt-6 flex items-center justify-between gap-3'>
						<Button
							variant='outline'
							disabled={!canGoPrev || !hasAcceptedTerms}
							onClick={() => goto(prevKey)}
						>
							Anterior
						</Button>
						<div className='flex items-center gap-3'>
							{canGoNext ? (
								<Button
									disabled={!hasAcceptedTerms}
									onClick={() => goto(nextKey)}
								>
									Siguiente
								</Button>
							) : (
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											className='bg-primary hover:bg-primary/90'
											disabled={!hasAcceptedTerms}
										>
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
