//  Todolist page for the list of todo
import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useTodos(currentPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: {error.message}</span>
      </div>
    );
  }
  const totalItems = data.total;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4 px-8">
      <div className="overflow-x-auto">
        <table className="table text-[18px]">
          <thead>
            <tr className="text-[18px]">
              <th>ID</th>
              <th>Todo</th>
              <th>Status</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {data.todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.todo}</td>
                <td>
                  <span
                    className={`badge ${todo.completed ? "badge-success" : "badge-warning"}`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <div className="join">
          <button
            className={`btn btn-md text-blue-600`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <RxDoubleArrowLeft size="22" />
          </button>

          {Array.from({ length: Math.min(2, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 10) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                className={`btn btn-md ${currentPage === pageNum ? "btn-active text-md" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="btn btn-md text-blue-600"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <RxDoubleArrowRight size="22" />
          </button>
        </div>

        <h4 className="text-center text-md ">
          Page {currentPage} of {totalPages}
        </h4>
      </div>
    </div>
  );
};

export default TodoList;
