import '../styles/global.css';
import { WagmiProvider } from 'ui';
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { AppProps } from 'next/app';
import { Container, ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiProvider>
        <Container maxW={['container.md', 'container.xl']} h='90vh'>
          <Navbar />
          <Component {...pageProps} />
        </Container>
        <Footer />
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
