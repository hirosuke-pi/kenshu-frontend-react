import { QueryClient } from "@tanstack/react-query";
import { Task, TaskResponse, TasksResponse } from "../components/hooks";

export const setTaskCache = async (
  queryClient: QueryClient,
  additionTask: Task
) => {
  queryClient.setQueryData<TasksResponse>(
    ["tasks"],
    ({ tasks }): TasksResponse => ({
      tasks: [...tasks, additionTask],
    })
  );
};

export const updateTaskCache = async (
  queryClient: QueryClient,
  additionTask: Task
) => {
  queryClient.setQueryData<TasksResponse>(
    ["tasks"],
    ({ tasks }): TasksResponse => ({
      tasks: tasks.map((task) => {
        if (task.id === additionTask.id) {
          return additionTask;
        }
        return task;
      }),
    })
  );
};

export const removeTaskCache = async (queryClient: QueryClient, id: string) => {
  queryClient.setQueryData<TasksResponse>(
    ["tasks"],
    ({ tasks }): TasksResponse => ({
      tasks: tasks.filter((task) => task.id !== id),
    })
  );
};
