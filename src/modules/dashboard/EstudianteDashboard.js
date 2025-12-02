import React from 'react';
import InscripcionesModule from '../inscripciones';

function EstudianteDashboard({ usuario }) {
  return (
    <div>
      <h2>Dashboard Estudiante</h2>
      <p>Bienvenido {usuario.nombre}</p>
      <InscripcionesModule usuario={usuario} />
    </div>
  );
}

export default EstudianteDashboard;
