import { Heading, Divider, Center } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Center mt={100}>
        <Heading as="h1" size="3xl">
          My Task List
        </Heading>
      </Center>
      <Center mt={20}>
        <Divider />
      </Center>
    </>
  );
};

export default Header;
