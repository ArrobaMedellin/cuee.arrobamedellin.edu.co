'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import type { Section7Form } from '@/schemas/section7'
import { section7Schema } from '@/schemas/section7'
import { useFormStore } from '@/stores/formStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function Section7Form() {
	const { data, setSectionData } = useFormStore()
	const form = useForm<Section7Form>({
		resolver: zodResolver(section7Schema),
		defaultValues: data.section7 || {
			graduationYear: '',
			graduatedFrom: '',
			hasIcfesPro: 'NO',
			icfesProScore: '',
			icfesProYear: ''
		}
	})

	const onSubmit = (values: Section7Form) => {
		setSectionData('section7', values)
	}

	const hasIcfesPro = form.watch('hasIcfesPro')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				{/* Información de graduación bachillerato */}
				<Card>
					<CardHeader>
						<CardTitle>Información de Graduación</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='graduationYear'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Año de graduación de bachillerato</FormLabel>
										<FormControl>
											<Input
												type='number'
												min='1950'
												max='2024'
												placeholder='2020'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='graduatedFrom'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Institución donde se graduó</FormLabel>
										<FormControl>
											<Input
												placeholder='Nombre de la institución educativa'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Información Saber Pro */}
				<Card>
					<CardHeader>
						<CardTitle>Examen Saber Pro (ICFES)</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6'>
						<FormField
							control={form.control}
							name='hasIcfesPro'
							render={({ field }) => (
								<FormItem>
									<FormLabel>¿Ha presentado el examen Saber Pro?</FormLabel>
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
											<SelectItem value='SI'>Sí</SelectItem>
											<SelectItem value='NO'>No</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{hasIcfesPro === 'SI' && (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='icfesProScore'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Puntaje obtenido</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='0'
													max='500'
													placeholder='250'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='icfesProYear'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Año de presentación</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='2000'
													max='2024'
													placeholder='2023'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}
					</CardContent>
				</Card>
			</form>
		</Form>
	)
}
