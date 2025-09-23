import React from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const handleGoBackUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-2 max-w-7xl mx-auto mt-4 ">
      <div className="container mx-auto px-4 flex  justify-between items-center">
        <div className="text-gray-700  text-base">
          <p te>© {new Date().getFullYear()} Created by Motunrayo 💙</p>
        </div>
        <button
          onClick={handleGoBackUp}
          aria-label="Scroll to top"
          className="mb-4 md:mb-0 p-2 rounded-full bg-blue-600 text-white "
        >
          <FaArrowUp size="22" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
