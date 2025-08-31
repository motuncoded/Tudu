import React, { useState } from "react";
import AddTodo from "./AddTodo";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";

type TodoDataProps = {
  todo: string;
  completed: boolean;
  userId: number;
};

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos", 1, "all", ""], (previousData: any) => {
        if (!previousData) return previousData;
        const updated = {
          ...previousData,
          todos: [newTodo, ...previousData.todos.slice(0, 9)],
          total: previousData.total + 1,
        };
        return updated;
      });
      setShowModal(false);
      navigate({ to: "/todos" });
    },
    onError: (error: any) => {
      console.error("Error creating todo:", error.message);
    },
  });

  const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitTodo = (todoData: TodoDataProps) => {
    mutation.mutate(todoData);
  };

  return (
    <section className="flex justify-center items-center flex-col text-center h-full my-10 xl:my-30">
      <h2 className="text-5xl xl:text-6xl max-w-4xl font-bold">
        Organize Your Tasks{" "}
        <span className=" text-blue-700 ">Like Never Before</span>
      </h2>
      <p className=" text-xl xl:text-2xl text-gray-500 max-w-3xl mt-3">
        A powerful, intuitive todo management application with advanced search,
        filtering, and pagination. Built with modern web technologies for the
        best user experience.
      </p>
      <button
        type="button"
        className="btn bg-blue-700 text-white text-base mt-8"
        aria-label="Get Started"
        onClick={handleAddTodo}
      >
        Get started
      </button>
      {showModal && (
        <AddTodo
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitTodo}
          isLoading={mutation.isPending}
          error={mutation.error}
        />
      )}
    </section>
  );
}
