import { getTruncatedAddress } from '@/utils';
import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface ContractCardProps {
  name: string;
  link: string;
  address: string;
}

export const ContractCard: FC<ContractCardProps> = ({
  name,
  link,
  address,
}) => {
  return (
    <Box
      as='a'
      p='4'
      shadow='sm'
      rounded='md'
      borderColor='gray.50'
      borderWidth='thin'
      href={link}
      target='_blank'
    >
      <Text fontWeight='bold'>{name}</Text>
      <Text>{getTruncatedAddress(address)}</Text>
    </Box>
  );
};
