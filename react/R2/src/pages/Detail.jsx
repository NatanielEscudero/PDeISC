import React from 'react';
import { Link } from 'react-router-dom';

const Detail = ({ task }) => {
  if (!task) {
    return (
      <section>
        <h3>No hay tarea seleccionada</h3>
        <Link to="/">Volver</Link>
      </section>
    );
  }

  return (
    <section>
      <h3>Detalle de la tarea</h3>
      <p><strong>Título:</strong> {task.title}</p>
      <p><strong>Detalle:</strong> {task.detail || 'Sin detalles'}</p>
      <Link to="/">Volver</Link>
    </section>
  );
};

export default Detail;