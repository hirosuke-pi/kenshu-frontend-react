import { useState } from "react";
import { FormStatus } from "../organisms/TaskFormModal";
import moment from "moment";

export const useEditTaskForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  return {
    actions: {
      setModalVisible,
      setStatus,
      patchTask,
    },
    values: {
      modalVisible,
      status,
    },
  };
};

const patchTask = async ({
  id,
  taskName,
  finishedAt = null,
}: {
  id: string;
  taskName: string;
  finishedAt?: string;
}): Promise<Response> => {
  return fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskName, finishedAt }),
  });
};
