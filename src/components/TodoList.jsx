import React, { useState, useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import FilterTodo from "./FilterTodo";
import { LuCircleCheck, LuClock } from "react-icons/lu";
import SearchTodo from "./SearchTodo";

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useTodos(
    currentPage,
    statusFilter,
    searchTerm.trim(),
  );
  


  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

//
const handleSearch = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  

  
  // If input becomes empty, reset immediately
  if (!value.trim()) {
    setSearchTerm("");
  }
};



  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center h-64"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="loading loading-spinner loading-lg"></span>
        <span className="sr-only">Loading todos...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error" role="alert" aria-live="assertive">
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

  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / 10);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <FilterTodo
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <SearchTodo
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table text-[1rem] my-8">
          <span className="sr-only">
            List of todos with their status and user information
          </span>{" "}
          <thead>
            <tr className="text-[18px]">
              <th scope="col">ID</th>
              <th scope="col">Todo</th>
              <th scope="col">Status</th>
              <th scope="col">User ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.todos?.length > 0 ? (
              data.todos.map((todo) => (
                <tr key={todo.id}>
                  <td scope="row">{todo.id}</td>
                  <td>{todo.todo}</td>
                  <td>
                    <span
                      aria-label={todo.completed ? "Completed" : "Pending"}
                      className={`badge ${todo.completed ? "badge-success" : "badge-warning"}`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
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
                    </span>
                  </td>
                  <td>{todo.userId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8">
                  No todos found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalItems > 0 && (
        <div
          className="flex justify-between items-center"
          aria-label="Pagination"
        >
          <div className="join">
            <button
              className="btn btn-md text-blue-600"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <RxDoubleArrowLeft size="22" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
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
                  className={`btn btn-md ${currentPage === pageNum ? "btn-active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  aria-label={`Page ${pageNum}`}
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
              aria-label="Next page"
            >
              <RxDoubleArrowRight size="22" />
              <span className="sr-only"> Next</span>
            </button>
          </div>

          <h4 className="text-center text-[1rem]">
            Page {currentPage} of {totalPages}
            {statusFilter !== "all" && ` (${totalItems} ${statusFilter} todos)`}
          </h4>
        </div>
      )}
    </div>
  );
};

export default TodoList;
