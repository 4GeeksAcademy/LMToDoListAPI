import React, {useEffect, useState} from "react";

const Home = () => {	
const apiUrl = 'https://playground.4geeks.com/todo'

const [nuevoTodo, setNuevoTodo] = useState("")	//estado de los items

const [todos, setTodos] = useState([]);  //estado de la lista entera

const onkeydown = (event) => { // agregar a la lista al dar enter
	if (event.key === "Enter") {   //enter debe empezar con mayuscula
		agregarTodo()
	setNuevoTodo("")}	
};



const handleChange = (event) => {
	setNuevoTodo(event.target.value);
}


function crearUsuario() {   //Hago el fetch para obtener los datos de la API
	fetch(`${apiUrl}/users/letimachado`, {method: "POST"})
	.then((response)=> response.json())
	.then((data)=> console.log(data))
	.catch((error)=> console.log(error))
}

function obtenerInfo() {   
	fetch(`${apiUrl}/users/letimachado`)
	.then((response)=> {
		console.log(response);
		if(response.status === 404) {
			crearUsuario()
			return false
		}
		return response.json()
	})
	.then((data)=> {
		if(data) {
			setTodos(data.todos)
		}
	})
	.catch((error)=> console.log(error))
}

function agregarTodo() {   
	fetch(`${apiUrl}/todos/letimachado`, {
		method: "POST",
		body: JSON.stringify({
			"label": nuevoTodo,
			"is_done": false
		  }),
		headers: {
			"Content-Type": "application/json"
		}

	})
	.then((response)=> {
		console.log(response);
		if(response.ok) {
			return response.json()
		}
		return false
	})
	.then((data)=> {
		if(data) {
			setTodos(todos.concat(data))
		}
	})
	.catch((error)=> console.log(error))
}





function eliminarTodo(id) {   
	fetch(`${apiUrl}/todos/${id}`, {method: "DELETE"})
	.then((response)=> {
		console.log(response);
		if(response.ok) {
			const listaNueva = todos.filter((todo) => todo.id !== id)
			setTodos(listaNueva);
		}
		return false
	})
	.catch((error)=> console.log(error))
}



useEffect(()=> {
	obtenerInfo()
	
},[]);

  


	return (
		<div className="container text-center">
			
			
    			<h1 className="display-4 text-center mb-4">To do list</h1>
    			<div className="p-2 mb-2 bg-light border-bottom">
     				 <input type="text" className="form-control" onChange={handleChange} value={nuevoTodo} onKeyDown = {(e) => onkeydown(e)} />
    			</div>
    			<ul className="list-group list-group-flush">
       			 {todos.map((todo) => {
            		return(
               		 <li className="list-group-item" key={todo.id}>
                    {todo.label} <button onClick={() => eliminarTodo(todo.id)} type="button" className="btn-close " aria-label="Close"></button>
                	</li>
            		)
       			 })}
    			</ul>
				<small className="text-muted">{todos.length} item left</small>
			</div>
		
	);
};

export default Home;
