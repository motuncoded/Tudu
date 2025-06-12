import React from "react";

const FilterTodo = ({ statusFilter, setStatusFilter }) => {
  return (
    <div
      role="tablist"
      aria-label="Todo status filters"
      className="tabs tabs-boxed bg-gray-100"
    >
      <button
        role="tab"
        aria-selected={statusFilter === "all"}
        aria-controls="all-tabpanel"
        id="all-tab"
        className={`tab ${statusFilter === "all" ? "tab-active bg-blue-700 rounded-md text-white hover:text-white hover:bg-blue-600 transition-all" : "text-[1rem]"}`}
        onClick={() => setStatusFilter("all")}
        tabIndex={statusFilter === "all" ? 0 : -1}
      >
        All
      </button>
      <button
        role="tab"
        aria-selected={statusFilter === "completed"}
        aria-controls="completed-tabpanel"
        id="completed-tab"
        className={`tab ${statusFilter === "completed" ? "tab-active bg-blue-700 rounded-md text-white  hover:text-white hover:bg-blue-600 transition-all" : "text-[1rem]"}`}
        onClick={() => setStatusFilter("completed")}
        tabIndex={statusFilter === "completed" ? 0 : -1}
      >
        Completed
      </button>
      <button
        role="tab"
        aria-selected={statusFilter === "incomplete"}
        aria-controls="incomplete-tabpanel"
        id="incomplete-tab"
        className={`tab ${statusFilter === "incomplete" ? "tab-active bg-blue-700 rounded-md text-white  hover:text-white hover:bg-blue-600 transition-all" : "text-[1rem]"}`}
        onClick={() => setStatusFilter("incomplete")}
        tabIndex={statusFilter === "incomplete" ? 0 : -1}
      >
        Incomplete
      </button>
    </div>
  );
};

export default FilterTodo;
