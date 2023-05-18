import { ChangeEventHandler, useState } from "react";

interface DisplayTaskFormModalHookOptions {
  onSubmit: (taskName: string) => void;
  defaultValue?: string;
}

export const useDisplayTaskFormModal = (
  options: DisplayTaskFormModalHookOptions
) => {
  const [taskName, setTaskName] = useState(options?.defaultValue ?? "");
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const onSubmitForm = () => {
    if (taskName.length <= 0) {
      setErrorMessage("タスク名を入力してください。");
      return;
    }

    setErrorMessage(null);
    options.onSubmit(taskName);
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
