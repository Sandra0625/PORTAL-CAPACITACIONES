// src/modules/cursos/CursoItem.js
import React from 'react';
import api from '../../api';

function CursoItem({ curso, onDelete }) {
  const handleDelete = async () => {
    await api.delete(`/cursos/${curso._id}`);
    onDelete(curso._id);
  };

  return (
    <li>
      {curso.titulo} - {curso.duracion} horas
      <button onClick={handleDelete}>Eliminar</button>
    </li>
  );
}

export default CursoItem;
