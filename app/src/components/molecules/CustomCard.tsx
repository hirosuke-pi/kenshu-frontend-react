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

import { useEditTaskForm, useRemoveTaskForm, Task } from "../hooks";
import { TaskFormModal } from "../organisms";
import { datetime } from "../../lib";
import { TaskDeletionConfirmDialog } from ".";

import taskImage from "../../public/images/task.jpg";

const CustomCard = ({ task }: { task: Task }): JSX.Element => {
  const editTaskForm = useEditTaskForm({ task });
  const removeTaskForm = useRemoveTaskForm({ task });

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
              label={`タスク完了: ${datetime.getDatetimeJp(task.finishedAt)}`}
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
        <Text>{datetime.getDatetimeJp(task.createdAt)}</Text>
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
            onClick={editTaskForm.actions.onTaskDone}
            icon={<CheckIcon />}
          />
          <Box>
            <IconButton
              mr={10}
              colorScheme="blue"
              aria-label="Task Edit"
              icon={<EditIcon />}
              onClick={() => editTaskForm.actions.setModalVisible(true)}
            />
            <TaskFormModal
              isOpen={editTaskForm.values.modalVisible}
              modalTitle="タスクを編集"
              status={editTaskForm.values.status}
              defaultValue={task.title}
              onClose={() => editTaskForm.actions.setModalVisible(false)}
              onSubmit={editTaskForm.actions.onTaskEdit}
              setStatus={editTaskForm.actions.setStatus}
            />
            <IconButton
              colorScheme="red"
              aria-label="Task Remove"
              icon={<DeleteIcon />}
              onClick={removeTaskForm.actions.onOpen}
            />
            <TaskDeletionConfirmDialog
              isOpen={removeTaskForm.values.isOpen}
              onClose={removeTaskForm.actions.onClose}
              onRemove={removeTaskForm.actions.onTaskRemove}
              taskName={task.title}
            />
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
