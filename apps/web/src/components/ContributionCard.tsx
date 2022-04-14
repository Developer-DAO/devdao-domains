import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface ContributionCardProps {
  repoName: string;
  commitsCount: number;
  repoLanguage: string;
  link: string;
}

export const ContributionCard: FC<ContributionCardProps> = ({
  repoName,
  commitsCount,
  repoLanguage,
  link,
}) => {
  return (
    <Box
      as='a'
      p='4'
      shadow='sm'
      rounded='md'
      borderColor='gray.50'
      borderWidth='thin'
      href={`${link}/commits/main?author=dhaiwat10`}
      target='_blank'
    >
      <Text fontWeight='bold'>{repoName}</Text>
      <Text>
        {commitsCount} commits | {repoLanguage}
      </Text>
    </Box>
  );
};
