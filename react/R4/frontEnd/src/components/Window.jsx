import React, { useState } from "react";

export default function Window({ title, children, onClose, onMinimize, style }) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div
      className={`window ${isMaximized ? "maximized" : ""}`}
      style={{ position: "absolute", ...style }}
    >
      {/* Barra superior */}
      <div className="window-titlebar">
        <span>{title}</span>
        <div className="window-buttons">
          <button className="minimize" onClick={onMinimize}>🗕</button>
          <button
            className="maximize"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? "🗗" : "◻"}
          </button>
          <button className="close" onClick={onClose}>x</button>
        </div>
      </div>

      <div className="window-content">{children}</div>
    </div>
  );
}
