//custom hooks to manage the todo data query

import { useQuery } from "@tanstack/react-query";

const fetchTodos = async (page = 1) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const response = await fetch(
    `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useTodos = (page) => {
  return useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page),
    keepPreviousData: true,
  });
};
