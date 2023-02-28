import { useState, useEffect } from "react";
import "./index.css";

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

  const removeTask = (index) => {
    const newList = tasks.filter((_, taskIndex) => taskIndex !== index);
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

  return (
    <div>
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

      <ul>
        {tasks.map((task, index) => {
          return (
            <div className="flex" key={index}>
              <input
                type="checkbox"
                id="check"
                name="check"
                defaultChecked={task.status === "finished"}
                onClick={() => toggleStatus(task.id)}
              />
              <li>{task.input}</li>
              <button onClick={() => removeTask(index)}>remove</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
