// src/router.js
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Home from "./routes/Home";
import Todos from "./routes/Todos";
import Layout from "./components/Layout";

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

const routeTree = rootRoute.addChildren([indexRoute, todosRoute]);

export const router = createRouter({ routeTree });
