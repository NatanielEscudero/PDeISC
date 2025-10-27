import React, { useState, useEffect } from "react";
import Window from "./Window";
import Projects from "./Projects";
import Login from "./Login";
import Admin from "./Admin";
import DynamicComponent from "./DynamicComponent";
import { apiService } from "../services/apiService";

export default function DesktopIcons() {
  const [openWindows, setOpenWindows] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [dynamicIcons, setDynamicIcons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar íconos dinámicos desde la BD
  useEffect(() => {
    loadDynamicIcons();
  }, []);

const loadDynamicIcons = async () => {
  try {
    console.log("Cargando íconos dinámicos...");
    const response = await apiService.components.getAll();

    if (!response || !response.data) {
      console.warn("Respuesta inválida del servidor:", response);
      setDynamicIcons([]);
      return;
    }

    const icons = Array.isArray(response.data)
      ? response.data
      : response.data.components || [];

    console.log("Íconos recibidos:", icons);

    setDynamicIcons(icons.filter(comp => comp.isActive));
  } catch (error) {
    console.error("Error cargando íconos dinámicos:", error);
  } finally {
    setLoading(false);
  }
};


  // ... el resto del código se mantiene igual

  // Función para iniciar sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpenWindows(openWindows.filter(w => w.id !== "login"));
    loadDynamicIcons(); // Recargar íconos por si hay cambios con el admin
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setOpenWindows(openWindows.filter(w => w.id !== "admin"));
  };

  // Íconos base (fijos)
  const baseIcons = [
    { 
      id: "login", 
      label: "Login", 
      component: <Login onLogin={handleLogin} onLogout={handleLogout} />, 
      icon: "/icons/login.png", 
      x: 100, y: 80 
    },
    { 
      id: "projects", 
      label: "Projects", 
      component: <Projects />, 
      icon: "/icons/projects.png", 
      x: 200, y: 80 
    }
  ];

  // Si está logueado, agregar Admin
  if (isLoggedIn) {
    baseIcons.push({ 
      id: "admin", 
      label: "Admin", 
      component: <Admin onComponentsUpdate={loadDynamicIcons} />, 
      icon: "/icons/admin.png", 
      x: 300, y: 80 
    });
  }

  // Combinar íconos base + dinámicos
  const allIcons = [
    ...baseIcons,
    ...dynamicIcons.map(comp => ({
      id: comp._id,
      label: comp.title,
      component: <DynamicComponent component={comp} />,
      icon: comp.icon || "/icons/default.png",
      x: comp.windowConfig?.position?.x || 100 + (dynamicIcons.indexOf(comp) * 100),
      y: comp.windowConfig?.position?.y || 200,
      windowConfig: comp.windowConfig
    }))
  ];

  // Función para traer ventana al frente
  const bringToFront = (id) => {
    setZIndexCounter(prev => {
      const newZIndex = prev + 1;
      setOpenWindows(prevWindows => 
        prevWindows.map(win => 
          win.id === id 
            ? { ...win, zIndex: newZIndex }
            : win
        )
      );
      return newZIndex;
    });
  };

  const toggleWindow = (icon) => {
    const existingWindow = openWindows.find(w => w.id === icon.id);
    
    if (existingWindow) {
      // Si ya está abierta, traer al frente y restaurar si está minimizada
      bringToFront(icon.id);
      if (existingWindow.minimized) {
        restoreWindow(icon.id);
      }
    } else {
      // Si no está abierta, abrir nueva ventana con z-index alto
      setZIndexCounter(prev => {
        const newZIndex = prev + 1;
        setOpenWindows(prevWindows => [...prevWindows, { 
          ...icon, 
          minimized: false, 
          zIndex: newZIndex 
        }]);
        return newZIndex;
      });
    }
  };

  const closeWindow = (id) => {
    setOpenWindows(prevWindows => prevWindows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows(prevWindows => 
      prevWindows.map(w => 
        w.id === id ? { ...w, minimized: true } : w
      )
    );
  };

  const restoreWindow = (id) => {
    setOpenWindows(prevWindows => 
      prevWindows.map(w => 
        w.id === id ? { ...w, minimized: false } : w
      )
    );
    bringToFront(id); // Traer al frente al restaurar
  };

  // Función para manejar clic en la ventana
  const handleWindowClick = (id) => {
    bringToFront(id);
  };

  const updateWindowPosition = (id, newX, newY) => {
    setOpenWindows(prevWindows => 
      prevWindows.map(win => 
        win.id === id 
          ? { ...win, x: newX, y: newY }
          : win
      )
    );
  };

  if (loading) {
    return (
      <div className="desktop">
        <div className="loading-desktop">
          <p>Cargando escritorio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="desktop">
      {/* ICONOS */}
      <div className="desktop-icons">
        {allIcons.map(icon => (
          <div key={icon.id} className="desktop-icon" onClick={() => toggleWindow(icon)}>
            <div className="icon-image">
              <img src={icon.icon} alt={icon.label} />
            </div>
            <span>{icon.label}</span>
          </div>
        ))}
      </div>

      {/* VENTANAS ABIERTAS */}
      <div className="windows-layer">
        {openWindows.map(win => !win.minimized && (
          <Window
            key={win.id}
            title={win.label}
            style={{ 
              top: win.y, 
              left: win.x,
              zIndex: win.zIndex || 100,
              width: win.windowConfig?.width || 400,
              height: win.windowConfig?.height || 300
            }}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onClick={() => handleWindowClick(win.id)}
            onHeaderClick={() => handleWindowClick(win.id)}
            onPositionChange={(x, y) => updateWindowPosition(win.id, x, y)}
          >
            {win.component}
          </Window>
        ))}
      </div>
    </div>
  );

}
