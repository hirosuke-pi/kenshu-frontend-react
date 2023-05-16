import { useState } from "react";
import { FormStatus } from "../organisms/TaskFormModal";

export const useCreateTaskForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  return {
    actions: {
      setModalVisible,
      setStatus,
      postTask,
    },
    values: {
      modalVisible,
      status,
    },
  };
};

const postTask = async ({
  taskName,
}: {
  taskName: string;
}): Promise<Response> => {
  return fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskName }),
  });
};
