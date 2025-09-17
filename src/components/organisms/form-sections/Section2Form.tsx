'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { section2Schema } from '@/schemas/section2'
import type { Section2Form } from '@/schemas/section2'
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
import { useFormStore } from '@/stores/formStore'

export function Section2Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section2Form>({
		resolver: zodResolver(section2Schema),
		defaultValues: data.section2 || {
			birthDate: '',
			cityOfResidence: '',
			phone: '',
			gender: '',
			sexualOrientation: '',
			genderIdentity: '',
		},
	})

	const onSubmit = (values: Section2Form) => {
		setSectionData('section2', values)
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
						name='birthDate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fecha de nacimiento</FormLabel>
								<FormControl>
									<Input
										type='date'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='cityOfResidence'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ciudad dónde vive</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa ciudad'
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
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Teléfono</FormLabel>
							<FormControl>
								<Input
									placeholder='Ingresa teléfono'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<FormField
						control={form.control}
						name='gender'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sexo</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='masculino'>Masculino</SelectItem>
										<SelectItem value='femenino'>Femenino</SelectItem>
										<SelectItem value='otro'>Otro</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='sexualOrientation'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Orientación sexual</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='heterosexual'>Heterosexual</SelectItem>
										<SelectItem value='homosexual'>Homosexual</SelectItem>
										<SelectItem value='bisexual'>Bisexual</SelectItem>
										<SelectItem value='otro'>Otro</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='genderIdentity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Identidad de género</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Selecciona' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='hombre'>Hombre</SelectItem>
										<SelectItem value='mujer'>Mujer</SelectItem>
										<SelectItem value='no-binario'>No binario</SelectItem>
										<SelectItem value='otro'>Otro</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}
