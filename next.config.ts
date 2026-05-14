import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'storage.cloud.google.com' },
			{ protocol: 'https', hostname: 'storage.googleapis.com' },
			{ protocol: 'https', hostname: 'fonts.gstatic.com' }
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.INTERNAL_API_URL || 'http://localhost:4000/api'}/:path*`,
			},
		]
	},
}

export default nextConfig
