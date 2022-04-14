import '../styles/global.css';
import { WagmiProvider } from 'ui';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiProvider>
        <Component {...pageProps} />
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
