import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	redirects: async () => {
		return [
			{
				source: '/',
				destination: '/underconstruction',
				permanent: false
			}
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.cloud.google.com'
			},
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com'
			},
			{
				protocol: 'https',
				hostname: 'fonts.gstatic.com'
			}
		]
	}
}

export default nextConfig
