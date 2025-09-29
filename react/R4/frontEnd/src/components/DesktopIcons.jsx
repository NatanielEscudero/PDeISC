import React, { useState } from "react";
import Window from "./Window";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Login from "./Login";
import DesktopAdmin from "./DesktopAdmin";

export default function DesktopIcons() {
  const [openWindows, setOpenWindows] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [zIndexCounter, setZIndexCounter] = useState(100); // Contador para z-index

  // Función para iniciar sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpenWindows(openWindows.filter(w => w.id !== "login"));
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setOpenWindows(openWindows.filter(w => w.id !== "admin"));
  };

  // Lista de íconos
  const icons = [
    { id: "hero", label: "Hero", component: <Hero />, icon: "/icons/hero.png", x: 100, y: 80 },
    { id: "about", label: "About", component: <About />, icon: "/icons/about.png", x: 200, y: 80 },
    { id: "skills", label: "Skills", component: <Skills />, icon: "/icons/skills.png", x: 300, y: 80 },
    { id: "projects", label: "Projects", component: <Projects />, icon: "/icons/projects.png", x: 400, y: 80 },
    { id: "contact", label: "Contact", component: <Contact />, icon: "/icons/contact.png", x: 500, y: 80 },
    { id: "login", label: "Login", component: <Login onLogin={handleLogin} onLogout={handleLogout} />, icon: "/icons/login.png", x: 100, y: 200 }
  ];

  // Solo mostrar Admin si está logueado
  if (isLoggedIn) {
    icons.push({ id: "admin", label: "Admin", component: <DesktopAdmin onClose={() => closeWindow("admin")} />, icon: "/icons/admin.png", x: 200, y: 200 });
  }

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
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const restoreWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, minimized: false } : w
    ));
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

  return (
    <div className="desktop">
      {/* ICONOS */}
      <div className="desktop-icons">
        {icons.map(icon => (
          <div key={icon.id} className="desktop-icon" onClick={() => toggleWindow(icon)}>
            <div className="icon-image"><img src={icon.icon} alt={icon.label} /></div>
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
      zIndex: win.zIndex || 100
    }}
    onClose={() => closeWindow(win.id)}
    onMinimize={() => minimizeWindow(win.id)}
    onClick={() => handleWindowClick(win.id)}
    onHeaderClick={() => handleWindowClick(win.id)}
    onPositionChange={(x, y) => updateWindowPosition(win.id, x, y)} // ← Nuevo prop
  >
    {win.id === "login"
      ? <Login onLogin={handleLogin} onLogout={handleLogout} />
      : win.component
    }
  </Window>
))}
      </div>
    </div>
  );
}

