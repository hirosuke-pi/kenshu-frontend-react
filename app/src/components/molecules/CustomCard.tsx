import {
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  IconButton,
  Image,
  Divider,
  Center,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import taskImage from "../../public/images/task.jpg";

const CustomCard = () => {
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
        <Heading size="md">今日のタスク1</Heading>
        <Text mt={10}>作成日時: 2023/5/15</Text>
      </CardBody>
      <Center>
        <Divider w="90%" />
      </Center>
      <CardFooter>
        <IconButton
          colorScheme="green"
          variant="outline"
          aria-label="Send email"
          icon={<CheckIcon />}
        />
      </CardFooter>
    </Card>
  );
};

export default CustomCard;