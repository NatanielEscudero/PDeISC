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
  const [dynamicComponents, setDynamicComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar componentes dinámicos desde la BD
  useEffect(() => {
    loadDynamicComponents();
  }, []);

  const loadDynamicComponents = async () => {
    try {
      const response = await apiService.components.getAll();
      console.log("📦 Componentes cargados:", response.data);
      setDynamicComponents(response.data.filter(comp => comp.isActive));
    } catch (error) {
      console.error("❌ Error cargando componentes:", error);
      // Si falla, usar componentes por defecto
      setDynamicComponents(getDefaultComponents());
    } finally {
      setLoading(false);
    }
  };

  // Componentes por defecto en caso de error
  const getDefaultComponents = () => [
    {
      _id: "about-default",
      type: "about",
      title: "Sobre Mí",
      content: "<div><h3>¡Hola! Soy Nataniel</h3><p>Desarrollador full-stack con experiencia en React, Node.js y MongoDB.</p></div>",
      icon: "/icons/about.png",
      isActive: true,
      windowConfig: { width: 500, height: 400, position: { x: 200, y: 150 } }
    },
    {
      _id: "skills-default", 
      type: "skills",
      title: "Mis Skills",
      content: "<div><h3>Tecnologías que domino:</h3><p>React, Node.js, MongoDB, Express</p></div>",
      icon: "/icons/skills.png",
      isActive: true,
      windowConfig: { width: 500, height: 400, position: { x: 300, y: 200 } }
    },
    {
      _id: "contact-default",
      type: "contact",
      title: "Contacto",
      content: "<div><h3>¡Hablemos!</h3><p>Email: nataniel@ejemplo.com</p></div>",
      icon: "/icons/contact.png",
      isActive: true, 
      windowConfig: { width: 450, height: 500, position: { x: 400, y: 100 } }
    }
  ];

  // Función para iniciar sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpenWindows(openWindows.filter(w => w.id !== "login"));
    loadDynamicComponents(); // Recargar componentes por si hay cambios con el admin
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
      component: <Admin onComponentsUpdate={loadDynamicComponents} />, 
      icon: "/icons/admin.png", 
      x: 300, y: 80 
    });
  }

  // Combinar íconos base + componentes dinámicos
  const allIcons = [
    ...baseIcons,
    ...dynamicComponents.map(comp => ({
      id: comp._id || comp.type,
      label: comp.title,
      component: <DynamicComponent component={comp} />,
      icon: comp.icon || "/icons/default.png",
      x: comp.windowConfig?.position?.x || 100 + (dynamicComponents.indexOf(comp) * 100),
      y: comp.windowConfig?.position?.y || 200,
      windowConfig: comp.windowConfig
    }))
  ];

  console.log("🎯 Íconos totales:", allIcons.length, allIcons);

  // ... (el resto de las funciones se mantienen igual: bringToFront, toggleWindow, etc.)

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
      bringToFront(icon.id);
      if (existingWindow.minimized) {
        setOpenWindows(prevWindows => 
          prevWindows.map(w => 
            w.id === icon.id ? { ...w, minimized: false } : w
          )
        );
      }
    } else {
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
              <img 
                src={icon.icon} 
                alt={icon.label}
                onError={(e) => {
                  e.target.src = "/icons/default.png";
                }}
              />
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
            onClick={() => bringToFront(win.id)}
            onPositionChange={(x, y) => updateWindowPosition(win.id, x, y)}
          >
            {win.component}
          </Window>
        ))}
      </div>
    </div>
  );
}
