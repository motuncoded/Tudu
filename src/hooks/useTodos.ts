import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchTodo, fetchTodos, updateTodo, createTodo } from "../api/todos";

export const useTodos = (page:string, statusFilter = "all", searchTerm = "") => {
  return useQuery({
    queryKey: ["todos", page, statusFilter, searchTerm],
    queryFn: () => fetchTodos(page, statusFilter, searchTerm),
    keepPreviousData: true,
    retry: 2,
  });
};

export const useTodo = (id: string | number) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !!id,
    retry: 2,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // or ["todos"]
    },
  });
};

// update Todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown, // replace with the actual return type of updateTodo if known
    unknown,
    { id: string | number; data: any }
  >({
    mutationFn: ({ id, data }) => updateTodo(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todo", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
