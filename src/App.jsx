import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const SaveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (params) => {
    setShowFinished(!showFinished);
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplited: false }]);
    setTodo("");
    SaveToLs();
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos);
    SaveToLs();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => {
      return i.id === id;
    });

    console.log(t[0].todo);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SaveToLs();
  };
  const handleDelete = (e, id) => {
    const isConformed = window.confirm(
      "Are You Sure You Want To Delete These Todo?"
    );
    if (isConformed) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      SaveToLs();
      alert("todo deleted successfully");
    } else {
      alert("delete todo cancel");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage Your All Task At One Place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add A Todo</h2>
          <div className="flex">
            <input
              onChange={handlechange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 hover:bg-violet-950 p-4 disabled:bg-violet-700 py-2 text-sm font-bold text-white  mx-2 rounded-full"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <h1 className="m-5 p-5 h-1 font-bold ">NO TODOS TO DISPLAY</h1>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isComplited) && (
                <div key={item.id} className="todo flex  my-3 justify-between">
                  <div className="flex gap-7">
                    <input
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isComplited}
                      name={item.id}
                      id=""
                    />
                    <div
                      className={
                        item.isComplited
                          ? "line-through flex-wrap"
                          : "flex-wrap"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
