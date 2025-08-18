import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/users";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []); // cargar usuarios al montar

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
    }
  }; // manejar eliminación de usuario

  return (
    <div>
      <h1>Usuarios</h1>
      <a href="/form">Crear usuario</a>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Fecha de nacimiento</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.Nombre}</td>
              <td>{user.Apellido}</td>
              <td>{user.Direccion}</td>
              <td>{user.Dni}</td>
              <td>{user.Teléfono}</td>
              <td>{user["Fecha de nacimiento"]}</td>
              <td>{user.Email}</td>
              <td>
                <a href={`/detail/${user.id}`}>Ver</a>{" | "}
                <a href={`/form?id=${user.id}`}>Editar</a>{" | "}
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  // renderizar lista de usuarios
}