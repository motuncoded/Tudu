// src/routes/TodoDetail.jsx
import React from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useTodo } from "../hooks/useTodos"; // <-- import the hook
import { FaLongArrowAltLeft } from "react-icons/fa"; // <-- import icon if not already
import { LuCircleCheck, LuClock } from "react-icons/lu";
import { CiHashtag } from "react-icons/ci";
import Loader from "../components/Loader";
import { RxPerson } from "react-icons/rx";
import TodoError from "../components/TodoError";

const TodoDetail = () => {
  const { id } = useParams({ from: "/todos/$id" });
  const { data: todo, isLoading, isError, error } = useTodo(id);

  const navigate = useNavigate();

  if (isLoading) return <Loader loading="Loading Todo details" />;
  if (isError) return <TodoError error={error.message} />;

  const handleBackToTodoPage = () => {
    navigate({
      to: "/todos",
    });
  };

  return (
    <main className="max-w-7xl mx-auto my-10 p-6 " aria-label="todo detail">
      <button
        type="button"
        onClick={handleBackToTodoPage}
        aria-label="Go back to the todos list"
        className="btn  text-gray-700 flex w-auto space-x-2 bg-[#fff] border-none  "
      >
        <FaLongArrowAltLeft
          size="22"
          className="text-blue-700"
          aria-hidden="true"
        />
        <p className="hidden sm:inline">Back to Todos</p>
      </button>
      <div className="space-y-2 my-6 w-full rounded-md bg-[#fff] p-4 md:p-6 lg:p-8">
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h2 className="font-medium text-xl sm:text-2xl break-words">
            {todo.todo}
          </h2>
          <p
            aria-label={todo.completed ? "Completed" : "Pending"}
            className={`badge self-start sm:self-auto ${todo.completed ? "badge-success text-white" : "badge-warning"}`}
          >
            {todo.completed ? (
              <>
                <LuCircleCheck />
                <span className="sr-only">Completed</span>
              </>
            ) : (
              <>
                <LuClock />
                <span className="sr-only">Pending</span>
              </>
            )}
            {todo.completed ? "Completed" : "Pending"}
          </p>
        </section>
        <section className="flex justify-between gap-2 ">
          <div className="flex items-center space-x-2 my-4 gap-2  text-gray-500">
            <h3 className="text-2xl md:text-3xl">
              <CiHashtag />
            </h3>
            <div className="font-medium">
              <p className="text-sm md:text-base">Todo ID</p>
              <p className="text-sm md:text-base">{todo.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 my-4 gap-2  text-gray-500">
            <h3 className="text-2xl md:text-3xl">
              <RxPerson />
            </h3>
            <div className="font-medium">
              <p className="text-sm md:text-base">User ID</p>
              <p className="text-sm md:text-base">{todo.userId}</p>
            </div>
          </div>
        </section>
        <div className="space-y-2 mt-6">
          <h4 className="text-lg md:text-xl font-bold">Status Information</h4>
          {todo.completed ? (
            <p className="text-sm md:text-base">
              This todo is
              <strong
                className={` mx-2 ${todo.completed ? "text-success  " : "text-warning"}`}
              >
                {todo.completed ? "completed" : "pending"}{" "}
              </strong>
            </p>
          ) : (
            <p>
              This todo is still
              <span
                className={`mx-2 ${todo.completed ? "text-success " : "text-warning"}`}
              >
                {todo.completed ? "completed" : "pending"}{" "}
              </span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoDetail;
