import { useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { TaskFormModal } from "./";
import { useCreateTaskForm } from "../hooks/useCreateTaskForm";

const Navigation = () => {
  const { actions, values } = useCreateTaskForm();

  return (
    <Flex width="100%" justifyContent="flex-end" mt={10}>
      <Button colorScheme="blue" onClick={() => actions.setModalVisible(true)}>
        <AddIcon mr={5} mb={3} /> タスク作成
      </Button>
      <TaskFormModal
        isOpen={values.modalVisible}
        modalTitle="タスクを新規作成"
        onClose={() => actions.setModalVisible(false)}
        onSubmit={actions.onPostTask}
        isError={values.isError}
        isLoading={values.isLoading}
      />
    </Flex>
  );
};

export default Navigation;
