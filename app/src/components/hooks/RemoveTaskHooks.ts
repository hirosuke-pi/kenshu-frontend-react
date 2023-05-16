import { useDisclosure } from "@chakra-ui/react";

export const useRemoveTaskForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    actions: {
      onOpen,
      onClose,
      deleteTask,
    },
    values: {
      isOpen,
    },
  };
};

const deleteTask = async (id: string): Promise<Response> => {
  return fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
