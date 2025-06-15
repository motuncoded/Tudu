import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodo = ({ onClose, onSubmit, isLoading }) => {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: todoText,
    });
    setTodoText("");
  };
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
        <h3 className="text-2xl font-bold mb-4">Add New Todo</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo-title" className="sr-only">
            Title*
          </label>
          <input
            type="text"
            id="todo-title"
            className="input input-bordered w-full mb-4"
            placeholder="Enter your todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Adding...
                </>
              ) : (
                "Add"
              )}{" "}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

AddTodo.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};
export default AddTodo;
