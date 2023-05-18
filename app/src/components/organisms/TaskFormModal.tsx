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
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { EditIcon, CalendarIcon } from "@chakra-ui/icons";
import { useDisplayTaskFormModal } from "../hooks";

const TaskFormModal = ({
  isOpen,
  modalTitle,
  isError,
  isLoading,
  defaultValue = "",
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  modalTitle: string;
  isError: boolean;
  isLoading: boolean;
  defaultValue?: string;
  onClose: () => void;
  onSubmit: (taskName: string) => void;
}) => {
  const { actions, values } = useDisplayTaskFormModal({
    defaultValue,
    onSubmit,
  });

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
          <FormControl isInvalid={values.errorMessage !== ""}>
            <FormLabel>タスク名</FormLabel>
            <Input
              type="text"
              defaultValue={values.taskName}
              onChange={(event) => actions.setTaskName(event.target.value)}
            />
            <FormErrorMessage>{values.errorMessage}</FormErrorMessage>
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
              onClick={actions.onSubmitForm}
            >
              {isLoading ? <LoadingSpinner /> : <TaskPushText />}
            </Button>
            {isError && (
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

const LoadingSpinner = (): JSX.Element => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Spinner mr={5} />
      <Text>送信中...</Text>
    </Flex>
  );
};

const TaskPushText = (): JSX.Element => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <EditIcon />
      <Text>タスクを登録</Text>
    </Flex>
  );
};

export default TaskFormModal;
