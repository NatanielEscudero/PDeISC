import React, {useState} from "react";
import './App.css';
function Holamundo() {
    return (
      <h1>
        Hola mundo
      </h1>
    );  // Retorna el componente de holamundo
}

function Presentacion({user}){

    return(
     <div>
        <img className="foto-perfil"
        src={user.imageUrl}
        alt={'Foto de ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}

        />
        <div className="datos-perfil">
          <h1>Nombre: {user.name}</h1>
          <h1>Apellido: {user.surname}</h1>
          <h1>Profesion: {user.job}</h1>
        </div>

     </div>   
    );     // Retorna el componente de presentacion

}

function Contador(){

  const [contador, setContador] = useState(0);  // Inicializa el contador en 0

  function contadorMas() {  // Incrementa el contador
    setContador(prev => prev + 1);
  }

  function contadorMenos() { // Decrementa el contador
    setContador(prev => prev - 1);
  }

  function contadorReset() {  // Resetea el contador a 0
    setContador(0);
  }

  return(               
     <div className="contador">
        <h1>{contador}</h1>
        <div>
          <button onClick={contadorMas}>+</button>
          <button onClick={contadorMenos}>-</button>
          <button onClick={contadorReset}>reset</button>
        </div>
     </div>   
    );    // Retorna el componente del contador

}

function Tareas() {
  const [tareas, setTareas] = useState([
    { texto: "comprar papota", completada: false },
    { texto: "ordenar la ropa", completada: false },
    { texto: "arreglar el auto", completada: false },
  ]); // Estado inicial con algunas tareas

  const toggleCompletar = (index) => {
    setTareas(prevTareas =>
      prevTareas.map((tarea, i) =>
        i === index ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };    // Función para alternar el estado de completado de una tarea

  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul>
        {tareas.map((tarea, index) => (
          <li
            key={index}
            style={{
              textDecoration: tarea.completada ? "line-through" : "none"
            }}
          >
            {tarea.texto}
            <button onClick={() => toggleCompletar(index)}>
              {tarea.completada ? "Desmarcar" : "Completar"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );  // Retorna el componente de tareas
}

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    if (nombre.trim() !== "") {
      setMensaje(`¡Bienvenido, ${nombre}!`);
    } else {
      setMensaje("Por favor ingresa tu nombre");
    }
  };

  return (
    <div>
      <h2>Formulario simple</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );  // Retorna el componente del formulario
}

export default function MyApp() {
  return (
    <div>
      <h1>React 1</h1>
      <Holamundo />
      <Contador />
      <Presentacion user = {{
      name: 'Nigga',
      surname: 'Jhonson',
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSi8WCTgRacCVTTdAk_RRdfQvpDvsKhIc9WN7fidA-nnIfXKSL0VwJ8xxiS3Us3uBA2Xa-S9fVx0Y2dvAFUHdRLHGgMLi9POAX4LGpZdlqj',
      imageSize: 90,
      job: 'Ingeniero Electromecanico',
      }} />
      <Tareas/>
      <Formulario/>
    </div>
  );
}