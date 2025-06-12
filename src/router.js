// src/router.js
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Home from "./routes/Home";
import Todos from "./routes/Todos";
import Layout from "./components/Layout";
import TodoDetail from "./routes/TodoDetail";

const rootRoute = createRootRoute({
  component: Layout,
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos",
  component: Todos,
});

const todoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos/$id",
  component: TodoDetail,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  todosRoute,
  todoDetailRoute,
]);

export const router = createRouter({ routeTree });
