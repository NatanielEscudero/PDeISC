import { useEffect, useState } from "react";
import { getUser } from "../api/users";

export default function Detail() {
  const id = window.location.pathname.split("/").pop();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
  getUser(id)
    .then(data => {
      console.log("Respuesta del backend:", data);
      if (data && !data.error) {
        setUser(data);
      } else {
        setError("Usuario no encontrado");
      }
    })
    .catch(() => setError("Error al cargar usuario"));
}, [id]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalle de usuario</h2>
      <p><b>Nombre:</b> {user.Nombre}</p>
      <p><b>Apellido:</b> {user.Apellido}</p>
      <p><b>Dirección:</b> {user.Direccion}</p>
      <p><b>DNI:</b> {user.Dni}</p>
      <p><b>Teléfono:</b> {user.Teléfono}</p>
      <p><b>Fecha de nacimiento:</b> {user["Fecha de nacimiento"]}</p>
      <p><b>Email:</b> {user.Email}</p>
      <a href={`/form?id=${user.id}`}>Editar</a>{" | "}
      <a href="/">Volver</a>
    </div>
  );
}