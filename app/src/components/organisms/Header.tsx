import { Heading, Divider, Center, Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box mt={100}>
      <Center>
        <Heading as="h1" size="3xl">
          My Task List
        </Heading>
      </Center>
      <Center mt={20}>
        <Divider />
      </Center>
    </Box>
  );
};

export default Header;
