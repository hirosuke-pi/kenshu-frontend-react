import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "./";
import { customToast, taskQuery } from "../../lib";

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

      customToast.successToast(
        toast,
        `タスク「${task.title}」を削除しました。`
      );
      taskQuery.removeTaskCache(queryClient, task.id);
    },
    onError: (error) => {
      console.error((error as any).response);
      customToast.errorToast(
        toast,
        `タスク「${task.title}」の削除時にエラーが発生しました。`
      );
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
