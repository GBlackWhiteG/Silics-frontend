import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
