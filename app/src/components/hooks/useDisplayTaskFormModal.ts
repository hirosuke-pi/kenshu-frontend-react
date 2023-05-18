import { ChangeEventHandler, useState } from "react";

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

  const onChangeTaskName = ((e) =>
    setTaskName(e.target.value)) satisfies ChangeEventHandler<HTMLInputElement>;

  return {
    actions: {
      onChangeTaskName,
      onSubmitForm,
    },
    values: {
      taskName,
      errorMessage,
    },
  };
};
