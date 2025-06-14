import { useQuery } from "@tanstack/react-query";
import { fetchTodo, fetchTodos } from "../api/todos";

export const useTodos = (page, statusFilter = "all", searchTerm = "") => {
  return useQuery({
    queryKey: ["todos", page, statusFilter, searchTerm],
    queryFn: () => fetchTodos(page, statusFilter, searchTerm),
    keepPreviousData: true,
    retry: 2,
  });
};

export const useTodo = (id) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !!id,
    retry: 2,
  });
};
