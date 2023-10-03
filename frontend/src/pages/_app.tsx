import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans text-dark">
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}