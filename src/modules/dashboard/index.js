import React from 'react';
import AdminDashboard from './AdminDashboard';
import EstudianteDashboard from './EstudianteDashboard';

function DashboardModule({ usuario }) {
  if (usuario.rol === 'admin') {
    return <AdminDashboard usuario={usuario} />;
  }
  return <EstudianteDashboard usuario={usuario} />;
}

export default DashboardModule;
