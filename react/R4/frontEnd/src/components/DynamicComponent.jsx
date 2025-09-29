import React from "react";

export default function DynamicComponent({ component }) {
  // Renderizar contenido dinámico basado en el tipo de componente
  const renderContent = () => {
    switch (component.type) {
      case "hero":
        return (
          <div className="dynamic-hero">
            <h1>{component.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          </div>
        );
      
      case "about":
        return (
          <div className="dynamic-about">
            <h2>{component.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          </div>
        );
      
      case "skills":
        return (
          <div className="dynamic-skills">
            <h2>{component.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          </div>
        );
      
      case "contact":
        return (
          <div className="dynamic-contact">
            <h2>{component.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          </div>
        );
      
      case "projects":
        // Podría redirigir al componente Projects existente
        return <Projects />;
      
      default:
        return (
          <div className="dynamic-custom">
            <h2>{component.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: component.content }} />
          </div>
        );
    }
  };

  return (
    <div className="dynamic-component">
      {renderContent()}
    </div>
  );
}