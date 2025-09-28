"use client";

import React, { useState } from "react";
import AddTodo from "./AddTodo";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos"; // adjust path if needed

// Define the shape of a Todo returned from API
export type Todo = {
  id: string;
  description?: string;
  // add other fields as needed
  completed?: boolean;
  userId?: string;
};

// Define the data you send to the API when creating a todo
export type TodoInput = {
  title: string;
  description?: string;
  // include any other fields required by your API
  completed?: boolean;
  userId?: string;
};
type ErrorType = {
  name: string;
  message: string;
  stack?: string;
};
// Define error type


export default function Hero() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<Todo, ErrorType, TodoInput>({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      // Update the cache manually for instant UI update
      queryClient.setQueryData<{ todos: Todo[]; total: number }>(
        ["todos", 1, "all", ""],
        (previousData) => {
          if (!previousData) {
            // Return a default structure if no previous data exists
            return {
              todos: [newTodo],
              total: 1
            };
          }
          
          const updated = {
            ...previousData,
            todos: [newTodo, ...previousData.todos.slice(0, 9)],
            total: previousData.total + 1,
          };
          console.log("Updated todos:", updated.todos);
          return updated;
        }
      );
      setShowModal(false);
      router.push("/todos"); // navigate to /todos
    },
    onError: (error: ErrorType) => {
      // Normalize error shape; adapt if using Axios or other libs
      console.error("Error creating todo:", error.message);
      // You can add toast notifications or other error handling here
    },
  });

  const handleAddTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmitTodo = (todoData: TodoInput) => {
    mutation.mutate(todoData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally reset mutation state when closing modal
    mutation.reset();
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
          onClose={handleCloseModal}
          onSubmit={handleSubmitTodo}
          isLoading={mutation.isPending}
          error={mutation.error} 

        />
      )}
    </section>
  );
}