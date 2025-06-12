import { FaLongArrowAltLeft } from "react-icons/fa";
// import { useNavigate } from "@tanstack/react-router";
import TodoList from "../components/TodoList";

function Todos() {
  // const navigate = useNavigate();

  // const handleBackToHomePage = () => {
  //   navigate({
  //     to: "/",
  //   });
  // };
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* <button
        type="button"
        onClick={handleBackToHomePage}
        className="btn bg-transparent text-blue-700 border-blue-700 border-2 hover:bg-blue-800 hover:text-white"
      >
        <FaLongArrowAltLeft size="28" />
      </button> */}
      <section className="flex  flex-col">
        <div className="mb-8 text-center">
          <h2 className="text-3xl  font-medium ">Todos</h2>
          <p>A display of all todo and their status</p>
        </div>
        <TodoList />
      </section>
    </div>
  );
}

export default Todos;
