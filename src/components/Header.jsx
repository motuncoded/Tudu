import { Link, useNavigate } from "@tanstack/react-router";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/todos" });
  };
  return (
    <header className="flex justify-between items-center  p-4">
      <div>
        <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full" />
        <h1 className="text-3xl">
          <Link to="/">Tudu</Link>
        </h1>
      </div>
      <button
        className="btn bg-transparent border-blue-700 border-2 text-blue-700 hover:bg-blue-700 hover:text-white hover:transition-opacity"
        onClick={handleClick}
      >
        View todo
      </button>
    </header>
  );
};

export default Header;
