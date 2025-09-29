import { useState } from "react";
import { apiService } from "../services/apiService";

export default function Login({ onLogin, onLogout }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiService.auth.login(credentials);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        onLogin(); // Notificar a DesktopIcons
      }
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Error de login:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout(); // Notificar a DesktopIcons
  };

  // Si ya está logueado, mostrar opción de logout
  if (localStorage.getItem("token")) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Sesión Activa</h2>
          <p>Ya has iniciado sesión en el sistema.</p>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <p>Accede al panel de administración</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="usuario"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="contraseña"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        
      </div>
    </div>
  );
}