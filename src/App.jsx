import { useState, useEffect } from "react";
import "./index.css";
// import trash from "./assets/trash.svg";
import trash1 from "./assets/trash-02.svg";

function App() {
  const [tasks, setTasks] = useState(() => {
    let _tasks = localStorage.getItem("tasks");
    if (_tasks === null) {
      return [];
    } else {
      return JSON.parse(_tasks);
    }
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: new Date().getTime().toString(),
      input,
      status: "unfinished",
    };
    setTasks([item, ...tasks]);
    setInput("");
  };

  const removeTask = (id) => {
    const newList = tasks.filter((task) => task.id !== id);
    setTasks(newList);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleStatus = (taskId) => {
    const newStatus = tasks.map((indTask) => {
      if (indTask.id === taskId) {
        if (indTask.status === "unfinished") {
          indTask.status = "finished";
        } else {
          indTask.status = "unfinished";
        }
      }
      return indTask;
    });
    setTasks(newStatus);
    console.log(newStatus);
  };

  const [hideFinished, setHideFinished] = useState(true);
  const showTasks = tasks.filter((task) => {
    if (hideFinished && task.status === "finished") {
      return false;
    } else {
      return true;
    }
  });

  return (
    <div className="bg">
      <div className="form-wrap">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="todo"
            id="todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button type="submit">Add</button>
        </form>

        <button onClick={() => setHideFinished(!hideFinished)}>
          {hideFinished ? "Show finished tasks" : "Hide finished tasks"}
        </button>

        <ul>
          {showTasks.map((task) => {
            return (
              <div className="bg-tasks" key={task.id}>
                <div className="flex">
                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    defaultChecked={task.status === "finished"}
                    onClick={() => toggleStatus(task.id)}
                  />
                  <li>{task.input}</li>
                  <button className="trash" onClick={() => removeTask(task.id)}>
                    <img className="trash-pic" src={trash1}></img>
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
