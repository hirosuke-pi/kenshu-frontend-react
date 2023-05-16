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
} from "@chakra-ui/react";
import {
  CheckIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import moment from "moment";

import taskImage from "../../public/images/task.jpg";
import { Task } from "../hooks/CardListHooks";

const CustomCard = ({ task }: { task: Task }): JSX.Element => {
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
            />
            <IconButton
              colorScheme="red"
              aria-label="Task Remove"
              icon={<DeleteIcon />}
            />
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
