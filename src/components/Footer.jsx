import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const handleGoBackUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="  w-full py-6 mt-4">
      <div className="container mx-auto px-4 flex   justify-between items-center">
        <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <p>© {new Date().getFullYear()} Created by Motunrayo 💙</p>
        </div>
        <button
          onClick={handleGoBackUp}
          aria-label="Scroll to top"
          className="mb-4 md:mb-0 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
