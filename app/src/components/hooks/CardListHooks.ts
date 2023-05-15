import { useQuery } from "react-query";

export interface Task {
  id: string;
  title: string;
  createdAt: string;
  finishedAt: string | null;
}

export const useCardList = () => {
  const { status, data, error } = useQuery("tasks", fetchTasks);
  console.log(status, data, error);

  return { status, data, error: error as any };
};

const fetchTasks = async () => {
  const res = await fetch("http://localhost:8000/api/tasks");
  return res.json();
};
