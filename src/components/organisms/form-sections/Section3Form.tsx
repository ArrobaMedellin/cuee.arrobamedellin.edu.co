'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { section3Schema } from '@/schemas/section3'
import type { Section3Form } from '@/schemas/section3'
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
			address: '',
			stratum: '',
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
									<Input
										placeholder='Ingresa ciudad'
										{...field}
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
				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dirección</FormLabel>
							<FormControl>
								<Input
									placeholder='Ingresa dirección'
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
			</form>
		</Form>
	)
}
