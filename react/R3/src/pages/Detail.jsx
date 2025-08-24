import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../api/users";

export default function Detail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUser(id);
        console.log("Respuesta del backend:", data);
        
        if (data && !data.error) {
          setUser(data);
        } else {
          setError("Usuario no encontrado");
        }
      } catch (err) {
        console.error("Error al cargar usuario:", err);
        setError("Error al cargar usuario");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>No se encontró el usuario</div>;

  return (
    <div className="detail-container">
      <h2>Detalle de usuario</h2>
      <div className="user-details">
        <p><b>ID:</b> {user.id}</p>
        <p><b>Nombre:</b> {user.Nombre || "No especificado"}</p>
        <p><b>Apellido:</b> {user.Apellido || "No especificado"}</p>
        <p><b>Dirección:</b> {user.Direccion || "No especificado"}</p>
        <p><b>DNI:</b> {user.Dni || "No especificado"}</p>
        <p><b>Teléfono:</b> {user.Teléfono || "No especificado"}</p>
        <p><b>Fecha de nacimiento:</b> {user["Fecha de nacimiento"] || "No especificado"}</p>
        <p><b>Email:</b> {user.Email || "No especificado"}</p>
        <p><b>Rol:</b> {user.role || "user"}</p>
      </div>
      <div className="action-buttons">
        <Link to={`/form?id=${user.id}`} className="btn btn-edit">
          Editar
        </Link>
        <Link to="/" className="btn btn-back">
          Volver al listado
        </Link>
      </div>
    </div>
  );
}