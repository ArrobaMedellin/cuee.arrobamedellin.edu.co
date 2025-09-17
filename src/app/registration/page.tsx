import { RegistrationForm } from '@/components/organisms/RegistrationForm'
import Image from 'next/image';

export default function RegistrationPage() {
	return (
		<main className='min-h-screen bg-secondary py-8'>
			<div className='mb-4 mt-4 mx-8 flex justify-between items-center'>
				<Image src="https://storage.googleapis.com/arroba-downloads/recursos/logo.png" alt="Logo Arrobamedellín" width={200} height={100} />
				<h1 className='mb-6 text-center text-2xl font-bold text-white'>
					Inscripciones Sapiencia {new Date().getFullYear()}
				</h1>
			</div>
			<RegistrationForm />
		</main>
	)
}
