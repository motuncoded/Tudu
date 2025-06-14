import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

// LocalForage instance
export const localTodoStore = localforage.createInstance({
  name: "tuduApp",
  storeName: "localTodos",
});

export async function createTodo(todoData) {
  const newTodo = {
    id: `local-${uuidv4()}`, // prefix helps distinguish local todos
    todo: todoData.title,
    completed: false,
    createdAt: new Date().toISOString(),
    userId: 1,
    isLocal: true, // to help identify later
  };

  try {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error("Failed to create on server");
    }

    const data = await response.json();

    // Optionally still save locally for persistence
    await localTodoStore.setItem(newTodo.id, { ...newTodo, ...data });
    return { ...newTodo, ...data };
  } catch (err) {
    // Fallback to local-only
    console.log("Saving todo locally due to server failure:", err.message);
    await localTodoStore.setItem(newTodo.id, newTodo);
    return newTodo;
  }
}

export const fetchTodos = async (
  page = 1,
  statusFilter = "all",
  searchTerm = "",
) => {
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

// fetch the individual todo
export const fetchTodo = async (id) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error("Todo not found");
  return response.json();
};

// fetch the recent todo item

export async function updateTodo(id, updateData) {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error("Failed to update todo on server");
    return response.json();
  } catch (err) {
    const todo = await localTodoStore.getItem(id);
    if (todo?.isLocal) {
      const updateTodo = { ...todo, ...updateData };
      await localTodoStore.setItem(id, updateTodo);
      return updateTodo;
    } else {
      throw err;
    }
  }
}

export async function deleteTodo(id) {
  try {
    const localTodo = await localTodoStore.getItem(id);

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
    console.error("Delete failed", err.message);
  }
}
