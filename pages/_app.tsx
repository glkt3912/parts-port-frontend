import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'dark',
      fontFamily: 'Verdana, sans-serif',
    }}
  >
    <Component {...pageProps} />
  </MantineProvider>  
  )
}

export default MyApp
