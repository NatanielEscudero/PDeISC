import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ tasks, deleteTask, selectTask, completeTask }) => {
  const navigate = useNavigate();

  const handleDetail = (task) => {
    selectTask(task);
    navigate('/detail');
  };

  return (
    <section className='Home'>
      <h3>Lista de tareas</h3>
      <ul>
        {tasks.length === 0 ? (
          <li>No hay tareas</li>
        ) : (
          tasks.map((t, i) => (
            <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</strong>
                {t.detail && <span style={{ marginLeft: '1em', color: '#555' }}>({t.detail})</span>}
                {t.completed && <span style={{ marginLeft: '1em', color: 'green' }}>✔ Completada</span>}
              </div>
              <div>
                <button
                  onClick={() => handleDetail(t)}
                  style={{
                    marginRight: '0.5em',
                    background: '#3498db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4em 1em',
                    cursor: 'pointer'
                  }}
                >
                  Ver detalle
                </button>
                <button
                  onClick={() => completeTask(i)}
                  style={{
                    marginRight: '0.5em',
                    background: '#27ae60',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4em 1em',
                    cursor: 'pointer'
                  }}
                  disabled={t.completed}
                >
                  Completar tarea
                </button>
                <button
                  onClick={() => deleteTask(i)}
                  style={{
                    background: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4em 1em',
                    cursor: 'pointer'
                  }}
                >
                  Borrar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <Link to="/form">Agregar nueva tarea</Link>
    </section>
  );
};

export default Home;