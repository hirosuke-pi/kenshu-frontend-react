import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import { FormStatus } from "../organisms";
import { TaskResponse } from "./";
import { customToast, taskQuery } from "../../lib";

interface PostTaskProps {
  taskName: string;
}

export const useCreateTaskForm = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);

  const createTaskMutation = useMutation(postTask, {
    onSuccess: (result) => {
      console.log(result);

      setModalVisible(false);
      customToast.successToast(toast, "タスクを作成しました");

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
