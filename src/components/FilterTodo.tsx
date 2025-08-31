import React from "react";

interface FilterTodoProps {
  statusFilter: "all" | "completed" | "incomplete";
  setStatusFilter: (status: "all" | "completed" | "incomplete") => void;
}

const FilterTodo: React.FC<FilterTodoProps> = ({ statusFilter, setStatusFilter }) => {
  const statuses: Array<"all" | "completed" | "incomplete"> = ["all", "completed", "incomplete"];
  return (
    <div
      role="tablist"
      aria-label="Todo status filters"
      className="tabs tabs-boxed bg-gray-100"
    >
      {statuses.map((status) => (
        <button
          key={status}
          role="tab"
          aria-selected={statusFilter === status}
          aria-controls={`${status}-tabpanel`}
          id={`${status}-tab`}
          className={`tab transition-all rounded-md ${
            statusFilter === status
              ? "tab-active bg-blue-700 text-white hover:bg-blue-600"
              : " text-gray-800 hover:text-blue-700"
          }`}
          onClick={() => setStatusFilter(status)}
          tabIndex={statusFilter === status ? 0 : -1}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterTodo;