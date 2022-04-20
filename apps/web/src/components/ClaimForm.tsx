import { Flex, VStack, Input, InputGroup, Heading, Button, Box, Spinner, Text } from '@chakra-ui/react'
import { useState, useRef } from 'react'

export const ClaimForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [domain, setDomain] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const domainRef = useRef(null);

  const handleClick = () => {
    setIsLoading(true)
    const domain = domainRef.current.value;
    if (domain.length < 3) {
      setErrorMsg('Domain must be more than 3 characters long')
      setIsInvalid(true);
    }
    else if (list.includes(domain)) {
      setErrorMsg('Domain not available')
      setIsInvalid(true);
    }
    else {
      setIsInvalid(false);
      setErrorMsg('');
      setDomain(domain);
    }
    setIsLoading(false)
  }

  return (
    <VStack gap={10} pt={[10, '0']}>
      <Heading fontSize={['2xl', '5xl']} fontWeight="bold">claim your .devdao domain</Heading>
      <Flex>
        <InputGroup size='lg' w={['60vw', '40vw']}>
          <Input ref={domainRef} placeholder='Search for .devdao'
            borderColor={isInvalid ? 'red.300' : 'gray.200'} />
        </InputGroup>
        <Button mx={2} onClick={handleClick} boxShadow='0px 0px 7px #a5a5a5' size='lg' bg='none' border='1px solid' borderColor='gray.200'>Search</Button>
      </Flex>
      <Box>
        {errorMsg && <Text fontSize='2xl' color='red.500'>{errorMsg}</Text>}
        {isLoading && <Spinner />}
        {errorMsg.length == 0 && (
          <Flex gap='2rem'>
            <Text fontSize='2xl' color='green.500'>{domain}.devdao</Text>
            <Button bg='none' border='1px solid' borderColor='gray.200'
              boxShadow='0px 0px 7px #a5a5a5'>claim</Button>
          </Flex>
        )}
      </Box>
    </VStack>
  )
}

// this is placeholder
const list = [
  'dhaiwat',
  'cachemonet',
  'pbillingsby',
  'ropats16'
]