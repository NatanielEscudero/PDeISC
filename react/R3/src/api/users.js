const API_URL = "http://localhost:3000/usuarios";

export async function getUsers() {
  const res = await fetch(API_URL);
  return res.json();
} // obtener todos los usuarios

export async function getUser(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
} // obtener un usuario por ID

export async function createUser(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
} // crear un usuario

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}  // actualizar un usuario

export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
} // eliminar un usuario