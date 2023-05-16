import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Alert,
  AlertIcon,
  useToast,
  AlertDescription,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, CalendarIcon } from "@chakra-ui/icons";
import { useTaskCreation } from "../hooks/TaskCreationHooks";

const CreateTaskModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();
  const { actions, values } = useTaskCreation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <CalendarIcon mr={5} mb={3} />
          タスク作成
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={values.status === "validationError"}>
            <FormLabel>タスク名</FormLabel>
            <Input
              type="text"
              onChange={(event) => actions.setTaskName(event.target.value)}
            />
            <FormErrorMessage>タスク名は必須です</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            width="100%"
          >
            <Button
              width="100%"
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (values.taskName === "") {
                  return;
                }
                actions.setStatus("loading");
                actions.onSubmit({
                  taskName: values.taskName,
                  responseEvent: (isSuccess) => {
                    if (!isSuccess) {
                      actions.setStatus("responseError");
                      return;
                    }

                    actions.setStatus("success");
                    toast({
                      description: "タスクを登録しました",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    onClose();
                  },
                });
              }}
            >
              {values.status === "loading" ? (
                <>
                  <Spinner mr={5} /> 登録中...
                </>
              ) : (
                <>
                  <AddIcon mr={5} />
                  新規作成
                </>
              )}
            </Button>
            {values.status === "responseError" && (
              <Alert status="error" mt={10}>
                <AlertIcon />
                <AlertDescription>タスク登録に失敗しました。</AlertDescription>
              </Alert>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTaskModal;
