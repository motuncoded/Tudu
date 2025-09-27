import React, { useState, useEffect } from "react";
  import { useRouter } from 'next/router';

// notFound Page
function NotFound() {
  const router = useRouter();
  const [bold, setBold] = useState(true);

  // interval to render the font weight
  useEffect(() => {
    const interval = setInterval(() => {
      setBold((prev) => !prev);
    }, 700);
    return () => clearInterval(interval);
  });

    const handleGoHome = (): void => {
    router.push("/");
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h2
        className={`error text-[3.5rem] xl:text-[10rem]  my-8 ${bold ? "font-semibold " : "font-light"}`}
      >
        404 Error
      </h2>
      <button
        type="button"
        aria-label="Back to  home page"
        className="btn bg-blue-800 text-white"
        onClick={handleGoHome}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
