'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { DOCUMENT_TYPE_OPTIONS } from '@/constants'
import type { Section1Form } from '@/schemas/section1'
import { section1Schema } from '@/schemas/section1'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function Section1Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section1Form>({
		resolver: zodResolver(section1Schema),
		defaultValues: data.section1 || {
			firstName: '',
			lastName: '',
			documentType: '',
			documentNumber: '',
			email: '',
			emailVerification: '',
			countryOfBirth: '',
			departmentOfBirth: '',
			municipalityOfBirth: '',
			otherDocumentType: '',
		},
	})

	// Guardar datos automáticamente cuando cambian los valores del formulario
	useEffect(() => {
		const subscription = form.watch(values => {
			// Solo guardar si hay datos válidos (no vacíos)
			if (values && Object.keys(values).length > 0) {
				setSectionData('section1', values as Section1Form)
			}
		})
		return () => subscription.unsubscribe()
	}, [form, setSectionData])

	const onSubmit = (values: Section1Form) => {
		setSectionData('section1', values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombres</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa tus nombres'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellidos</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa tus apellidos'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='documentType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo de documento</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona tipo' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{DOCUMENT_TYPE_OPTIONS.map(option => (
											<SelectItem
												key={option.value}
												value={option.value}
											>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{form.watch('documentType') === 'Otro' && (
						<FormField
							control={form.control}
							name='otherDocumentType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Especifica el tipo de documento</FormLabel>
									<FormControl>
										<Input
											placeholder='Ingresa el tipo de documento'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='documentNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Número de documento</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa número'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='correo@ejemplo.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='emailVerification'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verificar correo electrónico</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='correo@ejemplo.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}
