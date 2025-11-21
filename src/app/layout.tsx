import ConditionalNavbar from '@/components/layout/ConditionalNavbar';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

interface RootLayoutProps {
     children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
     return (
          <html lang="es">
               <head></head>
               <body className={`${inter.variable} font-display antialiased flex min-h-screen`}>
                    <Toaster
                         position="top-center"
                         toastOptions={{
                              style: {
                                   backgroundColor: 'var(--toast-bg)',
                                   color: 'var(--toast-text)',
                                   border: 'none',
                                   fontSize: '15px',
                              },
                         }}
                    />
                    <ConditionalNavbar />
                    <main
                         className="p-7 flex flex-col flex-1 bg-background-light dark:bg-background-dark transition-all duration-200"
                         style={{ paddingLeft: 'calc(var(--sidebar-width, 0) + 2rem)' }}
                    >
                         {children}
                    </main>
               </body>
          </html>
     );
}
