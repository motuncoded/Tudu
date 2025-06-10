import React from "react";

export default function Hero() {
  return (
    <section className="flex justify-center items-center flex-col text-center h-full my-30">
      <h2 className="text-6xl max-w-4xl font-bold">
        Organize Your Tasks{" "}
        <span className=" text-blue-700 ">Like Never Before</span>
      </h2>
      <p className="text-2xl text-gray-500 max-w-3xl mt-3">
        A powerful, intuitive todo management application with advanced search,
        filtering, and pagination. Built with modern web technologies for the
        best user experience.
      </p>
      <button className="btn bg-blue-700 text-white mt-8">Get started</button>
    </section>
  );
}
