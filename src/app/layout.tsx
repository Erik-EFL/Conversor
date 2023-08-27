import { Providers } from '@/core/provider/theme.provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Header from './components/Global/Header.global';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DocX to HTML',
  description: 'Conversor de arquivos Docx para HTML',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='ligth'>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
