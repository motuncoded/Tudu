import React, { useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router"; // Make sure you have a router.js file exporting 'router'
import { localTodoStore } from "./api/todos"; // adjust import if needed

function App() {
  useEffect(() => {
    localTodoStore.clear().then(() => {
      console.log("Cleared local storage");
    });
  }, []);
  return <RouterProvider router={router} />;
}
export default App;
