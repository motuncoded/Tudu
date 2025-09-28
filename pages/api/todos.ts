import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

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

// LocalForage instance
export const localTodoStore = localforage.createInstance({
  name: "tuduApp",
  storeName: "localTodos",
});

export async function createTodo(todoData: TodoInput): Promise<Todo> {
  const newTodo: Todo = {
    id: `local-${uuidv4()}`,
    todo: todoData.title,
    completed: false,
    createdAt: new Date().toISOString(),
    userId: "1",
    isLocal: true,
  };

  try {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`Failed to create on server: ${response.status}`);
    }

    const data = await response.json();
    await localTodoStore.setItem(newTodo.id, { ...newTodo, ...data });
    return { ...newTodo, ...data };
  } catch (err) {
    const error = err as Error;
    console.log("Saving todo locally due to server failure:", error.message);
    await localTodoStore.setItem(newTodo.id, newTodo);
    return newTodo;
  }
}

export const fetchTodos = async (
  page: number = 1,
  statusFilter: string = "all",
  searchTerm: string = ""
) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
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

    const response = await fetch(`https://dummyjson.com/todos?limit=150`);
    if (!response.ok)
      throw new Error(`API request failed with status ${response.status}`);

    let todos: Todo[] = (await response.json()).todos;

    if (statusFilter !== "all") {
      const completedStatus = statusFilter === "completed";
      todos = todos.filter((todo) => todo.completed === completedStatus);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      todos = todos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchLower)
      );
    }

    const paginatedTodos = todos.slice(skip, skip + limit);

    return {
      todos: paginatedTodos,
      total: todos.length,
      page,
      limit,
    };
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching todos:", err.message);
    throw new Error(`Failed to fetch todos: ${err.message}`);
  }
};

// Fetch the individual todo
export const fetchTodo = async (id: string): Promise<Todo> => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error("Todo not found");
  return response.json();
};

export async function updateTodo(id: string, updateData: Partial<Todo>): Promise<Todo> {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error("Failed to update todo on server");
    return response.json();
  } catch (err) {
    const todo = await localTodoStore.getItem(id) as Todo;
    if (todo?.isLocal) {
      const updatedTodo = { ...todo, ...updateData };
      await localTodoStore.setItem(id, updatedTodo);
      return updatedTodo;
    } else {
      const error = err as Error;
      throw error;
    }
  }
}

export async function deleteTodo(id: string): Promise<{ id: string; deleteFrom?: string }> {
  try {
    const localTodo = await localTodoStore.getItem(id) as Todo;

    if (localTodo?.isLocal) {
      await localTodoStore.removeItem(id);
      return { id, deleteFrom: "local" };
    }
    
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    return response.json();
  } catch (err) {
    const error = err as Error;
    console.error("Delete failed", error.message);
    throw error;
  }
}