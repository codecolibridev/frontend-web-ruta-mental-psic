import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
          <html lang="es">
               <head></head>
               <body className={`${inter.variable} font-display antialiased`}>{children}</body>
          </html>
     );
}
