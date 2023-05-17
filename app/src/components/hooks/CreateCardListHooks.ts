import { useQuery } from "@tanstack/react-query";

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  finishedAt?: string | null;
}

export const useCreateCardList = () => {
  const { status, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  return {
    actions: {},
    values: {
      status,
      tasks: data?.tasks as Task[] | undefined,
      error: (error as any)?.message as string | undefined,
    },
  };
};

const fetchTasks = async () => {
  const res = await fetch("http://localhost:8000/api/tasks");
  return res.json();
};