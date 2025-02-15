import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { RightColumn } from '@/components/layout/rightColumn';
import { Sidebar } from '@/components/layout/sidebar';

import '@/app/globals.css';

const inter = Inter({ subsets: ['cyrillic'] });

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navigation />
			<main className={inter.className}>
				<div className='container'>
					<section className='wrapper__content'>
						<Sidebar />
						{children}
						<RightColumn />
					</section>
				</div>
			</main>
			<Footer />
		</>
	);
}
