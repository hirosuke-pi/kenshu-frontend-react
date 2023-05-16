import { Center, Flex, Text, Spinner } from "@chakra-ui/react";
import { CustomCard } from "../molecules";
import { useCardList } from "../hooks/CardListHooks";
import { WarningTwoIcon } from "@chakra-ui/icons";

const CardList = () => {
  return (
    <Center background={"gray.100"} mt={20} rounded={10}>
      <Flex mt={30} mb={30} justifyContent="flex-start" wrap="wrap">
        <CreateCardList />
      </Flex>
    </Center>
  );
};

/**
 * カードリストを作成する
 * 成功 -> タスクリストを表示
 * 読み込み中 -> スピナーを表示
 * 失敗 -> エラーを表示
 * @returns 状態のエレメント
 */
const CreateCardList = (): JSX.Element => {
  const { status, tasks, error } = useCardList();

  return (
    <>
      {status === "loading" && (
        <>
          <Spinner mr={10} /> データを取得中...
        </>
      )}
      {status === "error" && (
        <>
          <WarningTwoIcon mt={3} mr={5} />
          <Text>データの取得に失敗しました。 ({error})</Text>
        </>
      )}
      {status === "success" &&
        tasks.map((task) => <CustomCard task={task} key={task.id} />)}
    </>
  );
};

export default CardList;
