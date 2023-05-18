import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Center, Flex, Text, Spinner } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

import { CustomCard } from "../molecules";
import { useCreateCardList } from "../hooks";

const CardList = () => {
  return (
    <Center background={"gray.100"} mt={20} rounded={10}>
      <Flex mt={30} mb={30} justifyContent="center" wrap="wrap">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <CreateCardList />
          </Suspense>
        </ErrorBoundary>
      </Flex>
    </Center>
  );
};

const CreateCardList = (): JSX.Element => {
  const { values } = useCreateCardList();

  return (
    <>
      {values.tasks.map((task) => (
        <CustomCard task={task} key={task.id} />
      ))}
    </>
  );
};

const LoadingFallback = (): JSX.Element => {
  return (
    <>
      <Spinner mr={10} />
      データを取得中...
    </>
  );
};

const ErrorFallback = ({ error }: FallbackProps): JSX.Element => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <WarningTwoIcon mr={5} />
      <Text>データの取得に失敗しました。 ({error.message})</Text>
    </Flex>
  );
};

export default CardList;
