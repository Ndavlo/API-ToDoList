import React, { useState } from "react";

const Home = () => {
  const [toDos, setToDos] = useState([
    "Lamar al abogado",
    "Lavar el coche",
    "Preparar maletas",
  ]);
  const [newTask, setNewTask] = useState("");

  function addNewTask(e) {
    if (e.key == "Enter" && newTask != "") {
      let newToDos = [...toDos];
      newToDos.push(newTask);
      setToDos(newToDos);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    let newToDo = [...toDos];
    newToDo.splice(index, 1);
    setToDos(newToDo);
  }

  return (
    <body>
    <div className="container">
      <h1>To do List</h1>
      <input
        className="mb-4"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={addNewTask}
      />
      <ul className="list-group">
        {toDos.map((task, index) => (
          <li key={index} className="list-group-item">
            <span
              id="button"
              onClick={() => deleteTask(index)}
              className="badge rounded-pill text-bg-danger"
            >
              X
            </span>
            {task}
          </li>
        ))}
        <li id="footer" className="list-group-item">
          {toDos.length == 0
            ? "Great job, you are all done!"
            : toDos.length + " tasks left, get it done!"}
        </li>
      </ul>
    </div>
    </body>
  );
};

export default Home;
