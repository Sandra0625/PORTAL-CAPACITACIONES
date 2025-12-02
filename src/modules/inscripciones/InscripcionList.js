import React from 'react';

function InscripcionList({ inscripciones }) {
  return (
    <div>
      <h3>Mis Inscripciones</h3>
      <ul>
        {inscripciones.map(ins => (
          <li key={ins._id}>
            Curso: {ins.curso.titulo} | Usuario: {ins.usuario.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InscripcionList;

