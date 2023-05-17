import { useQuery } from "@tanstack/react-query";

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  finishedAt?: string | null;
}

export const useCreateCardList = () => {
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  return {
    actions: {},
    values: {
      tasks: data?.tasks as Task[] | undefined,
    },
  };
};

const fetchTasks = async () => {
  const res = await fetch("http://localhost:8000/api/tasks");
  return res.json();
};
