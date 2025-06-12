import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router"; // Make sure you have a router.js file exporting 'router'

function App() {
  return <RouterProvider router={router} />;
}
export default App;
