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
} from "@chakra-ui/react";
import {
  CheckIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";

import taskImage from "../../public/images/task.jpg";
import { Task } from "../hooks/CardListHooks";
import { useEditTaskForm } from "../hooks/TaskEditHooks";
import { TaskFormModal } from "../organisms";

const CustomCard = ({ task }: { task: Task }): JSX.Element => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { actions, values } = useEditTaskForm();

  const onSubmit = (taskName: string) => {
    if (taskName === "") {
      actions.setStatus("validationError");
      return;
    }
    actions.setStatus("loading");

    actions
      .patchTask({
        id: task.id,
        taskName,
      })
      .then((response) => {
        console.log(response.body);
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        actions.setModalVisible(false);
        actions.setStatus("success");
        toast({
          title: "タスクを編集しました",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error.response);
        actions.setStatus("responseError");
      });
  };

  return (
    <Card maxW={300} maxH={500} m={10} overflow={"hidden"}>
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
        <Text>{moment(task.createdAt).format("YYYY年MM月DD日 HH:mm:ss")}</Text>
      </CardBody>
      <Center>
        <Divider w="90%" />
      </Center>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <IconButton
            colorScheme="green"
            variant="outline"
            aria-label="Task Done"
            icon={<CheckIcon />}
          />
          <Box>
            <IconButton
              mr={10}
              colorScheme="blue"
              aria-label="Task Edit"
              icon={<EditIcon />}
              onClick={() => actions.setModalVisible(true)}
            />
            <IconButton
              colorScheme="red"
              aria-label="Task Remove"
              icon={<DeleteIcon />}
            />
            <TaskFormModal
              isOpen={values.modalVisible}
              modalTitle="タスクを編集"
              status={values.status}
              defaultValue={task.title}
              onClose={() => actions.setModalVisible(false)}
              onSubmit={onSubmit}
            />
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
