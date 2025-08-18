import { useEffect, useState } from "react";
import { getUser } from "../api/users";

export default function Detail() {
  const id = window.location.pathname.split("/").pop();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id).then(setUser);
  }, [id]);

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