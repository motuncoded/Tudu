import React from "react";

import { useNavigate } from "@tanstack/react-router";

type TodoErrorProps = {
error: string;
}

const TodoError = ({ error }: TodoErrorProps) => {
  const navigate = useNavigate();

  const handleBackToTodoPage = () => {
    navigate({
      to: "/todos",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="error text-[2.5rem]  duration-500">{error}</h2>
      <p>Kindly navigate to an existing todo</p>
      <button
        type="button"
        onClick={handleBackToTodoPage}
        aria-label="Go back to the todos list"
        className="btn  text-white flex my-6 w-auto space-x-2 bg-blue-800 border-none  "
      >
        Navigate to Todo Page
      </button>
    </div>
  );
};

export default TodoError;
