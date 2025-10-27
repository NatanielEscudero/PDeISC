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

  // 🔄 Cargar íconos dinámicos desde la BD o mock
  const loadDynamicIcons = async () => {
    try {
      const response = await apiService.components.getAll();
      const components = Array.isArray(response?.data) ? response.data : [];
      console.log("🔍 Íconos dinámicos cargados:", components);

      setDynamicIcons(components.filter((comp) => comp.isActive));
    } catch (error) {
      console.error("❌ Error cargando íconos dinámicos:", error);
      setDynamicIcons([]);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Esperar a que el backend esté listo antes de pedir íconos
  useEffect(() => {
    const tryLoadIcons = async () => {
      let success = false;

      for (let i = 0; i < 5; i++) { // 5 intentos, cada 2 segundos
        const backendOk = await apiService.checkBackend();
        if (backendOk) {
          console.log("✅ Backend conectado, cargando íconos...");
          await loadDynamicIcons();
          success = true;
          break;
        } else {
          console.log(`⏳ Backend aún desconectado (intento ${i + 1}/5)...`);
          await new Promise((r) => setTimeout(r, 2000));
        }
      }

      if (!success) {
        console.warn("⚠️ No se pudo conectar al backend, usando íconos mock");
        await loadDynamicIcons(); // carga mock igualmente
      }
    };

    tryLoadIcons();
  }, []);

  // 🧩 Manejo de login/logout
  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpenWindows(openWindows.filter((w) => w.id !== "login"));
    loadDynamicIcons(); // recargar íconos después del login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setOpenWindows(openWindows.filter((w) => w.id !== "admin"));
  };

  // 🖥️ Íconos base
  const baseIcons = [
    {
      id: "login",
      label: "Login",
      component: <Login onLogin={handleLogin} onLogout={handleLogout} />,
      icon: "/icons/login.png",
      x: 100,
      y: 80,
    },
    {
      id: "projects",
      label: "Projects",
      component: <Projects />,
      icon: "/icons/projects.png",
      x: 200,
      y: 80,
    },
  ];

  if (isLoggedIn) {
    baseIcons.push({
      id: "admin",
      label: "Admin",
      component: <Admin onComponentsUpdate={loadDynamicIcons} />,
      icon: "/icons/admin.png",
      x: 300,
      y: 80,
    });
  }

  // 🧩 Combinar base + dinámicos
  const allIcons = [
    ...baseIcons,
    ...dynamicIcons.map((comp, index) => ({
      id: comp._id,
      label: comp.title,
      component: <DynamicComponent component={comp} />,
      icon: comp.icon?.startsWith("http") ? comp.icon : (comp.icon || "/icons/default.png"),
      x: comp.windowConfig?.position?.x || 100 + index * 100,
      y: comp.windowConfig?.position?.y || 200,
      windowConfig: comp.windowConfig,
    })),
  ];

  // 🪟 Control de ventanas
  const bringToFront = (id) => {
    setZIndexCounter((prev) => {
      const newZIndex = prev + 1;
      setOpenWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id ? { ...win, zIndex: newZIndex } : win
        )
      );
      return newZIndex;
    });
  };

  const toggleWindow = (icon) => {
    const existingWindow = openWindows.find((w) => w.id === icon.id);

    if (existingWindow) {
      bringToFront(icon.id);
      if (existingWindow.minimized) {
        restoreWindow(icon.id);
      }
    } else {
      setZIndexCounter((prev) => {
        const newZIndex = prev + 1;
        setOpenWindows((prevWindows) => [
          ...prevWindows,
          {
            ...icon,
            minimized: false,
            zIndex: newZIndex,
          },
        ]);
        return newZIndex;
      });
    }
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const restoreWindow = (id) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false } : w))
    );
    bringToFront(id);
  };

  const updateWindowPosition = (id, newX, newY) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, x: newX, y: newY } : w
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
        {allIcons.map((icon) => (
          <div
            key={icon.id}
            className="desktop-icon"
            onClick={() => toggleWindow(icon)}
          >
            <div className="icon-image">
              <img
                src={icon.icon.startsWith("http") ? icon.icon : icon.icon}
                alt={icon.label}
                onError={(e) => (e.target.src = "/icons/default.png")}
              />
            </div>
            <span>{icon.label}</span>
          </div>
        ))}
      </div>

      {/* VENTANAS */}
      <div className="windows-layer">
        {openWindows.map(
          (win) =>
            !win.minimized && (
              <Window
                key={win.id}
                title={win.label}
                style={{
                  top: win.y,
                  left: win.x,
                  zIndex: win.zIndex || 100,
                  width: win.windowConfig?.width || 400,
                  height: win.windowConfig?.height || 300,
                }}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onClick={() => bringToFront(win.id)}
                onHeaderClick={() => bringToFront(win.id)}
                onPositionChange={(x, y) =>
                  updateWindowPosition(win.id, x, y)
                }
              >
                {win.component}
              </Window>
            )
        )}
      </div>
    </div>
  );
}



