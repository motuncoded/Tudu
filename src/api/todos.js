import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

// LocalForage instance
const localTodoStore = localforage.createInstance({
  name: "tuduApp",
  storeName: "localTodos",
});

export async function createTodo(todoData) {
  const newTodo = {
    id: uuidv4(),
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

export const fetchRemoteTodos = async (
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
export const fetchRemoteTodo = async (id) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error("Todo not found");
  return response.json();
};

// fetch the recent todo item
export const fetchLocalTodos = async () => {
  const keys = await localTodoStore.keys();
  const todos = await Promise.all(
    keys.map((key) => localTodoStore.getItem(key)),
  );
  return todos.reverse();
};

// merging both the server todo and local todo
export const fetchTodos = async (
  page = 1,
  statusFilter = "all",
  searchTerm = "",
) => {
  const [remoteData, localData] = await Promise.all([
    fetchRemoteTodos(page, statusFilter, searchTerm),
    fetchLocalTodos(),
  ]);

  let combined = [...localData, ...remoteData.todos];

  // Reapply filter to local todos too
  if (statusFilter !== "all") {
    const isCompleted = statusFilter === "completed";
    combined = combined.filter((todo) => todo.completed === isCompleted);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    combined = combined.filter((todo) =>
      todo.todo.toLowerCase().includes(term),
    );
  }

  const limit = 10;
  const skip = (page - 1) * limit;
  const paginated = combined.slice(skip, skip + limit);

  return {
    todos: paginated,
    total: combined.length,
    page,
    limit,
  };
};

export const fetchTodo = async (id) => {
  try {
    // Try getting it from localForage first
    const localTodo = await localTodoStore.getItem(id);
    if (localTodo) {
      return localTodo;
    }

    // If not found locally, fetch from the remote API
    const response = await fetch(`https://dummyjson.com/todos/${id}`);
    if (!response.ok) throw new Error("Todo not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching todo:", error.message);
    throw new Error("Failed to fetch todo");
  }
};
