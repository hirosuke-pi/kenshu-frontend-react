import { Center, Flex, Text, Spinner } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

import { CustomCard } from "../molecules";
import { useCreateCardList } from "../hooks";

const CardList = () => {
  return (
    <Center background={"gray.100"} mt={20} rounded={10}>
      <Flex mt={30} mb={30} justifyContent="center" wrap="wrap">
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
  const { values } = useCreateCardList();

  return (
    <>
      {values.status === "loading" && (
        <>
          <Spinner mr={10} /> データを取得中...
        </>
      )}
      {values.status === "error" && (
        <>
          <WarningTwoIcon mt={3} mr={5} />
          <Text>データの取得に失敗しました。 ({values.error})</Text>
        </>
      )}
      {values.status === "success" &&
        values.tasks.map((task) => <CustomCard task={task} key={task.id} />)}
    </>
  );
};

export default CardList;
