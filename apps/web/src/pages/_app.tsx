import '../styles/global.css';
import { WagmiProvider } from 'ui';
import { Navbar } from '../components/Navbar'
import type { AppProps } from 'next/app';
import { VStack, ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiProvider>
        <VStack width="6xl" marginX="auto" gap="12">
          <Navbar />
          <Component {...pageProps} />
        </VStack>
      </WagmiProvider>
    </ChakraProvider >
  );
}

export default MyApp;
