import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FormModal } from "./";

const Navigation = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Flex width="100%" justifyContent="flex-end" mt={10}>
      <Button colorScheme="blue" onClick={() => setModalVisible(true)}>
        <AddIcon mr={5} mb={3} /> タスク追加
      </Button>
      <FormModal isOpen={modalVisible} onClose={() => setModalVisible(false)} />
    </Flex>
  );
};

export default Navigation;
