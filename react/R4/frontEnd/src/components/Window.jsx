import React, { useState, useRef, useEffect } from "react";

export default function Window({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  style, 
  onClick, 
  onHeaderClick,
  onPositionChange
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Iniciar arrastre - VERSIÓN MEJORADA
  const startDrag = (e) => {
    if (isMaximized) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (onHeaderClick) {
      onHeaderClick();
    }
  };

  // Durante el arrastre - VERSIÓN MEJORADA
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      e.preventDefault();
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      if (onPositionChange) {
        onPositionChange(newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging, dragOffset, onPositionChange]);

  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    if (callback) callback();
  };

  const handleWindowClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <div
      ref={windowRef}
      className={`window ${isMaximized ? "maximized" : ""} ${isDragging ? "dragging" : ""}`}
      style={{ 
        position: "absolute",
        ...style
      }}
      onClick={handleWindowClick}
    >
      <div 
        className="window-titlebar" 
        onMouseDown={startDrag}
      >
        <span>{title}</span>
        <div className="window-buttons">
          <button 
            className="minimize" 
            onClick={(e) => handleButtonClick(e, onMinimize)}
          >
            🗕
          </button>
          <button
            className="maximize"
            onClick={(e) => handleButtonClick(e, handleMaximize)}
          >
            {isMaximized ? "🗗" : "◻"}
          </button>
          <button 
            className="close" 
            onClick={(e) => handleButtonClick(e, onClose)}
          >
            x
          </button>
        </div>
      </div>

      <div className="window-content">{children}</div>
    </div>
  );
}