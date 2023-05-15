import { Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Navigation = () => {
  return (
    <Flex width="100%" justifyContent="flex-end" mt={10}>
      <Button colorScheme="blue">
        <AddIcon mr={5} mb={3} /> タスク追加
      </Button>
    </Flex>
  );
};

export default Navigation;
