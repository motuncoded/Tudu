import { useQuery } from "@tanstack/react-query";

const fetchTodos = async (page = 1, statusFilter = "all", searchTerm = "") => {
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    // For "all" status with no search
    if (statusFilter === "all" && !searchTerm) {
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`,
      );
      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      return {
        todos: data.todos,
        total: data.total || 150,
        page,
        limit,
      };
    }

    // For all completed and pending - using cliend side pagination
    const response = await fetch(`https://dummyjson.com/todos?limit=150`);
    if (!response.ok)
      throw new Error(`API request failed with status ${response.status}`);

    let todos = (await response.json()).todos;

    // status filter
    if (statusFilter !== "all") {
      const completedStatus = statusFilter === "completed";
      todos = todos.filter((todo) => todo.completed === completedStatus);
    }

    // search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      todos = todos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchLower),
      );
    }

    // Client side  pagination
    const paginatedTodos = todos.slice(skip, skip + limit);

    return {
      todos: paginatedTodos,
      total: todos.length,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
};

const fetchTodo = async (id) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error("Todo not found");
  return response.json();
};

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
