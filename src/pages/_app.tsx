import { WindowSizeContextProvider } from '@/hooks/windowSizeContext';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WindowSizeContextProvider>
        <Component {...pageProps} />
    </WindowSizeContextProvider>
  );
}
