import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import moment from "moment";

import { taskQuery } from "../../lib";
import { Task, TaskResponse } from ".";
import { FormStatus } from "../organisms";

interface PatchTaskProps {
  id: string;
  taskName: string;
  finishedAt?: string;
}

interface TaskEditHookProps {
  task: Task;
}

export const useEditTaskForm = ({ task }: TaskEditHookProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const taskEditMutate = useMutation(patchTask, {
    onSuccess: (result) => {
      console.log(result);
      setStatus("success");

      setModalVisible(false);
      setStatus("success");
      toast({
        title: "タスクを編集しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      taskQuery.updateTaskCache(queryClient, result.task);
    },
    onError: (error) => {
      console.error(error);
      setStatus("responseError");
    },
  });
  const taskDoneMutate = useMutation(patchTask, {
    onSuccess: (result) => {
      console.log(result);

      setModalVisible(false);
      setStatus("success");
      toast({
        title: "タスクを更新しました。",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      taskQuery.updateTaskCache(queryClient, result.task);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "タスク完了中にエラーが発生しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onTaskEdit = (taskName: string) =>
    taskEditMutate.mutate({
      taskName,
      id: task.id,
      finishedAt: task.finishedAt,
    });

  const onTaskDone = () =>
    taskDoneMutate.mutate({
      taskName: task.title,
      id: task.id,
      finishedAt: task.finishedAt ? null : moment().toISOString(),
    });

  return {
    actions: {
      setModalVisible,
      setStatus,
      patchTask,
      onTaskEdit,
      onTaskDone,
    },
    values: {
      modalVisible,
      status,
    },
  };
};

const patchTask = async (props: PatchTaskProps): Promise<TaskResponse> => {
  const response = await fetch(`http://localhost:8000/api/tasks/${props.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: props.taskName,
      finishedAt: props.finishedAt,
    }),
  });

  return await response.json();
};
