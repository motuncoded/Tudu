import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchTodo, fetchTodos, updateTodo, createTodo } from "../api/todos";



// Define types
interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  createdAt: string;
  userId: string;
  isLocal?: boolean;
}

interface TodoInput {
  title: string;
}
export const useTodos = (
  page: number, 
  statusFilter: string = "all", 
  searchTerm: string = ""
) => {
  return useQuery({
    queryKey: ["todos", page, statusFilter, searchTerm],
    queryFn: () => fetchTodos(page, statusFilter, searchTerm),
    retry: 2,
  });
};

export const useTodo = (id: string) => {
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
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// Update Todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) => 
      updateTodo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// Delete Todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn: (id: string) => {
      return fetch(`https://dummyjson.com/todos/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {                                                        
            throw new Error('Network response was not ok');
          }
          return res.json();
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });   
};