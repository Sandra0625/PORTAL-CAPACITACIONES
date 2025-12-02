// src/modules/cursos/CursoList.js
import React from 'react';
import CursoItem from './CursoItem';

function CursoList({ cursos, onDelete }) {
  return (
    <div>
      <h2>Lista de Cursos</h2>
      <ul>
        {cursos.map(curso => (
          <CursoItem key={curso._id} curso={curso} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default CursoList;
