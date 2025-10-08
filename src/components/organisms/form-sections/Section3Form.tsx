'use client'

import { CitySelect } from '@/components/atoms/city-select'
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
import type { Section3Form } from '@/schemas/section3'
import { section3Schema } from '@/schemas/section3'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function Section3Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section3Form>({
		resolver: zodResolver(section3Schema),
		defaultValues: data.section3 || {
			countryOfResidence: '',
			departmentOfResidence: '',
			cityOfResidence: '',
			neighborhood: '',
			commune: '',
			stratum: '',
			addressType: '',
			addressNumber1: '',
			addressLetter1: '',
			addressOrientation1: '',
			addressNumber2: '',
			addressLetter2: '',
			addressOrientation2: '',
			addressNumber3: '',
			addressComplement: '',
			fullAddress: '',
			birthCity: '',
		},
	})

	const onSubmit = (values: Section3Form) => {
		setSectionData('section3', values)
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
						name='countryOfResidence'
						render={({ field }) => (
							<FormItem>
								<FormLabel>País de residencia</FormLabel>
								<FormControl>
									<Input
										placeholder='Colombia'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='departmentOfResidence'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Departamento de residencia</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa departamento'
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
						name='cityOfResidence'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ciudad de residencia</FormLabel>
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
					<FormField
						control={form.control}
						name='neighborhood'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Barrio</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa barrio'
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
						name='commune'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Comuna</FormLabel>
								<FormControl>
									<Input
										placeholder='Ingresa comuna'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Constructor de dirección */}
				<div className='space-y-4'>
					<h3 className='text-lg font-semibold'>Constructor de Dirección</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<FormField
							control={form.control}
							name='addressType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo de vía</FormLabel>
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
											<SelectItem value='CALLE'>Calle</SelectItem>
											<SelectItem value='CARRERA'>Carrera</SelectItem>
											<SelectItem value='DIAGONAL'>Diagonal</SelectItem>
											<SelectItem value='TRANSVERSAL'>Transversal</SelectItem>
											<SelectItem value='AVENIDA'>Avenida</SelectItem>
											<SelectItem value='CIRCULAR'>Circular</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='addressNumber1'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número principal</FormLabel>
									<FormControl>
										<Input
											placeholder='ej: 45'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='addressLetter1'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Letra (opcional)</FormLabel>
									<FormControl>
										<Input
											placeholder='ej: A'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='addressOrientation1'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Orientación (opcional)</FormLabel>
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
											<SelectItem value='NORTE'>Norte</SelectItem>
											<SelectItem value='SUR'>Sur</SelectItem>
											<SelectItem value='ESTE'>Este</SelectItem>
											<SelectItem value='OESTE'>Oeste</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='addressNumber2'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número secundario</FormLabel>
									<FormControl>
										<Input
											placeholder='ej: 12'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='addressNumber3'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número final</FormLabel>
									<FormControl>
										<Input
											placeholder='ej: 34'
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
						name='addressComplement'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Complemento (opcional)</FormLabel>
								<FormControl>
									<Input
										placeholder='ej: Apartamento 302, Interior 5, etc.'
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
						name='stratum'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Estrato</FormLabel>
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
										<SelectItem value='1'>1</SelectItem>
										<SelectItem value='2'>2</SelectItem>
										<SelectItem value='3'>3</SelectItem>
										<SelectItem value='4'>4</SelectItem>
										<SelectItem value='5'>5</SelectItem>
										<SelectItem value='6'>6</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='birthCity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ciudad de nacimiento</FormLabel>
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
			</form>
		</Form>
	)
}
