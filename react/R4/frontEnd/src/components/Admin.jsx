import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

export default function Admin({ onComponentsUpdate }) {
  const [activeTab, setActiveTab] = useState("projects"); // "projects" o "components"
  const [projects, setProjects] = useState([]);
  const [components, setComponents] = useState([]);
  
  // Estados para proyectos
  const [newProject, setNewProject] = useState({ 
    title: "", 
    description: "", 
    technologies: "",
    githubUrl: "", 
    demoUrl: "", 
    image: "",
    category: "web",
    featured: false
  });
  const [editProjectId, setEditProjectId] = useState(null);
  
  // Estados para componentes/íconos
  const [newComponent, setNewComponent] = useState({
    type: "custom",
    title: "",
    content: "",
    icon: "",
    windowConfig: {
      width: 400,
      height: 300,
      position: { x: 100, y: 100 }
    }
  });
  const [editComponentId, setEditComponentId] = useState(null);
  const [iconPreview, setIconPreview] = useState("");

  // Cargar datos
  const fetchProjects = () => {
    apiService.projects.getAll()
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error cargando proyectos:", err));
  };

  const fetchComponents = () => {
    apiService.components.getAll()
      .then(res => setComponents(res.data))
      .catch(err => console.error("Error cargando componentes:", err));
  };

  useEffect(() => { 
    fetchProjects();
    fetchComponents();
  }, []);

  // ========== GESTIÓN DE PROYECTOS ==========
  const handleAddProject = () => {
    apiService.projects.create(newProject)
      .then(() => { 
        fetchProjects(); 
        setNewProject({ 
          title: "", description: "", technologies: "", 
          githubUrl: "", demoUrl: "", image: "", 
          category: "web", featured: false 
        }); 
      })
      .catch(err => console.error("Error creando proyecto:", err));
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
      apiService.projects.delete(id)
        .then(() => fetchProjects())
        .catch(err => console.error("Error eliminando proyecto:", err));
    }
  };

  const handleEditProject = (project) => {
    setEditProjectId(project._id);
    setNewProject({ 
      title: project.title, 
      description: project.description, 
      technologies: project.technologies || "",
      githubUrl: project.githubUrl || "", 
      demoUrl: project.demoUrl || "", 
      image: project.image || "",
      category: project.category || "web",
      featured: project.featured || false
    });
  };

  const handleUpdateProject = () => {
    apiService.projects.update(editProjectId, newProject)
      .then(() => { 
        fetchProjects(); 
        setEditProjectId(null); 
        setNewProject({ 
          title: "", description: "", technologies: "", 
          githubUrl: "", demoUrl: "", image: "", 
          category: "web", featured: false 
        }); 
      })
      .catch(err => console.error("Error actualizando proyecto:", err));
  };

  // ========== GESTIÓN DE COMPONENTES/ÍCONOS ==========
  const handleAddComponent = () => {
    apiService.components.create(newComponent)
      .then(() => { 
        fetchComponents(); 
        setNewComponent({
          type: "custom",
          title: "",
          content: "",
          icon: "",
          windowConfig: {
            width: 400,
            height: 300,
            position: { x: 100, y: 100 }
          }
        });
        setIconPreview("");
        
        // Notificar a DesktopIcons para recargar íconos
        if (onComponentsUpdate) {
          onComponentsUpdate();
        }
      })
      .catch(err => console.error("Error creando componente:", err));
  };

  const handleDeleteComponent = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta aplicación?")) {
      apiService.components.delete(id)
        .then(() => {
          fetchComponents();
          // Notificar a DesktopIcons para recargar íconos
          if (onComponentsUpdate) {
            onComponentsUpdate();
          }
        })
        .catch(err => console.error("Error eliminando componente:", err));
    }
  };

  const handleEditComponent = (component) => {
    setEditComponentId(component._id);
    setNewComponent({
      type: component.type,
      title: component.title,
      content: component.content || "",
      icon: component.icon || "",
      windowConfig: component.windowConfig || {
        width: 400,
        height: 300,
        position: { x: 100, y: 100 }
      }
    });
    setIconPreview(component.icon || "");
  };

  const handleUpdateComponent = () => {
    apiService.components.update(editComponentId, newComponent)
      .then(() => { 
        fetchComponents(); 
        setEditComponentId(null); 
        setNewComponent({
          type: "custom",
          title: "",
          content: "",
          icon: "",
          windowConfig: {
            width: 400,
            height: 300,
            position: { x: 100, y: 100 }
          }
        });
        setIconPreview("");
        
        // Notificar a DesktopIcons para recargar íconos
        if (onComponentsUpdate) {
          onComponentsUpdate();
        }
      })
      .catch(err => console.error("Error actualizando componente:", err));
  };

  // Manejo de subida de imagen para íconos
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setIconPreview(imageUrl);
        setNewComponent({ ...newComponent, icon: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      
      {/* Tabs de navegación */}
      <div className="admin-tabs">
        <button 
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          Proyectos
        </button>
        <button 
          className={activeTab === "components" ? "active" : ""}
          onClick={() => setActiveTab("components")}
        >
          Aplicaciones
        </button>
      </div>

      {/* TAB DE PROYECTOS */}
      {activeTab === "projects" && (
        <div className="admin-section">
          <h3>Gestión de Proyectos</h3>
          
          <div className="form-grid">
            <input 
              placeholder="Título del proyecto" 
              value={newProject.title} 
              onChange={e => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea 
              placeholder="Descripción" 
              value={newProject.description} 
              onChange={e => setNewProject({ ...newProject, description: e.target.value })}
              rows="3"
            />
            <input 
              placeholder="Tecnologías (separadas por coma)" 
              value={newProject.technologies} 
              onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
            />
            <input 
              placeholder="URL de GitHub" 
              value={newProject.githubUrl} 
              onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
            />
            <input 
              placeholder="URL de Demo" 
              value={newProject.demoUrl} 
              onChange={e => setNewProject({ ...newProject, demoUrl: e.target.value })}
            />
            <input 
              placeholder="URL de imagen" 
              value={newProject.image} 
              onChange={e => setNewProject({ ...newProject, image: e.target.value })}
            />
            
            <select 
              value={newProject.category}
              onChange={e => setNewProject({ ...newProject, category: e.target.value })}
            >
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="other">Otros</option>
            </select>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={newProject.featured}
                onChange={e => setNewProject({ ...newProject, featured: e.target.checked })}
              />
              Proyecto destacado
            </label>
          </div>
          
          <div className="form-actions">
            {editProjectId ? (
              <>
                <button className="btn-update" onClick={handleUpdateProject}>Actualizar Proyecto</button>
                <button className="btn-cancel" onClick={() => setEditProjectId(null)}>Cancelar</button>
              </>
            ) : (
              <button className="btn-add" onClick={handleAddProject}>Agregar Proyecto</button>
            )}
          </div>

          {/* Lista de proyectos */}
          <div className="items-list">
            <h4>Proyectos Existentes ({projects.length})</h4>
            {projects.map(project => (
              <div key={project._id} className="item-card">
                <div className="item-info">
                  <strong>{project.title}</strong>
                  <span>{project.category} • {project.featured ? "⭐ Destacado" : "Normal"}</span>
                </div>
                <div className="item-actions">
                  <button className="btn-edit" onClick={() => handleEditProject(project)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDeleteProject(project._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB DE COMPONENTES/ÍCONOS */}
      {activeTab === "components" && (
        <div className="admin-section">
          <h3>Gestión de Aplicaciones</h3>
          <p>Crea nuevas aplicaciones que aparecerán como íconos en el escritorio</p>
          
          <div className="form-grid">
            <select 
              value={newComponent.type}
              onChange={e => setNewComponent({ ...newComponent, type: e.target.value })}
            >
              <option value="hero">Hero</option>
              <option value="about">About</option>
              <option value="skills">Skills</option>
              <option value="projects">Projects</option>
              <option value="contact">Contact</option>
              <option value="custom">Personalizado</option>
            </select>
            
            <input 
              placeholder="Título de la aplicación" 
              value={newComponent.title} 
              onChange={e => setNewComponent({ ...newComponent, title: e.target.value })}
            />
            
            <textarea 
              placeholder="Contenido (puede ser HTML o texto simple)" 
              value={newComponent.content} 
              onChange={e => setNewComponent({ ...newComponent, content: e.target.value })}
              rows="4"
            />
            
            {/* Subida de ícono */}
            <div className="icon-upload">
              <label>Ícono de la aplicación:</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleIconChange}
              />
              {iconPreview && (
                <div className="icon-preview">
                  <img src={iconPreview} alt="Preview" />
                  <span>Vista previa del ícono</span>
                </div>
              )}
            </div>
            
            <div className="window-config">
              <label>Configuración de ventana:</label>
              <div className="config-inputs">
                <input 
                  type="number" 
                  placeholder="Ancho" 
                  value={newComponent.windowConfig.width}
                  onChange={e => setNewComponent({
                    ...newComponent,
                    windowConfig: {
                      ...newComponent.windowConfig,
                      width: parseInt(e.target.value) || 400
                    }
                  })}
                />
                <input 
                  type="number" 
                  placeholder="Alto" 
                  value={newComponent.windowConfig.height}
                  onChange={e => setNewComponent({
                    ...newComponent,
                    windowConfig: {
                      ...newComponent.windowConfig,
                      height: parseInt(e.target.value) || 300
                    }
                  })}
                />
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            {editComponentId ? (
              <>
                <button className="btn-update" onClick={handleUpdateComponent}>Actualizar Aplicación</button>
                <button className="btn-cancel" onClick={() => setEditComponentId(null)}>Cancelar</button>
              </>
            ) : (
              <button className="btn-add" onClick={handleAddComponent}>Crear Aplicación</button>
            )}
          </div>

          {/* Lista de componentes */}
          <div className="items-list">
            <h4>Aplicaciones Existentes ({components.length})</h4>
            {components.map(component => (
              <div key={component._id} className="item-card">
                <div className="item-info">
                  <strong>{component.title}</strong>
                  <span>Tipo: {component.type} • {component.isActive ? "✅ Activa" : "❌ Inactiva"}</span>
                  {component.icon && (
                    <img src={component.icon} alt="Ícono" className="component-icon" />
                  )}
                </div>
                <div className="item-actions">
                  <button className="btn-edit" onClick={() => handleEditComponent(component)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDeleteComponent(component._id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}