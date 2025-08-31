import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// notFound Page
function NotFound() {
  const navigate = useNavigate();
  const [bold, setBold] = useState(true);

  // interval to render the font weight
  useEffect(() => {
    const interval = setInterval(() => {
      setBold((prev) => !prev);
    }, 700);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2
        className={`error text-[3.5rem] xl:text-[10rem]  my-8 ${bold ? "font-semibold " : "font-light"}`}
      >
        404 Error
      </h2>
      <button
        type="button"
        aria-label="Back to  home page"
        className="btn bg-blue-800 text-white"
        onClick={() => navigate({ to: "/" })}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
