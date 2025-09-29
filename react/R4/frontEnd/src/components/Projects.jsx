import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await apiService.projects.getAll();
        setProjects(response.data);
      } catch (err) {
        console.error("Error cargando proyectos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // ... resto del código
  if (loading) {
    return (
      <div className="window-content-inner">
        <h2>Mis Proyectos</h2>
        <p>Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div className="window-content-inner">
      <h2>Mis Proyectos</h2>
      
      {projects.length === 0 ? (
        <p>No hay proyectos para mostrar.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
              )}
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              {project.technologies && (
                <div className="technologies">
                  {project.technologies.split(',').map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="project-links">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}