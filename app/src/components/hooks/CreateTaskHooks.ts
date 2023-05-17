import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import { taskQuery } from "../../lib";
import { FormStatus } from "../organisms";

interface PostTaskProps {
  taskName: string;
}

export const useCreateTaskForm = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const onPostTask = (taskName: string) => {
    if (taskName === "") {
      setStatus("validationError");
      return;
    }
    setStatus("loading");

    postTask({
      taskName,
    })
      .then((response) => {
        console.log(response.body);
        taskQuery.taskiInvalidateQueries(queryClient);

        setModalVisible(false);
        setStatus("success");
        toast({
          title: "タスクを作成しました",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        setStatus("responseError");
      });
  };

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

const postTask = async ({ taskName }: PostTaskProps): Promise<Response> => {
  return fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskName }),
  });
};
