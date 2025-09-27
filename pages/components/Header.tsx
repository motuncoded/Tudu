import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full" />
        <h1 className="text-3xl font-bold">
          <Link href="/">Tudu</Link>
        </h1>
      </div>
      <nav aria-label="Main Navigation">
        <Link
          href="/todos"
          className="bg-transparent border-2 border-blue-700 px-4 py-2 rounded-sm text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-200"
        >
          View todos
        </Link>
      </nav>
    </header>
  );
};

export default Header;