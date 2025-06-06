import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '82.202.131.212',
				port: '8876',
				pathname: '/storage/images/*',
				search: '',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://82.202.131.212:8876/api/:path*',
			},
			{
				source: '/ws/:path*',
				destination: 'http://82.202.131.212:8080/:path*',
			},
		];
	},
};

export default nextConfig;
