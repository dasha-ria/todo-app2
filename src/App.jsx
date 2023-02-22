import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(["write email", "do groceries"]);

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([input, ...tasks]);
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
        {tasks.map((task) => {
          return <li>{task}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
