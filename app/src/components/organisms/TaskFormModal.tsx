import { useState } from "react";
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
import { EditIcon, CalendarIcon } from "@chakra-ui/icons";

export type FormStatus =
  | "idle"
  | "loading"
  | "success"
  | "responseError"
  | "validationError";

const TaskFormModal = ({
  isOpen,
  modalTitle,
  status,
  defaultValue = "",
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  modalTitle: string;
  status: FormStatus;
  defaultValue?: string;
  onClose: () => void;
  onSubmit: (taskName: string) => void;
}) => {
  const [taskName, setTaskName] = useState(defaultValue);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <CalendarIcon mr={5} mb={3} />
          {modalTitle}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={status === "validationError"}>
            <FormLabel>タスク名</FormLabel>
            <Input
              type="text"
              defaultValue={defaultValue}
              onChange={(event) => setTaskName(event.target.value)}
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
                onSubmit(taskName);
                setTaskName("");
              }}
            >
              {status === "loading" ? (
                <>
                  <Spinner mr={5} /> 送信中...
                </>
              ) : (
                <>
                  <EditIcon mr={5} mb={3} />
                  タスクを登録
                </>
              )}
            </Button>
            {status === "responseError" && (
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

export default TaskFormModal;
