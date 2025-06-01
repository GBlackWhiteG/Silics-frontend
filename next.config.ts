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
		ignoreDuringBuilds: true, // Отключает ESLint при сборке
	},
};

export default nextConfig;
