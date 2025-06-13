import NotFound from "../routes/NotFound";
import Header from "./Header";
import { Outlet } from "@tanstack/react-router";

function Layout() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
