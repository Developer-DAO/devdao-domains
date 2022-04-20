import { useRouter } from 'next/router';

import { FaTwitter, FaGithub } from 'react-icons/fa';
import { Center, Button } from '@chakra-ui/react';

export const Footer = () => {
  const router = useRouter();
  return (
    <Center>
      <Button
        bg='none'
        onClick={() => router.push('https://twitter.com/developer_dao')}
      >
        <FaTwitter />
      </Button>
      <Button
        bg='none'
        onClick={() =>
          router.push('https://github.com/Developer-DAO/devdao-domains')
        }
      >
        <FaGithub />
      </Button>
    </Center>
  )
}