import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { RightColumn } from "@/components/layout/rightColumn";
import { Footer } from "@/components/layout/footer";
import "@/app/globals.css";

const inter = Inter({ subsets: ["cyrillic"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <Navigation />
                <main className={inter.className}>
                    <div className="container">
                        <section className="wrapper__content">
                            <Sidebar />
                            {children}
                            <RightColumn />
                        </section>
                    </div>
                </main>
                <Footer />
            </body>
        </html>
    );
}
