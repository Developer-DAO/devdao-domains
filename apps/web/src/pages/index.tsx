import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { Heading, HStack, Stack, VStack, Text, Button } from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Web() {
  const router = useRouter();

  return (
    <VStack width="6xl" marginX="auto" gap="12">
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

      <Heading textAlign="center" fontSize="5xl" fontWeight="bold">
        .devdao domains
      </Heading>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci et
        voluptas optio dignissimos facere rem eaque. Cum ea doloribus libero.
      </Text>

      <HStack justifySelf="flex-end">
        <Button
          onClick={() => router.push('https://twitter.com/developer_dao')}
        >
          <FaTwitter />
        </Button>
        <Button
          onClick={() =>
            router.push('https://github.com/Developer-DAO/devdao-domains')
          }
        >
          <FaGithub />
        </Button>
      </HStack>
    </VStack>
  );
}
