import { useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "../api/users";

const initialState = {
  Nombre: "",
  Apellido: "",
  Direccion: "",
  Dni: "",
  Teléfono: "",
  "Fecha de nacimiento": "",
  Email: "",
}; // estado inicial del formulario

export default function Form() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getUser(id).then(data => setForm(data));
    }
  }, [id]);  // cargar datos si hay ID

  const validate = () => {
    const newErrors = {};
    if (!form.Nombre) newErrors.Nombre = "El nombre es obligatorio";
    if (!form.Apellido) newErrors.Apellido = "El apellido es obligatorio";
    if (!form.Direccion) newErrors.Direccion = "La dirección es obligatoria";
    if (!form.Dni || isNaN(form.Dni) || form.Dni.length < 7) newErrors.Dni = "DNI inválido";
    if (!form.Teléfono) newErrors.Teléfono = "El teléfono es obligatorio";
    if (!form["Fecha de nacimiento"]) newErrors["Fecha de nacimiento"] = "La fecha es obligatoria";
    if (!form.Email || !/\S+@\S+\.\S+/.test(form.Email)) newErrors.Email = "Email inválido";
    return newErrors;
  };  // validación del formulario

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; // manejar cambios en el formulario

  const handleSubmit = async e => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    if (id) {
      await updateUser(id, form);
    } else {
      await createUser(form);
    }
    window.location.href = "/";
  };  // manejar envío del formulario

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Editar usuario" : "Crear usuario"}</h2>
      <input
        name="Nombre"
        value={form.Nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      {errors.Nombre && <span>{errors.Nombre}</span>}
      <input
        name="Apellido"
        value={form.Apellido}
        onChange={handleChange}
        placeholder="Apellido"
      />
      {errors.Apellido && <span>{errors.Apellido}</span>}
      <input
        name="Direccion"
        value={form.Direccion}
        onChange={handleChange}
        placeholder="Dirección"
      />
      {errors.Direccion && <span>{errors.Direccion}</span>}
      <input
        name="Dni"
        value={form.Dni}
        onChange={handleChange}
        placeholder="DNI"
        maxLength={11}
      />
      {errors.Dni && <span>{errors.Dni}</span>}
      <input
        name="Teléfono"
        value={form.Teléfono}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      {errors.Teléfono && <span>{errors.Teléfono}</span>}
      <input
        name="Fecha de nacimiento"
        value={form["Fecha de nacimiento"]}
        onChange={handleChange}
        placeholder="Fecha de nacimiento"
        type="date"
      />
      {errors["Fecha de nacimiento"] && <span>{errors["Fecha de nacimiento"]}</span>}
      <input
        name="Email"
        value={form.Email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />
      {errors.Email && <span>{errors.Email}</span>}
      <button type="submit">Guardar</button>
    </form>
  );  // renderizar formulario
}