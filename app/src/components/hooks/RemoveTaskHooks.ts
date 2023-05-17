import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const removeTaskMutate = useMutation(deleteTask, {
    onSuccess: (result) => {
      console.log(result);

      toast({
        title: `タスク「${task.title}」を削除しました。`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      taskQuery.removeTaskCache(queryClient, task.id);
    },
    onError: (error) => {
      console.error((error as any).response);
      toast({
        title: "タスク削除中にエラーが発生しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onTaskRemove = () => {
    onClose();
    removeTaskMutate.mutate({ id: task.id });
  };

  return {
    actions: {
      onOpen,
      onClose,
      deleteTask,
      onTaskRemove,
    },
    values: {
      isOpen,
    },
  };
};

const deleteTask = async ({ id }: DeleteTaskProps): Promise<Response> => {
  return fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "DELETE",
  });
};
