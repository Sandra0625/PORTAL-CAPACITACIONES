// src/App.js
import React, { useEffect, useState } from 'react';
import UsuariosModule from './modules/usuarios';
import DashboardModule from './modules/dashboard';
import Portal from './components/Portal';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <div>
      <h1>Portal de Capacitaciones</h1>
      {!usuario ? (
        <UsuariosModule onLogin={setUsuario} />
      ) : (
        <>
          <button onClick={handleLogout}>Cerrar sesión</button>
          <Portal usuario={usuario} setUsuario={setUsuario} />
        </>
      )}
    </div>
  );
}

export default App;

