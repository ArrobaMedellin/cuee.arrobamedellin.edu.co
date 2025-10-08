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
import type { Section21Form as Section21Values } from '@/schemas/section21'
import { section21Schema } from '@/schemas/section21'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function Section21Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section21Values>({
		resolver: zodResolver(section21Schema),
		defaultValues: data.section21 || {
			representativeFirstName: '',
			representativeDocumentType: '',
			representativeDocumentNumber: '',
			representativeEmail: '',
		},
	})

	const onSubmit = (values: Section21Values) => {
		setSectionData('section21', values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='representativeFirstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombres del representante legal</FormLabel>
							<FormControl>
								<Input
									placeholder='Ingresa nombres'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='representativeDocumentType'
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
										<SelectItem value='Registro Civil'>
											Registro civil
										</SelectItem>
										<SelectItem value='Tarjeta de identidad'>
											Tarjeta de identidad
										</SelectItem>
										<SelectItem value='Cédula de ciudadanía'>
											Cédula de ciudadanía
										</SelectItem>
										<SelectItem value='Cédula extranjería'>
											Cédula extranjería
										</SelectItem>
										<SelectItem value='Otro'>Otro</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='representativeDocumentNumber'
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
				<FormField
					control={form.control}
					name='representativeEmail'
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
			</form>
		</Form>
	)
}
