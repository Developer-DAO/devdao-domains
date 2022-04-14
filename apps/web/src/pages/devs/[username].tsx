import { ContractCard } from '@/components/ContractCard';
import { ContributionCard } from '@/components/ContributionCard';
import { DAOCard } from '@/components/DAOCard';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaAddressCard, FaCheckCircle, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';

const Page: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <Head>
        <title>{username}.devdao | devdao domains</title>
      </Head>
      <Box minH='100vh' minW='100vw' maxW='100vw'>
        <Container py='10'>
          <VStack spacing='4'>
            <Avatar
              src='https://avatars.githubusercontent.com/u/39617427'
              size='xl'
            />
            <Heading>{username}.devdao</Heading>
            <Text>Frontend engineer @ mazury.xyz</Text>

            <HStack>
              <Button>
                <FaAddressCard /> <Text ml='2'>dhaiwat.eth</Text>
              </Button>

              <Button>
                <FaGithub /> <Text ml='2'>dhaiwat10</Text>
              </Button>

              <Button>
                <FaTwitter /> <Text ml='2'>dhaiwat10</Text>
              </Button>

              <Button>
                <FaGlobe /> <Text ml='2'>dhaiwat.xyz</Text>
              </Button>
            </HStack>

            <Divider />

            <VStack>
              <Heading as='h3' size='md'>
                Developer DAO contributions
              </Heading>

              <SimpleGrid spacing={4} columns={2}>
                <ContributionCard
                  repoName='web3-ui'
                  commitsCount={10}
                  repoLanguage='TypeScript'
                  link='https://github.com/developer-dao/web3-ui'
                />
                <ContributionCard
                  repoName='devdao-domains'
                  commitsCount={20}
                  repoLanguage='TypeScript'
                  link='https://github.com/developer-dao/devdao-domains'
                />
              </SimpleGrid>
            </VStack>

            <Divider />

            <VStack>
              <Heading as='h3' size='md'>
                DAOs I&apos;m a part of
              </Heading>

              <SimpleGrid spacing={4} columns={2}>
                <DAOCard
                  name='Developer DAO'
                  link='https://twitter.com/developer_dao'
                  image='https://avatars.githubusercontent.com/u/90118409?s=400&u=bffc7ed9ade602d5eefff4d98be7ac01635303bc&v=4'
                />
                <DAOCard
                  name='GitcoinDAO'
                  link='https://twitter.com/gitcoindao'
                  image='https://pbs.twimg.com/profile_images/1461730414146564100/BtBfgjFa_400x400.jpg'
                />
              </SimpleGrid>
            </VStack>

            <Divider />

            <VStack>
              <Heading as='h3' size='md'>
                Contracts I&apos;ve deployed
              </Heading>

              <SimpleGrid spacing={4} columns={3}>
                <ContractCard
                  name='Devs4Revolution'
                  link='https://etherscan.io/address/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
                  address='0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
                />
                <ContractCard
                  name='Greeter'
                  link='https://etherscan.io/address/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
                  address='0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
                />
                <ContractCard
                  name='PayParty'
                  link='https://etherscan.io/address/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
                  address='0x25ed58c027921e14d86380ea2646e3a1b5c55a8b'
                />
              </SimpleGrid>
            </VStack>

            {/* TODO: Add NFTs section */}
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
