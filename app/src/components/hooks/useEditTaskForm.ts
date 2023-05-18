import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import moment from "moment";

import { taskQuery, customToast } from "../../lib";
import { Task, TaskResponse } from "./";

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

  const taskEditMutation = useMutation(patchTask, {
    onSuccess: (result) => {
      console.log(result);

      setModalVisible(false);
      customToast.successToast(toast, "タスクを編集しました");

      taskQuery.updateTaskCache(queryClient, result.task);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const taskDoneMutation = useMutation(patchTask, {
    onSuccess: (result) => {
      console.log(result);

      setModalVisible(false);
      customToast.successToast(toast, "タスクを更新しました。");

      taskQuery.updateTaskCache(queryClient, result.task);
    },
    onError: (error) => {
      console.error(error);
      customToast.errorToast(toast, "タスク完了中にエラーが発生しました。");
    },
  });

  const onTaskEdit = (taskName: string) =>
    taskEditMutation.mutate({
      taskName,
      id: task.id,
      finishedAt: task.finishedAt,
    });

  const onTaskDone = () =>
    taskDoneMutation.mutate({
      taskName: task.title,
      id: task.id,
      finishedAt: task.finishedAt ? null : moment().toISOString(),
    });

  return {
    actions: {
      setModalVisible,
      patchTask,
      onTaskEdit,
      onTaskDone,
    },
    values: {
      modalVisible,
      isErrorModal: taskEditMutation.isError,
      isLoadingModal: taskEditMutation.isLoading,
    },
  };
};

const patchTask = async (props: PatchTaskProps): Promise<TaskResponse> => {
  return fetch(`http://localhost:8000/api/tasks/${props.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: props.taskName,
      finishedAt: props.finishedAt,
    }),
  }).then((response) => response.json());
};
