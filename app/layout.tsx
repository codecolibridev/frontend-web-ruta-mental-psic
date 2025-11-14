import ConditionalNavbar from '@/components/ConditionalNavbar';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

interface RootLayoutProps {
     children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
     return (
          <html lang="es">
               <head></head>
               <body className={`${inter.variable} font-display antialiased flex min-h-screen`}>
                    <ConditionalNavbar />
                    <main className="p-7 flex flex-col flex-1 bg-background-light dark:bg-background-dark">
                         {children}
                    </main>
               </body>
          </html>
     );
}
