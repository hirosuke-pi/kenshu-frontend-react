export const successToast = (toast: any, title: string) => {
  return toast({
    title,
    status: "success",
    duration: 3000,
    isClosable: true,
  });
};

export const errorToast = (toast: any, title: string) => {
  return toast({
    title,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};
