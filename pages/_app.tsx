import '../styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>
      {`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}
    </style>
    <QueryClientProvider client={queryClient}>
      <Component className={`${inter.variable} font-sans`} {...pageProps} />
    </QueryClientProvider>
  </> 
}
