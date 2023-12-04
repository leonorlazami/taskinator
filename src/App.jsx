import { useState } from "react";
import "./index.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
  function toggleTaskCompleted(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  function clearList() {
    setTasks([]);
  }
  return (
    <>
      <Header />
      <div className="flex flex-col border h-screen rounded-md w-[90%] mx-auto p-4 bg-tertiary gap-16 md:w-1/2 md:text-xl ">
        <div className="flex flex-col gap-4">
          <Form tasks={tasks} setTasks={setTasks} />
          <TodoList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTaskCompleted={toggleTaskCompleted}
            clearList={clearList}
          />
        </div>
      </div>
    </>
  );
}

function Header() {
  return (
    <h1 className=" font-secondary text-white text-center text-3xl tracking-wide	my-4 md:text-5xl">
      Taskinator
    </h1>
  );
}
function Form({ tasks, setTasks }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");
  }
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="flex rounded-md gap-5 bg-tertiary my-4 justify-center ">
      <form className="rounded-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your task"
          value={inputValue}
          onChange={handleChange}
          className="h-auto text-black bg-tertiary border-2 border-secondary rounded-md px-2 py-2 focus:outline-none focus:border-secondary focus:ring  focus:ring-secondary"
        />
      </form>
      <button
        onClick={handleSubmit}
        className="border rounded-md px-3 py-2 bg-extra font-semibold text-white"
      >
        Add
      </button>
    </div>
  );
}
function TodoList({ tasks, deleteTask, toggleTaskCompleted, clearList }) {
  const [sortedList, setSortedList] = useState("input");
  const sortedTasks = [...tasks];

  if (sortedList === "description") {
    sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortedList === "completed") {
    sortedTasks.sort((a, b) => a.completed - b.completed);
  }

  return (
    <>
      <ul className=" p-4 flex flex-col gap-4 font-primary ">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className=" gap-4 flex justify-between items-center bg-secondary rounded-md p-3 md:w-1/2 md:mx-auto"
          >
            <div className="flex items-center">
              <button
                className="p-2 bg-transparent border-none cursor-pointer outline-none"
                onClick={() => toggleTaskCompleted(task.id)}
              >
                {task.completed ? (
                  <MdOutlineCheckBox color="#143760" />
                ) : (
                  <MdCheckBoxOutlineBlank color="#143760" />
                )}
              </button>

              <p className={task.completed ? "line-through" : ""}>
                {task.text}
              </p>
            </div>

            <button onClick={() => deleteTask(task.id)}>
              <RiDeleteBin5Fill color="#143760" />
            </button>
          </li>
        ))}
      </ul>

      <div className="font-primary flex justify-around p-2">
        <select
          value={sortedList}
          onChange={(event) => {
            setSortedList(event.target.value);
          }}
          onBlur={() => {
            setSortedList(event.target.value);
          }}
          onFocus={() => {
            setSortedList(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSortedList(event.target.value);
            }
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="completed">Sort by completed</option>
        </select>

        <button
          onClick={clearList}
          className="border rounded-md px-3 py-2 bg-extra font-semibold text-white"
        >
          Clear list
        </button>
      </div>
    </>
  );
}

export default App;
