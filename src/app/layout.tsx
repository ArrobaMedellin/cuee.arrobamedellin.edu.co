import Footer from '@/components/molecules/Footer'
import Header from '@/components/molecules/Header'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'CUEE Sapiencia',
	description: 'CUEE Sapiencia'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<main className='min-h-screen bg-secondary flex flex-col'>
					<Header />
					<div className='flex-grow'>{children}</div>
					<Toaster
						richColors
						closeButton
						position='top-right'
					/>
					<Footer />
				</main>
			</body>
		</html>
	)
}
