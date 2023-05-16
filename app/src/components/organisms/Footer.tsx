import { Text, Divider, Center, Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box mb={50}>
      <Center mt={20}>
        <Divider />
      </Center>
      <Center mt={20}>
        <Text fontSize="md">hirosuke-pi</Text>
      </Center>
    </Box>
  );
};

export default Footer;
