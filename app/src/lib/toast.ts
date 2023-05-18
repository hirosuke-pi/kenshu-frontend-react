import { useToast as useChakraToast, UseToastOptions } from "@chakra-ui/react";
import { useCallback } from "react";

const durations = {
  success: 3000,
  error: 5000,
};

export const useToast = () => {
  const toast = useChakraToast();

  const showToast = useCallback(
    (status: "success" | "error", options: Omit<UseToastOptions, "status">) =>
      toast({
        status,
        duration: durations[status],
        isClosable: true,
        ...options,
      }),
    []
  );

  return { showToast };
};
