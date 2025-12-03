import React, { useState } from 'react';
import DashboardModule from '../modules/dashboard';
import CursosModule from '../modules/cursos';
import InscripcionesModule from '../modules/inscripciones';
import ReportesModule from '../modules/reportes';
import UsuariosModule from '../modules/usuarios';

function Portal({ usuario, setUsuario }) {
  const [selected, setSelected] = useState('dashboard');

  const handleRoleChange = e => {
    const nuevo = { ...usuario, rol: e.target.value };
    setUsuario(nuevo);
    localStorage.setItem('usuario', JSON.stringify(nuevo));
  };

  const renderSelected = () => {
    switch (selected) {
      case 'dashboard':
        return <DashboardModule usuario={usuario} />;
      case 'cursos':
        return <CursosModule />;
      case 'inscripciones':
        return <InscripcionesModule usuario={usuario} />;
      case 'reportes':
        return <ReportesModule usuario={usuario} />;
      case 'usuarios':
        return <UsuariosModule onLogin={setUsuario} />;
      default:
        return <DashboardModule usuario={usuario} />;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <strong>Bienvenido:</strong>
        <span>{usuario?.nombre || 'Usuario'}</span>
        <label style={{ marginLeft: 12 }}>Rol:</label>
        <select value={usuario?.rol || 'estudiante'} onChange={handleRoleChange}>
          <option value="estudiante">Estudiante</option>
          <option value="admin">Admin</option>
        </select>
        <nav style={{ marginLeft: 20 }}>
          <button onClick={() => setSelected('dashboard')}>Dashboard</button>
          <button onClick={() => setSelected('cursos')}>Cursos</button>
          <button onClick={() => setSelected('inscripciones')}>Inscripciones</button>
          <button onClick={() => setSelected('reportes')}>Reportes</button>
          <button onClick={() => setSelected('usuarios')}>Usuarios</button>
        </nav>
      </div>

      <hr />

      <div>
        {renderSelected()}
      </div>
    </div>
  );
}

export default Portal;
