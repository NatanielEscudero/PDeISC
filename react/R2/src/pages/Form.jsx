import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const onlyTextRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

const Form = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateFields = () => {
    if (!title.trim() || !detail.trim()) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (!onlyTextRegex.test(title) || !onlyTextRegex.test(detail)) {
      setError('Solo se permite texto (sin números ni símbolos).');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      addTask({ title, detail, completed: false });
      setTitle('');
      setDetail('');
      navigate('/');
    }
  };

  return (
    <section>
      <h3>Agregar tarea</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título de la tarea"
        />
        <textarea
          value={detail}
          onChange={e => setDetail(e.target.value)}
          placeholder="Detalles de la tarea"
          rows={3}
          style={{ width: '80%', padding: '0.7em 1em', borderRadius: '8px', border: '1px solid #bfcbe3' }}
        />
        {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
        <button type="submit">Agregar</button>
      </form>
    </section>
  );
};

export default Form;