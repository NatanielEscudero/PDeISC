import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", link: "", image: "" });

  // Traer proyectos
  const fetchProjects = () => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchProjects(); }, []);

  // Crear proyecto
  const handleAdd = () => {
    axios.post("http://localhost:5000/api/projects", newProject)
      .then(() => { fetchProjects(); setNewProject({ title: "", description: "", link: "", image: "" }); })
      .catch(err => console.error(err));
  };

  // Borrar proyecto
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
      .then(() => fetchProjects())
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Panel de Administración</h2>
      
      <div className="mb-6">
        <input placeholder="Título" className="border p-2 mr-2" 
          value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })}/>
        <input placeholder="Descripción" className="border p-2 mr-2" 
          value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })}/>
        <input placeholder="Link" className="border p-2 mr-2" 
          value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })}/>
        <input placeholder="Imagen URL" className="border p-2 mr-2" 
          value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })}/>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Agregar</button>
      </div>

      <ul>
        {projects.map(p => (
          <li key={p._id} className="flex justify-between items-center border p-2 mb-2">
            <span>{p.title}</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
