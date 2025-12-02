import React, { useEffect, useState } from 'react';
import api from '../../api';

function AdminReportes() {
  const [stats, setStats] = useState({ cursos: 0, inscripciones: 0 });

  useEffect(() => {
    async function fetchStats() {
      const cursos = await api.get('/cursos');
      const inscripciones = await api.get('/inscripciones');
      setStats({ cursos: cursos.data.length, inscripciones: inscripciones.data.length });
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Reportes Administrador</h2>
      <p>Total de cursos: {stats.cursos}</p>
      <p>Total de inscripciones: {stats.inscripciones}</p>
    </div>
  );
}

export default AdminReportes;
