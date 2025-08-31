import React from "react";
import { FaTimes } from "react-icons/fa";

interface SearchTodoProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
}

const SearchTodo: React.FC<SearchTodoProps> = ({
  searchTerm = "",
  setSearchTerm,
  onSearch,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form className="w-full md:w-auto" onSubmit={e => e.preventDefault()}>
      <div className="relative flex items-center" role="search">
        <label htmlFor="search-input" className="sr-only">
          Search todos
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search todos..."
          className="input input-bordered border-gray-800 focus:outline-none w-full md:w-64 pr-10 border-2 bg-transparent"
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search todo"
        />

        {searchTerm && (
          <button
            type="button"
            className="absolute cursor-pointer right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchTodo;