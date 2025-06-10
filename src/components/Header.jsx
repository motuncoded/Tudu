const Header = () => {
  return (
    <header className="flex justify-between max-w-7xl mx-auto p-4">
      <div>
        <div className="bg-blue-700 p-2 h-3 w-3 text-white rounded-full" />
        <h1 className="text-3xl">Tudu</h1>
      </div>
      <button className="btn bg-white border-blue-700 border-2 text-blue-700 hover:bg-blue-700 hover:text-white hover:transition-opacity">
        View todo
      </button>
    </header>
  );
};

export default Header;
