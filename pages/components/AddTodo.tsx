import React, { useState } from "react";

interface AddTodoProps {
  onClose: () => void;
  onSubmit: (todo: { title: string }) => void;
  isLoading?: boolean;
  error?: Error;
}

const AddTodo: React.FC<AddTodoProps> = ({ 
  onClose, 
  onSubmit, 
  isLoading = false,
  error 
}) => {
  const [todoText, setTodoText] = useState("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !todoText.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoText.trim()) {
      setTouched(true);
      return;
    }
    onSubmit({
      title: todoText.trim(),
    });
    setTodoText("");
    setTouched(false);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
        <h3 className="text-2xl font-bold mb-4">Add New Todo</h3>
        
        {error && (
          <div className="alert alert-error mb-4" role="alert">
            <span>Error: {error.message}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo-title" className="block text-sm font-medium mb-2">
            Todo Title *
          </label>
          <input
            type="text"
            id="todo-title"
            className={`input input-bordered bg-transparent border-2 focus:outline-none w-full mb-1 ${isInvalid ? 'border-red-500' : 'border-gray-800'}`}
            placeholder="Enter your todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onBlur={handleBlur}
            required
            disabled={isLoading}
            aria-invalid={isInvalid}
          />
          {isInvalid && (
            <p className="text-red-500 text-sm mb-4">Todo title is required</p>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn border-2 bg-transparent border-blue-700 text-blue-700 hover:bg-blue-50"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-400"
              disabled={isLoading || !todoText.trim()}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner" aria-hidden="true"></span>
                  Adding...
                </>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTodo;