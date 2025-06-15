import React, { useState } from "react";
import AddTodo from "./AddTodo";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      // Update the cache manually for instant UI update since the api can accept todo
      queryClient.setQueryData(["todos", 1, "all", ""], (previousData) => {
        if (!previousData) return previousData;

        const updated = {
          ...previousData,
          todos: [newTodo, ...previousData.todos.slice(0, 9)],
          total: previousData.total + 1,
        };
        console.log("Updated todos:", updated.todos);
        return updated;
      });
      setShowModal(false);
      navigate({ to: "/todos" });
    },

    onError: (error) => {
      console.error("Error creating todo:", error.message);
    },
  });
  const handleAddTodo = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitTodo = (todoData) => {
    mutation.mutate(todoData);
  };

  return (
    <section className="flex justify-center items-center flex-col text-center h-full my-30">
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
