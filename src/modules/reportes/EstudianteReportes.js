import React, { useEffect, useState } from 'react';
import api from '../../api';

function EstudianteReportes({ usuario }) {
  const [misCursos, setMisCursos] = useState([]);

  useEffect(() => {
    async function fetchInscripciones() {
      const res = await api.get(`/inscripciones?usuarioId=${usuario._id}`);
      setMisCursos(res.data);
    }
    fetchInscripciones();
  }, [usuario]);

  return (
    <div>
      <h2>Mis Reportes</h2>
      <ul>
        {misCursos.map(ins => (
          <li key={ins._id}>{ins.curso.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default EstudianteReportes;
