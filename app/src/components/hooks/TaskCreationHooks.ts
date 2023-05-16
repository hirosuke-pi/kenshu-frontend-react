import { useState } from "react";
import axios from "axios";

type TaskCreationStatus =
  | "idle"
  | "loading"
  | "success"
  | "responseError"
  | "validationError";

export const useCreateTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState<TaskCreationStatus>("idle");

  return {
    actions: {
      setTaskName,
      setStatus,
      onSubmit,
    },
    values: {
      taskName,
      status,
    },
  };
};

const onSubmit = ({
  taskName,
  responseEvent,
}: {
  taskName: string;
  responseEvent: (isSuccess: boolean) => void;
}) => {
  fetch("http://localhost:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskName }),
  })
    .then((res) => {
      console.log(res);
      responseEvent(true);
    })
    .catch((err) => {
      console.error(err);
      responseEvent(false);
    });
};
