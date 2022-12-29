import React, { useEffect, useState } from "react";

const Home = () => {
  const [toDos, setToDos] = useState([]);
  const [newTask, setNewTask] = useState("");

useEffect(async () => { 
getTasks()
}, []);

const getTasks = async () => {
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
}

const createUser = async () => {
  try { 
  let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolasdavid", {
    method: "POST",
    body: JSON.stringify([]),
    headers: {
      "Content-Type": "application/json"
    }
  }
  )
  if (!response.ok){
    throw response.statusText
  }
  alert("Usuario creado con exito")
  console.log(response)
  getTasks()
} catch (error){
  console.log(error)
}
}


const removeUser = async () => {
  try { 
  let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolasdavid", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }
  )
  if (!response.ok){
    throw response.statusText
  }
  console.log(response)
setToDos([])
} catch (error){
  console.error(error)
}
}

function addNewTask(e) {
  if (e.key == "Enter" && newTask != ""){
      setToDos([...toDos, {label: newTask, done: false}]);
      setNewTask("");
  }
}

  function deleteTask(index) {
    let newToDo = [...toDos];
    newToDo.splice(index, 1);
    setToDos(newToDo);
  }

  const updateToDo = async () => {
    console.log(toDos)
    try { 
    let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolasdavid", {
      method: "PUT",
      body: JSON.stringify(toDos),
      headers: {
        "Content-Type": "application/json"
      }
    }
    )
    if (!response.ok){
      throw response.statusText
    }
    console.log(response)
    getTasks()
  } catch (error){
    console.log(error)
  }
  }


  return (
    <div className="container">
      <h1>To do List</h1>
      <ul><p>Instrucciones:</p>
        <li>Presiona la tecla ENTER para agregar la tarea a la lista.</li>
        <li>Presiona "Actualizar lista" para actualizar la API con todas las tareas nuevas.</li>
        <li>Eliminar todo elimina todas las tareas y las tareas de la API</li>
        <li>Crear nueva lista crea un nuevo usuario con el "sample task"</li>
        </ul>
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
            {task.label}
          </li>
        ))}
        <li id="footer" className="list-group-item">
          {toDos.length == 0
            ? "Great job, you are all done!"
            : toDos.length + " tasks left, get it done!"}
        </li>
      </ul>
      <div className="buttons">
            <button onClick={() => removeUser()}>Eliminar Todo</button>
            <button onClick={() => createUser()}>Crear Nueva Lista</button>
            <button onClick={updateToDo}>Actualizar Lista</button>
            </div>
    </div>
  );
};

export default Home;
