import { Text, Divider, Center } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Center mt={20}>
        <Divider w="80%" />
      </Center>
      <Center mt={20}>
        <Text fontSize="md">hirosuke-pi</Text>
      </Center>
    </>
  );
};

export default Footer;