import { useState } from "react";
import axios from "axios";
export interface Task {
  id: string;
  title: string;
  createdAt: string;
  finishedAt: string | null;
}

export const useTaskCreation = () => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState(
    "idle" as
      | "idle"
      | "loading"
      | "success"
      | "responseError"
      | "validationError"
  );

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
  axios
    .post("http://localhost:8000/api/tasks", {
      title: taskName,
    })
    .then((res) => {
      console.log(res.data);
      responseEvent(true);
    })
    .catch((err) => {
      console.error(err.response);
      responseEvent(false);
    });
};
