import { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([input, ...tasks]);
    setInput("");
  };

  const removeTask = (index) => {
    const newList = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newList);
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
              <li>{task}</li>
              <button onClick={() => removeTask(index)}>remove</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
