import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useTodo } from "../hooks/useTodos";
import { updateTodo } from "../api/todos"; // Add this import
import { FaLongArrowAltLeft, FaTrash } from "react-icons/fa";
import { LuCircleCheck, LuClock } from "react-icons/lu";
import { CiHashtag } from "react-icons/ci";
import Loader from "../components/Loader";
import { RxPerson } from "react-icons/rx";
import TodoError from "../components/TodoError";
import { deleteTodo } from "../api/todos";

const TodoDetail = () => {
  const { id } = useParams({ from: "/todos/$id" });
  const { data: todo, isLoading, isError, error } = useTodo(id);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (isLoading) return <Loader loading="Loading Todo details" />;
  if (isError) return <TodoError error={error.message} />;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(todo.todo);
    setEditedStatus(todo.completed);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updated = {
        todo: editedTitle,
        completed: editedStatus,
      };
      await updateTodo(todo.id, updated);
      window.location.reload(); // Or refetch with a query invalidation
    } catch (err) {
      alert("Cannot add Todo", err);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      navigate({ to: "/todos" });
    } catch (err) {
      alert("failed to delete the todo. Please try again", err);
    }
  };

  return (
    <main className="max-w-7xl mx-auto my-10 p-6 " aria-label="todo detail">
      <button
        type="button"
        onClick={() => navigate({ to: "/todos" })}
        aria-label="Go back to the todos list"
        className="btn text-gray-700 flex w-auto space-x-2 bg-[#fff] border-none"
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
          {isEditing ? (
            <input
              type="text"
              className="input input-bordered w-full sm:w-auto"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h2 className="font-medium text-xl sm:text-2xl break-words">
              {todo.todo}
            </h2>
          )}

          <p
            aria-label={todo.completed ? "Completed" : "Pending"}
            className={`badge self-start sm:self-auto ${todo.completed ? "badge-success text-white" : "badge-warning"}`}
          >
            {todo.completed ? <LuCircleCheck /> : <LuClock />}
            {todo.completed ? "Completed" : "Pending"}
          </p>
        </section>

        <section className="flex justify-between gap-2">
          <div className="flex items-center space-x-2 my-4 gap-2 text-gray-500">
            <CiHashtag className="text-2xl md:text-3xl" />
            <div className="font-medium">
              <p className="text-sm md:text-base">Todo ID</p>
              <p className="text-sm md:text-base">{todo.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 my-4 gap-2 text-gray-500">
            <RxPerson className="text-2xl md:text-3xl" />
            <div className="font-medium">
              <p className="text-sm md:text-base">User ID</p>
              <p className="text-sm md:text-base">
                {todo.userId === "local-user"
                  ? "Created by you"
                  : `User ${todo.userId}`}
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-2 mt-6">
          <h4 className="text-lg md:text-xl font-bold">Status Information</h4>
          {isEditing ? (
            <label htmlFor="edit" className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editedStatus}
                id="edit"
                onChange={() => setEditedStatus((prev) => !prev)}
              />
              <span>
                {editedStatus ? "Mark as completed" : "Mark as pending"}
              </span>
            </label>
          ) : (
            <p className="text-sm md:text-base">
              This todo is
              <strong
                className={`mx-2 ${todo.completed ? "text-success" : "text-warning"}`}
              >
                {todo.completed ? "completed" : "pending"}
              </strong>
            </p>
          )}
        </div>

        <div className="flex gap-2 xl:gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-success"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="btn bg-blue-800 text-white">
              Edit Todo
            </button>
          )}
          {confirmDelete ? (
            <>
              <button
                onClick={handleDelete}
                className="btn btn-error flex items-center gap-2"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn border-blue-800 border-2 bg-transparent hover:bg-blue-800 hover:text-white flex items-center "
            >
              <FaTrash />
              Delete Todo
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoDetail;
