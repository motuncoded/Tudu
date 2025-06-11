import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "@tanstack/react-router";

function Layout() {
  return (
    <div>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
