import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function UsuariosModule({ onLogin }) {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  return (
    <div>
      <h2>Usuarios</h2>
      {mostrarRegistro ? (
        <>
          <Register />
          <button onClick={() => setMostrarRegistro(false)}>Ya tengo cuenta</button>
        </>
      ) : (
        <>
          <Login onLogin={onLogin} />
          <button onClick={() => setMostrarRegistro(true)}>Crear cuenta</button>
        </>
      )}
    </div>
  );
}

export default UsuariosModule;
