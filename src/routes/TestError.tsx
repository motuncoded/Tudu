import React, { useState } from "react";

// testError page
function TestError() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This is to test the error Boundary");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="error text-[2rem] xl:text-[4rem] transition-font-extrabold duration-500 text-center my-8">
        Something went wrong
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Click the button below to test the error boundary.
      </p>
      <button
        className=" btn px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setShouldThrow(true)}
      >
        Throw Error
      </button>
    </div>
  );
}

export default TestError;
