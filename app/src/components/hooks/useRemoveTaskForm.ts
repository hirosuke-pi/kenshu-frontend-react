import { useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "./";
import { taskQuery, toast } from "../../lib";

interface RemoveTaskFormHookProps {
  task: Task;
}

interface DeleteTaskProps {
  id: string;
}

export const useRemoveTaskForm = ({ task }: RemoveTaskFormHookProps) => {
  const queryClient = useQueryClient();
  const { showToast } = toast.useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const removeTaskMutate = useMutation(deleteTask, {
    onSuccess: (result) => {
      console.log(result);

      showToast("success", {
        title: `タスク「${task.title}」を削除しました。`,
      });
      taskQuery.removeTaskCache(queryClient, task.id);
    },
    onError: (error) => {
      console.error((error as any).response);
      showToast("error", {
        title: `タスク「${task.title}」の削除時にエラーが発生しました。`,
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
