import {
  Box,
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useAccount, useConnect } from "wagmi";

export const ConnectWalletButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (accountData) {
    return (
      <Box>
        <Button onClick={disconnect}>
          {accountData.ens?.name
            ? accountData.ens?.name
            : accountData.address.slice(0, 6) +
              "..." +
              accountData.address.slice(-4)}
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button onClick={onOpen}>Connect</Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid p={3} gap={5} templateColumns="repeat(1, 1fr)">
              {data.connectors.map((x) => (
                <Button
                  width="full"
                  backgroundColor="#2c2c2c"
                  textColor="white"
                  height="4rem"
                  fontSize="2rem"
                  type="submit"
                  disabled={!x.ready}
                  key={x.id}
                  onClick={async () => {
                    await connect(x);
                    onClose();
                  }}
                >
                  {x.name}
                  {!x.ready && " (unsupported)"}
                </Button>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>

      {error && (
        <Box color="red.600">{error?.message ?? "Failed to connect"}</Box>
      )}
    </Box>
  );
};
