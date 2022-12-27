import React, { useEffect, useState } from "react";

const Home = () => {
  const [toDos, setToDos] = useState();
  const [newTask, setNewTask] = useState("");

useEffect(async () => { 
try { 
  let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolasdavid"
  )
  if (!response.ok){
    throw response.statusText
  }
  let data = await response.json();
  setToDos(data) 
} catch (error){
  console.error(error)
}
}, []);

useEffect(()=> {
console.log("componente actualizado")
//Se actualiza la lista, se actualiza la API

// Si la lista esta vacia, se elimina
if (!toDos) { console.log("Iniciar lista")
return
}
if (toDos.length == 0) {
  console.log("Eliminar lista")
} else {
  //De lo contrario se actualiza
  console.log("Actualizar lista")
}
}, [toDos]);

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
        {toDos?.map((task, index) => (
          <li key={index} className="list-group-item">
            <span
              id="button"
              onClick={() => deleteTask(index)}
              className="badge rounded-pill text-bg-danger"
            >
              X
            </span>
            {task.label}
          </li>
        ))}
        <li id="footer" className="list-group-item">
          {toDos.length == 0
            ? "Great job, you are all done!"
            : toDos.length + " tasks left, get it done!"}
        </li>
      </ul>
    </div>
  );
};

export default Home;
