import React from "react";

const Loader = ({ loading }: { loading: string }) => {
  return (
    <div
      className="flex justify-center items-center h-64"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="loading loading-spinner loading-lg"></span>
      <span className="sr-only">{loading}</span>
    </div>
  );
};

export default Loader;
