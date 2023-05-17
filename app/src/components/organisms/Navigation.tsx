import { useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { TaskFormModal } from "./";
import { useCreateTaskForm } from "../hooks/CreateTaskHooks";

const Navigation = () => {
  const { actions, values } = useCreateTaskForm();

  return (
    <Flex width="100%" justifyContent="flex-end" mt={10}>
      <Button
        colorScheme="blue"
        onClick={() => {
          actions.setStatus("idle");
          actions.setModalVisible(true);
        }}
      >
        <AddIcon mr={5} mb={3} /> タスク作成
      </Button>
      <TaskFormModal
        isOpen={values.modalVisible}
        modalTitle="タスクを新規作成"
        status={values.status}
        onClose={() => actions.setModalVisible(false)}
        onSubmit={actions.onPostTask}
        setStatus={actions.setStatus}
      />
    </Flex>
  );
};

export default Navigation;
