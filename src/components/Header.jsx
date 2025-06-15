import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="flex justify-between items-center  p-4">
      <div>
        <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full" />
        <h1 className="text-3xl">
          <Link to="/">Tudu</Link>
        </h1>
      </div>
      <nav aria-label="Main Navigation" className="space-x-4">
        <Link
          to="/todos"
          className="link link:hover bg-transparent border-2 border-bg-blue-800 p-2 rounded-sm  text-blue-800 hover:bg-blue-800 hover:text-white hover:transition-opacity"
        >
          View todos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
