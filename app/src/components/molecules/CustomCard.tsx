import {
  Heading,
  Card,
  Box,
  CardBody,
  CardFooter,
  Text,
  IconButton,
  Image,
  Divider,
  Center,
  Flex,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import {
  CheckIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";

import taskImage from "../../public/images/task.jpg";
import { Task } from "../hooks/CardListHooks";
import { useEditTaskForm } from "../hooks/TaskEditHooks";
import { TaskFormModal, ConfilmDialog } from "../organisms";
import { getDatetimeJp } from "../../lib/datetime";
import { useRemoveTaskForm } from "../hooks/RemoveTaskHooks";

const CustomCard = ({ task }: { task: Task }): JSX.Element => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const editProps = useEditTaskForm();
  const removeProps = useRemoveTaskForm();

  const onSubmit = (taskName: string) => {
    if (taskName === "") {
      editProps.actions.setStatus("validationError");
      return;
    }
    editProps.actions.setStatus("loading");

    editProps.actions
      .patchTask({
        id: task.id,
        taskName,
        finishedAt: task.finishedAt,
      })
      .then((response) => {
        console.log(response.body);
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        editProps.actions.setModalVisible(false);
        editProps.actions.setStatus("success");
        toast({
          title: "タスクを編集しました",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        editProps.actions.setStatus("responseError");
      });
  };

  const onTaskDone = () => {
    const finishedAt = task.finishedAt ? null : moment().toISOString();
    editProps.actions
      .patchTask({
        id: task.id,
        taskName: task.title,
        finishedAt,
      })
      .then((response) => {
        console.log(response.body);
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        editProps.actions.setModalVisible(false);
        editProps.actions.setStatus("success");
        toast({
          title: "タスクを更新しました。",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        toast({
          title: "タスク完了中にエラーが発生しました。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const onTaskRemove = () => {
    removeProps.actions.onClose();
    removeProps.actions
      .deleteTask(task.id)
      .then((response) => {
        console.log(response.body);
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        toast({
          title: `タスク「${task.title}」を削除しました。`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        toast({
          title: "タスク削除中にエラーが発生しました。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Card maxW={300} maxH={500} m={10} overflow={"hidden"}>
      {task.finishedAt && (
        <Flex
          pos="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="blackAlpha.300"
          justifyContent="center"
        >
          <Heading color="white" size="3xl" mt={50}>
            <Tooltip
              label={`タスク完了: ${getDatetimeJp(task.finishedAt)}`}
              aria-label="A tooltip"
            >
              <CheckCircleIcon />
            </Tooltip>
          </Heading>
        </Flex>
      )}
      <Image
        width={300}
        maxH={170}
        objectFit="cover"
        src={taskImage}
        alt="Task Image"
      />
      <CardBody>
        <Heading size="md">
          <CalendarIcon mb={3} mr={3} /> {task.title}
        </Heading>
        <Text mt={10}>作成日時:</Text>
        <Text>{getDatetimeJp(task.createdAt)}</Text>
      </CardBody>
      <Center>
        <Divider w="90%" />
      </Center>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <IconButton
            colorScheme="green"
            variant={task.finishedAt ? "solid" : "outline"}
            aria-label="Task Done"
            onClick={onTaskDone}
            icon={<CheckIcon />}
          />
          <Box>
            <IconButton
              mr={10}
              colorScheme="blue"
              aria-label="Task Edit"
              icon={<EditIcon />}
              onClick={() => editProps.actions.setModalVisible(true)}
            />
            <TaskFormModal
              isOpen={editProps.values.modalVisible}
              modalTitle="タスクを編集"
              status={editProps.values.status}
              defaultValue={task.title}
              onClose={() => editProps.actions.setModalVisible(false)}
              onSubmit={onSubmit}
            />
            <IconButton
              colorScheme="red"
              aria-label="Task Remove"
              icon={<DeleteIcon />}
              onClick={removeProps.actions.onOpen}
            />
            <ConfilmDialog
              isOpen={removeProps.values.isOpen}
              onClose={removeProps.actions.onClose}
              onRemove={onTaskRemove}
              taskName={task.title}
            />
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
