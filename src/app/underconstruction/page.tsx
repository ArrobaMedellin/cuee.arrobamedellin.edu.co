export default function UnderConstructionPage() {
	return (
		<main className='flex flex-1 items-center justify-center py-12 px-4'>
			<div className='mx-auto max-w-lg w-full rounded-xl border bg-card p-10 shadow-lg text-center space-y-8'>
				<div className='flex justify-center'>
					<div className='relative'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-20 w-20 text-primary animate-pulse'
						>
							<path d='M12 6V2H8' />
							<path d='m8 18-4 4' />
							<path d='m20 18 4 4' />
							<path d='M2 22h20' />
							<path d='M7 10h10' />
							<path d='M10 10V6' />
							<path d='M14 10V6' />
							<path d='M7 14h10' />
							<path d='M10 14v4' />
							<path d='M14 14v4' />
							<path d='M5 18h14V6H5z' />
						</svg>

						<span className='absolute -top-1 -right-1 flex h-4 w-4'>
							<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75' />
							<span className='relative inline-flex h-4 w-4 rounded-full bg-primary' />
						</span>
					</div>
				</div>

				<div className='space-y-3'>
					<h1 className='text-2xl font-bold text-foreground sm:text-3xl'>
						Estamos mejorando por ti
					</h1>
					<p className='text-lg text-muted-foreground'>
						Danos un momento por favor...
					</p>
				</div>

				<div className='flex justify-center gap-1.5'>
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							className='h-2.5 w-2.5 rounded-full bg-primary'
							style={{
								animation: 'bounce 1.4s infinite ease-in-out both',
								animationDelay: `${i * 0.16}s`
							}}
						/>
					))}
				</div>

				<style>{`
					@keyframes bounce {
						0%, 80%, 100% { transform: scale(0); }
						40% { transform: scale(1); }
					}
				`}</style>
			</div>
		</main>
	)
}
