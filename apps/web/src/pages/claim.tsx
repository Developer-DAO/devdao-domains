import { Heading } from '@chakra-ui/react';
import { ClaimForm } from '../components/ClaimForm'
export default function Claim() {
  return (
    <>
      <Heading fontSize="5xl" fontWeight="bold">claim your .devdao domain</Heading>
      <ClaimForm />
    </>
  )
}