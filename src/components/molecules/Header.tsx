import Image from "next/image";

export default function Header() {
	return (
		<div className='mb-4 pt-8 mx-8 flex justify-between items-center'>
			<Image src="/images/logo.png" alt="Logo Arrobamedellín" width={200} height={100} />
			<h1 className='mb-6 text-center text-2xl font-bold text-white'>
				Inscripciones Sapiencia {new Date().getFullYear()}
			</h1>
		</div>
	)
}