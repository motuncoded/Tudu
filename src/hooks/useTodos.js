import { useQuery } from "@tanstack/react-query";

const fetchTodos = async (page = 1, statusFilter = "all") => {
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    // For "all" status - use normal pagination
    if (statusFilter === "all") {
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`,
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      return {
        todos: data.todos,
        total: data.total || 150,
        page,
        limit,
      };
    }

    // For "completed" or "pending" - fetch all and filter client-side
    const response = await fetch(`https://dummyjson.com/todos?limit=150`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const allData = await response.json();
    const completedStatus = statusFilter === "completed";
    const filteredTodos = allData.todos.filter(
      (todo) => todo.completed === completedStatus,
    );

    // Manual pagination
    const paginatedTodos = filteredTodos.slice(skip, skip + limit);

    return {
      todos: paginatedTodos,
      total: filteredTodos.length,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
};

export const useTodos = (page, statusFilter = "all") => {
  return useQuery({
    queryKey: ["todos", page, statusFilter],
    queryFn: () => fetchTodos(page, statusFilter),
    keepPreviousData: true,
    retry: 2,
  });
};
