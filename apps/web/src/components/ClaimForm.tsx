import { Flex, Input, InputGroup, Button, Box, Spinner, Text } from '@chakra-ui/react'
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
    else {
      setIsInvalid(false)
      setErrorMsg('')

      debugger
      setDomain(domain)
      setIsLoading(false)
    }
  }

  return (
    <>
    <Flex>
      <InputGroup size='lg' w='40vw'>
        <Input ref={domainRef} placeholder='Search for .devdao'
          borderColor={isInvalid ? 'red.300' : 'gray.200'} />
      </InputGroup>
      <Button mx={2} onClick={handleClick} size='lg' bg='none' border='1px solid' borderColor='gray.200'>Search</Button>
    </Flex>
    <Box>
      {errorMsg && <Text color='red.500'>{errorMsg}</Text>}
      {isLoading && !errorMsg.length > 0 && <Spinner />}
      {}
    </Box>
    </>
  )
}