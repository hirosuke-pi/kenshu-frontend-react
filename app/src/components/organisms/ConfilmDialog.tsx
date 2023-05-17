import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

const ConfilmDialog = ({
  isOpen,
  taskName,
  onClose,
  onRemove,
}: {
  isOpen: boolean;
  taskName: string;
  onClose: any;
  onRemove: any;
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <WarningIcon mb={3} mr={5} />
            タスクを削除
          </AlertDialogHeader>

          <AlertDialogBody>
            本当にタスク「<Text as="b">{taskName}</Text>
            」を削除してもよろしいですか？
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onRemove} ml={10}>
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfilmDialog;
