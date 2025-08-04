import React, {useState} from "react";
import './App.css';
function Holamundo() {
    return (
      <h1>
        Hola mundo
      </h1>
    );
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
    );

}

function Contador(){

  const [contador, setContador] = useState(0);

  function contadorMas() {
    setContador(prev => prev + 1);
  }

  function contadorMenos() {
    setContador(prev => prev - 1);
  }

  function contadorReset() {
    setContador(0);
  }

  return(
     <div>
        <h1>{contador}</h1>
        <button onClick={contadorMas}>+</button>
        <button onClick={contadorMenos}>-</button>
        <button onClick={contadorReset}>reset</button>
     </div>   
    );

}

function Tareas(){

  const [tareas, setTareas] = useState([
    {texto: "comprar papota",completada: false},
    {texto: "comprar papota",completada: false},
    {texto: "comprar papota",completada: false},
  ]);

  const toggleCompletar = (index) => {
    
  }
  return(
     <div>
        <h1>{contador}</h1>
        <button onClick={contadorMas}>+</button>
        <button onClick={contadorMenos}>-</button>
        <button onClick={contadorReset}>reset</button>
     </div>   
    );

}
export default function MyApp() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <Holamundo />
      <Contador />
      <Presentacion user = {{
      name: 'Nigga',
      surname: 'Jhonson',
      imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSi8WCTgRacCVTTdAk_RRdfQvpDvsKhIc9WN7fidA-nnIfXKSL0VwJ8xxiS3Us3uBA2Xa-S9fVx0Y2dvAFUHdRLHGgMLi9POAX4LGpZdlqj',
      imageSize: 90,
      job: 'Ingeniero Electromecanico',
      }} />
    </div>
  );
}