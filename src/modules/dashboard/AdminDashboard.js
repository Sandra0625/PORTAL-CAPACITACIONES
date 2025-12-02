import React from 'react';
import CursosModule from '../cursos';

function AdminDashboard({ usuario }) {
  return (
    <div>
      <h2>Dashboard Admin</h2>
      <p>Bienvenido {usuario.nombre}</p>
      <CursosModule />
      {/* Aquí luego podemos agregar reportes y gestión de usuarios */}
    </div>
  );
}

export default AdminDashboard;
