import { useRouter } from 'next/router';

import { HStack, Heading } from '@chakra-ui/react';
import { ConnectWalletButton } from './ConnectWalletButton';

export const Navbar = () => {
  const router = useRouter();

  return (
    <HStack
      width="full"
      marginTop="10"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Heading
        cursor="pointer"
        fontSize="3xl"
        onClick={() => router.push('/')}
      >
        .D_D
        </Heading>
      <ConnectWalletButton />
    </HStack>
  )
}