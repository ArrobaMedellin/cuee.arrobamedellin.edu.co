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
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useFormSubmission } from '@/hooks/use-form-submission'
import { useValidateSection } from '@/hooks/use-validate-section'
import { useFormStore } from '@/stores/formStore'
import { useModalStore } from '@/stores/modalStore'
import { RegistrationFormData } from '@/types/form'
import {
	getIneligibilityMessage,
	isEligibleForFullProcess,
} from '@/utils/eligibility'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Section1Form } from './form-sections/Section1Form'
import { Section2Form } from './form-sections/Section2Form'
import { Section3Form } from './form-sections/Section3Form'
import { Section4Form } from './form-sections/Section4Form'
import { Section5Form } from './form-sections/Section5Form'
import { Section6Form } from './form-sections/Section6Form'
import { Summary } from './Summary'

export function RegistrationForm() {
	const { currentSection, setCurrentSection, data } = useFormStore()
	const { hasAcceptedTerms } = useModalStore()
	const { isSubmitting, submitForm } = useFormSubmission()
	const { isSectionValid } = useValidateSection()
	const [showIneligibleDialog, setShowIneligibleDialog] = useState(false)
	const [showSubmitDialog, setShowSubmitDialog] = useState(false)
	const [showMaxAttemptsDialog, setShowMaxAttemptsDialog] = useState(false)
	const [ineligibilityAttempts, setIneligibilityAttempts] = useState(0)
	const router = useRouter()

	// Verificar elegibilidad después de completar section2
	const isEligible = useMemo(() => {
		const eligible = isEligibleForFullProcess(data)
		console.log('🔍 Verificación de elegibilidad:', {
			eligible,
			section2: data.section2,
			age: data.section2?.birthDate
				? (() => {
						const birth = new Date(data.section2.birthDate)
						const today = new Date()
						let age = today.getFullYear() - birth.getFullYear()
						const monthDiff = today.getMonth() - birth.getMonth()
						if (
							monthDiff < 0 ||
							(monthDiff === 0 && today.getDate() < birth.getDate())
						) {
							age--
						}
						return age
				  })()
				: null,
			cityOfResidence: data.section2?.cityOfResidence,
			bornCity: data.section2?.bornCity,
			worksInMedellin: data.section2?.worksInMedellin,
		})

		// Resetear contador si el usuario ahora es elegible
		if (eligible && ineligibilityAttempts > 0) {
			console.log(
				'✅ Usuario ahora es elegible - reseteando contador de intentos'
			)
			setIneligibilityAttempts(0)
		}

		return eligible
	}, [data, ineligibilityAttempts])

	const handleFormSubmit = async () => {
		try {
			await submitForm(data, () => {
				// Redireccionar a la página de confirmación después del envío exitoso
				router.push('/confirmation')
			})
			// Cerrar el diálogo después de un envío exitoso
			setShowSubmitDialog(false)
		} catch (err) {
			// Error handling is done in the hook
			console.error('Form submission failed:', err)
		}
	}

	const steps = useMemo(() => {
		const baseSteps = [
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
				tooltip: 'Nacimiento, contacto, género y representante (si aplica)',
			},
			{
				key: 3,
				title: 'Ubicación',
				description: 'Dirección y nacimiento',
				tooltip: 'Residencia y ciudad de nacimiento',
			},
			{
				key: 4,
				title: 'Socioeconómica',
				description: 'Condiciones y hogar',
				tooltip: 'Salud, vivienda, hijos',
			},
			{
				key: 5,
				title: 'Población y Etnias',
				description: 'Discapacidad y pertenencia étnica',
				tooltip: 'Discapacidad y pertenencia étnica',
			},
			{
				key: 6,
				title: 'Elección de Cursos',
				description: 'Selección de formación',
				tooltip: 'Cursos y cómo se enteró',
			},
			{
				key: 7,
				title: 'Resumen',
				description: 'Verificación final',
				tooltip: 'Revisa y envía',
			},
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

	// Check eligibility after completing section 2
	const handleNext = () => {
		console.log('🚀 handleNext llamado', {
			currentSection,
			isEligible,
			nextKey,
		})

		if (currentSection === 2) {
			// Check if user is eligible to continue
			console.log('✅ Validando elegibilidad en paso 2')
			if (!isEligible) {
				console.log('❌ Usuario NO elegible - mostrando diálogo')

				// Incrementar contador de intentos
				const newAttempts = ineligibilityAttempts + 1
				setIneligibilityAttempts(newAttempts)

				console.log(`⚠️ Intento ${newAttempts} de 2`)

				// Si ya llegó al máximo de intentos (2), forzar envío automático
				if (newAttempts >= 2) {
					console.log('Máximo de intentos alcanzado - mostrando diálogo final')
					setShowMaxAttemptsDialog(true)
					return
				}

				setShowIneligibleDialog(true)
				return
			}
			console.log('✅ Usuario elegible - continuando al siguiente paso')
		}
		goto(nextKey)
	}

	const handlePartialSubmit = async () => {
		// Submit only section 1 and 2 data for ineligible users
		console.log('📤 Enviando información parcial (section1 + section2)')
		setShowIneligibleDialog(false)
		setShowMaxAttemptsDialog(false)

		try {
			// Create partial data with only section1 and section2
			const partialData: Partial<RegistrationFormData> = {
				section1: data.section1,
				section2: data.section2,
			}

			console.log('📦 Datos parciales a enviar:', partialData)

			await submitForm(partialData, () => {
				// Redireccionar a la página de confirmación después del envío exitoso
				router.push('/confirmation')
			})

			toast.success(
				'Tu información básica ha sido enviada. Gracias por tu interés en nuestros programas.'
			)
		} catch (error) {
			console.error('❌ Error submitting partial data:', error)
			toast.error(
				'Hubo un error al enviar la información. Por favor intenta nuevamente.'
			)
		}
	}

	const handleFormAttempts = async () => {
		router.push('/thanks')
	}

	return (
		<div className='mx-auto max-w-6xl p-6 min-h-[70vh]'>
			<AlertDialog
				open={showIneligibleDialog}
				onOpenChange={setShowIneligibleDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Requisitos no cumplidos</AlertDialogTitle>
						<AlertDialogDescription className='text-black'>
							<span>{getIneligibilityMessage(data)}</span>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Revisar información</AlertDialogCancel>
						<AlertDialogAction onClick={handlePartialSubmit}>
							Enviar información básica
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog
				open={showMaxAttemptsDialog}
				onOpenChange={setShowMaxAttemptsDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Requisitos no cumplidos</AlertDialogTitle>
						<AlertDialogDescription className='text-black'>
							<span className='mb-3 block'>
								Gracias por tu interés en hacer parte de @Medellín. En este
								momento, los cursos están dirigidos a personas mayores de 18
								años que hayan nacido en Medellín, residan en la ciudad o
								trabajen en alguna de sus empresas, según los criterios
								definidos para esta convocatoria.
							</span>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction
							onClick={handleFormAttempts}
							className='bg-primary hover:bg-primary/90'
						>
							Cerrar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

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
								<div className='flex flex-col items-end gap-2'>
									<Button
										disabled={!hasAcceptedTerms || !isSectionValid}
										onClick={handleNext}
										className='w-full sm:w-auto'
									>
										Siguiente
									</Button>
									{/* {!isSectionValid && sectionErrors.length > 0 && (
										<div className='text-sm text-destructive max-w-md text-right'>
											<p className='font-medium'>
												Complete los siguientes campos:
											</p>
											<ul className='list-disc list-inside mt-1 text-xs'>
												{sectionErrors.slice(0, 3).map((error, idx) => (
													<li key={idx}>{error}</li>
												))}
												{sectionErrors.length > 3 && (
													<li>... y {sectionErrors.length - 3} campo(s) más</li>
												)}
											</ul>
										</div>
									)} */}
								</div>
							) : (
								<AlertDialog
									open={showSubmitDialog}
									onOpenChange={setShowSubmitDialog}
								>
									<AlertDialogTrigger asChild>
										<Button
											className='bg-primary hover:bg-primary/90'
											disabled={!hasAcceptedTerms || isSubmitting}
											onClick={() => setShowSubmitDialog(true)}
										>
											{isSubmitting && (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											)}
											{isSubmitting ? 'Enviando...' : 'Confirmar y Enviar'}
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
											<AlertDialogCancel disabled={isSubmitting}>
												Cancelar
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={handleFormSubmit}
												disabled={isSubmitting}
											>
												{isSubmitting && (
													<Loader2 className='mr-2 h-4 w-4 animate-spin' />
												)}
												{isSubmitting ? 'Enviando...' : 'Enviar'}
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
