import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
import TodoList from "../components/TodoList";

function Todos() {
  const navigate = useNavigate();

  const handleBackToHomePage = () => {
    navigate({
      to: "/",
    });
  };
  return (
    <div className="max-w-7xl mx-auto py-8">
      <button
        type="button"
        onClick={handleBackToHomePage}
        className="btn text-blue-700 border-blue-700 border-2 hover:bg-blue-800 hover:text-white"
      >
        <FaLongArrowAltLeft size="28" />
      </button>
      <section className="flex items-center justify-center flex-col">
        <h2 className="text-3xl ">Collections of Todos</h2>
        <TodoList />
      </section>
    </div>
  );
}

export default Todos;
