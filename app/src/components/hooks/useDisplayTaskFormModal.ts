import { useState } from "react";

interface DisplayTaskFormModalHookProps {
  onSubmit: (taskName: string) => void;
  defaultValue?: string;
}

export const useDisplayTaskFormModal = (
  props: DisplayTaskFormModalHookProps
) => {
  const [taskName, setTaskName] = useState(props.defaultValue ?? "");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitForm = () => {
    if (taskName === "") {
      setErrorMessage("タスク名を入力してください。");
      return;
    }

    setErrorMessage("");
    props.onSubmit(taskName);
  };

  return {
    actions: {
      setTaskName,
      onSubmitForm,
    },
    values: {
      taskName,
      errorMessage,
    },
  };
};
