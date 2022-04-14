import { Image, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

interface DAOCardProps {
  name: string;
  link: string;
  image: string;
}

export const DAOCard: FC<DAOCardProps> = ({ name, link, image }) => {
  return (
    <VStack as='a' href={link} target='_blank'>
      <Image src={image} alt={name} width='100px' rounded='full' />
      <Text fontWeight='bold'>{name}</Text>
    </VStack>
  );
};
