import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8876',
				pathname: '/storage/images/*',
				search: '',
			},
		],
	},
};

export default nextConfig;
