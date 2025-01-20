import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplited: false }]);
    setTodo("");
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos);
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
      alert("todo deleted successfully");
    } else {
      alert("delete todo cancel");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add A Todo</h2>
          <input
            onChange={handlechange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <h1 className="m-5 p-5 h-1 font-bold ">NO TODOS TO DISPLAY</h1>
          )}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-2/4 my-3 justify-between"
              >
                <div className="flex gap-7">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    value={item.isComplited}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isComplited ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
