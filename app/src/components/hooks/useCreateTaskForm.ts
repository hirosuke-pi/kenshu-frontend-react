import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TaskResponse } from "./";
import { taskQuery } from "../../lib";
import { toast } from "../../lib";

interface PostTaskProps {
  taskName: string;
}

export const useCreateTaskForm = () => {
  const queryClient = useQueryClient();
  const { showToast } = toast.useToast();
  const [modalVisible, setModalVisible] = useState(false);

  const createTaskMutation = useMutation(postTask, {
    onSuccess: (result) => {
      console.log(result);

      setModalVisible(false);
      showToast("success", { title: "タスクを作成しました" });

      taskQuery.setTaskCache(queryClient, result.task);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onPostTask = (taskName: string) =>
    createTaskMutation.mutate({ taskName });

  return {
    actions: {
      setModalVisible,
      postTask,
      onPostTask,
    },
    values: {
      modalVisible,
      isLoading: createTaskMutation.isLoading,
      isError: createTaskMutation.isError,
    },
  };
};

const postTask = async ({ taskName }: PostTaskProps): Promise<TaskResponse> => {
  return fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskName }),
  }).then((response) => response.json());
};
