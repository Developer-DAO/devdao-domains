import { Text, VStack, Image } from '@chakra-ui/react';
import { FC } from 'react';

interface NFTCardProps {
    link: string;
    image: string;
    collection: string;
    name: string;
}

export const NFTCard: FC<NFTCardProps> = ({
    link,
    image,
    name,
    collection,
  }) => {
      return (
        <VStack 
            as='a' 
            p='5'
            shadow='md'
            rounded='md'
            borderColor='gray.50'
            borderWidth='thin'
            href={link} 
            target='_blank'
        >
        <Image src={image} alt={name} width='2xs' rounded='md' />
        <Text fontWeight='bold' fontSize='sm' color='gray.400' alignSelf='flex-start' lineHeight='5'>{collection}</Text>
        <Text fontWeight='bold' alignSelf='flex-start' lineHeight='5'w='60'>{name}</Text>
      </VStack>
      );
  };