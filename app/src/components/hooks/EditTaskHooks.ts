import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import moment from "moment";

import { taskQuery } from "../../lib";
import { Task } from ".";
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

  const onTaskEdit = (taskName: string) => {
    if (taskName === "") {
      setStatus("validationError");
      return;
    }
    setStatus("loading");

    patchTask({
      taskName,
      id: task.id,
      finishedAt: task.finishedAt,
    })
      .then((response) => {
        console.log(response.body);
        taskQuery.taskiInvalidateQueries(queryClient);

        setModalVisible(false);
        setStatus("success");
        toast({
          title: "タスクを編集しました",
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

  const onTaskDone = () => {
    patchTask({
      taskName: task.title,
      id: task.id,
      finishedAt: task.finishedAt ? null : moment().toISOString(),
    })
      .then((response) => {
        console.log(response.body);
        taskQuery.taskiInvalidateQueries(queryClient);

        setModalVisible(false);
        setStatus("success");
        toast({
          title: "タスクを更新しました。",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        toast({
          title: "タスク完了中にエラーが発生しました。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

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

const patchTask = async (props: PatchTaskProps): Promise<Response> => {
  return fetch(`http://localhost:8000/api/tasks/${props.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: props.taskName,
      finishedAt: props.finishedAt,
    }),
  });
};
