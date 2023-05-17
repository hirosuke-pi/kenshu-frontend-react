import { useDisclosure, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import { Task } from "./";
import { taskQuery } from "../../lib";

interface RemoveTaskFormHookProps {
  task: Task;
}

interface DeleteTaskProps {
  id: string;
}

export const useRemoveTaskForm = ({ task }: RemoveTaskFormHookProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTaskRemove = () => {
    onClose();
    deleteTask({ id: task.id })
      .then((response) => {
        console.log(response.body);
        taskQuery.taskiInvalidateQueries(queryClient);

        toast({
          title: `タスク「${task.title}」を削除しました。`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        toast({
          title: "タスク削除中にエラーが発生しました。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return {
    actions: {
      onOpen,
      onClose,
      deleteTask,
      toast,
      onTaskRemove,
    },
    values: {
      isOpen,
      queryClient,
    },
  };
};

const deleteTask = async ({ id }: DeleteTaskProps): Promise<Response> => {
  return fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "DELETE",
  });
};
