import { Center, Flex } from "@chakra-ui/react";
import { CustomCard } from "../molecules";

const CardList = () => {
  return (
    <Center>
      <Flex width="80%" mt={30} justifyContent="flex-start" wrap="wrap">
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </Flex>
    </Center>
  );
};

export default CardList;
