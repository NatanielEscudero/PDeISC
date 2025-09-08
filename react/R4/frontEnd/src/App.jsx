import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Taskbar from "./components/Taskbar";
import Window from "./components/Window";
import DesktopIcons from "./components/DesktopIcons";
import DynamicWindowContent from "./components/DynamicWindowContent";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [windows, setWindows] = useState([]);

  const handleOpenWindow = (component) => {
    const newWindow = {
      id: Date.now(),
      title: component.title,
      component: component.type,
      data: component.data,
      content: component.content,
      minimized: false,
      position: component.config?.position || { x: 100, y: 100 },
      size: component.config || { width: 400, height: 300 }
    };
    setWindows(prev => [...prev, newWindow]);
  };

  const handleCloseWindow = (id) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const handleMinimizeWindow = (id) => {
    setWindows(prev => prev.map(win =>
      win.id === id ? { ...win, minimized: !win.minimized } : win
    ));
  };

  const handleRestoreWindow = (id) => {
    setWindows(prev => prev.map(win =>
      win.id === id ? { ...win, minimized: false } : win
    ));
  };

  return (
    <Router>
      <div className="desktop">
        <DesktopIcons onOpenWindow={handleOpenWindow} />
        
        {windows.map(win => (
          !win.minimized && (
            <Window
              key={win.id}
              title={win.title}
              onClose={() => handleCloseWindow(win.id)}
              onMinimize={() => handleMinimizeWindow(win.id)}
              style={{
                left: win.position.x,
                top: win.position.y,
                width: win.size.width,
                height: win.size.height
              }}
            >
              <DynamicWindowContent component={win} />
            </Window>
          )
        ))}
      </div>

      <Taskbar 
        windows={windows} 
        onRestore={handleRestoreWindow} 
      />

      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />} />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
}
