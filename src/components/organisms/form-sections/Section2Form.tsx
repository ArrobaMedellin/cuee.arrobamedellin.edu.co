'use client'

import { CitySelect } from '@/components/atoms/city-select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { useConditionalFields } from '@/hooks/use-conditional-fields'
import type { Section2Form } from '@/schemas/section2'
import { section2Schema } from '@/schemas/section2'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
			representativeFirstName: '',
			representativeDocumentType: '',
			representativeDocumentNumber: '',
			representativeEmail: '',
		},
	})

	const birthDate = form.watch('birthDate')
	const { showRepresentativeFields } = useConditionalFields(birthDate)

	const onSubmit = (values: Section2Form) => {
		setSectionData('section2', values)
		// Opcional: mostrar toast de éxito
		// toast.success('Datos guardados correctamente')
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
									<CitySelect
										value={field.value}
										onValueChange={field.onChange}
										placeholder='Selecciona una ciudad'
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
								<FormLabel>Sexo Biológico</FormLabel>
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
										<SelectItem value='Hombre'>Hombre</SelectItem>
										<SelectItem value='Mujer'>Mujer</SelectItem>
										<SelectItem value='Intersexual'>Intersexual</SelectItem>
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
										<SelectItem value='Lesbiana'>Lesbiana</SelectItem>
										<SelectItem value='Gay'>Gay</SelectItem>
										<SelectItem value='Bisexual'>Bisexual</SelectItem>
										<SelectItem value='Pansexual'>Pansexual</SelectItem>
										<SelectItem value='Asexual'>Asexual</SelectItem>
										<SelectItem value='Heterosexual'>Heterosexual</SelectItem>
										<SelectItem value='Prefiero no responder'>
											Prefiero no responder
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
										<SelectItem value='Mujer Cis'>Mujer Cis</SelectItem>
										<SelectItem value='Hombre Cis'>Hombre Cis</SelectItem>
										<SelectItem value='Mujer trans'>Mujer trans</SelectItem>
										<SelectItem value='Hombre trans'>Hombre trans</SelectItem>
										<SelectItem value='No binario'>No binario</SelectItem>
										<SelectItem value='Genero fluido'>Género fluido</SelectItem>
										<SelectItem value='Travesti'>Travesti</SelectItem>
										<SelectItem value='Ninguno'>Ninguno</SelectItem>
										<SelectItem value='Prefiero no responder'>
											Prefiero no responder
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Campos del representante legal para menores de edad */}
				{showRepresentativeFields && (
					<div className='transition-all duration-300 ease-in-out'>
						<Card>
							<CardHeader className='pb-3'>
								<CardTitle className='flex items-center gap-2 text-primary'>
									Datos del Representante Legal
								</CardTitle>
								<p className='text-sm text-primary'>
									Como eres menor de edad, necesitamos los datos de tu
									representante legal.
								</p>
							</CardHeader>
							<CardContent className='space-y-4'>
								<FormField
									control={form.control}
									name='representativeFirstName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombres del representante legal</FormLabel>
											<FormControl>
												<Input
													placeholder='Ingresa nombres completos'
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
													placeholder='ejemplo@correo.com'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</div>
				)}
			</form>
		</Form>
	)
}
