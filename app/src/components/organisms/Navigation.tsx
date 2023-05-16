import { useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { TaskFormModal } from "./";
import { useCreateTaskForm } from "../hooks/TaskCreationHooks";
import { useQueryClient } from "@tanstack/react-query";

const Navigation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { actions, values } = useCreateTaskForm();

  const onSubmit = (taskName: string) => {
    if (taskName === "") {
      actions.setStatus("validationError");
      return;
    }
    actions.setStatus("loading");

    actions
      .postTask({
        taskName,
      })
      .then((response) => {
        console.log(response.body);
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        actions.setModalVisible(false);
        actions.setStatus("success");
        toast({
          title: "タスクを作成しました",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        actions.setStatus("responseError");
      });
  };

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
        onSubmit={onSubmit}
      />
    </Flex>
  );
};

export default Navigation;
