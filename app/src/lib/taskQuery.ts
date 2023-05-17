import { QueryClient } from "@tanstack/react-query";

/**
 * タスクリストのキャッシュを有効期限切れにし、再取得する
 * @param queryClient Query hookのクライアント
 * @returns
 */
export const taskiInvalidateQueries = async (queryClient: QueryClient) => {
  return queryClient.invalidateQueries({
    queryKey: ["tasks"],
    exact: true,
  });
};
