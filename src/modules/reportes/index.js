import React from 'react';
import AdminReportes from './AdminReportes';
import EstudianteReportes from './EstudianteReportes';

function ReportesModule({ usuario }) {
  if (usuario.rol === 'admin') {
    return <AdminReportes />;
  }
  return <EstudianteReportes usuario={usuario} />;
}

export default ReportesModule;
