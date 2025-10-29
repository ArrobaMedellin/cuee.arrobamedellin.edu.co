import Image from 'next/image'

export default function Foooter() {
	return (
		<footer className='flex justify-end text-center text-sm text-white p-0 px-8 mt-auto'>
			<Image
				src='https://storage.googleapis.com/gestor-reports/logo_sapiencia.png'
				alt='Logo Arrobamedellín'
				width={300}
				height={200}
				style={{ height: 'auto' }}
			/>
		</footer>
	)
}
