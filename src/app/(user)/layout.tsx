import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Sidebar } from "@/components/Sidebar";
import { RightColumn } from '@/components/RightColumn';
import { Footer } from '@/components/Footer';
import '@/app/globals.css'

const inter = Inter({ subsets: ['cyrillic']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <main className={inter.className}>
          <Navigation />
          <div className="container">
            <section className="wrapper__content">
              <Sidebar />
              {children}
              <RightColumn />
            </section>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
