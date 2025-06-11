import React from "react";

const FilterTodo = () => {
  return (
    <div>
      <div role="tablist" className="tabs tabs-border text-2xl">
        <a role="tab" className="tab border-b-blue-800">
          All
        </a>
        <a role="tab" className="tab tab-active  border-b-blue-800">
          Completed
        </a>
        <a role="tab" className="tab  border-b-blue-800">
          Incompleted
        </a>
      </div>
    </div>
  );
};

export default FilterTodo;
