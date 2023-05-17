import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import { FormStatus } from "../organisms";
import { TaskResponse } from "./";
import { taskQuery } from "../../lib";

interface PostTaskProps {
  taskName: string;
}

export const useCreateTaskForm = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const createTaskMutate = useMutation(postTask, {
    onSuccess: (result) => {
      console.log(result);

      setModalVisible(false);
      setStatus("success");
      toast({
        title: "タスクを作成しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      taskQuery.setTaskCache(queryClient, result.task);
    },
    onError: (error) => {
      console.error(error);
      setStatus("responseError");
    },
  });

  const onPostTask = (taskName: string) =>
    createTaskMutate.mutate({ taskName });

  return {
    actions: {
      setModalVisible,
      setStatus,
      postTask,
      onPostTask,
    },
    values: {
      modalVisible,
      status,
    },
  };
};

const postTask = async ({ taskName }: PostTaskProps): Promise<TaskResponse> => {
  const response = await fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskName }),
  });

  return response.json();
};
