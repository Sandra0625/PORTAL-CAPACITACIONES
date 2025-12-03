import React, { useState } from 'react';
import api from '../../api';

function InscripcionList({ inscripciones, onUpdate }) {
  const [loadingId, setLoadingId] = useState(null);

  const actualizarProgreso = async (id, value) => {
    setLoadingId(id);
    try {
      const res = await api.put(`/inscripciones/${id}/progreso`, { progreso: value });
      if (onUpdate) onUpdate(res.data);
    } catch (err) {
      console.error(err);
      alert('Error actualizando progreso');
    } finally {
      setLoadingId(null);
    }
  };

  const abrirCertificado = id => {
    window.open(`/api/inscripciones/${id}/certificado`, '_blank');
  };

  return (
    <div>
      <h3>Mis Inscripciones</h3>
      <ul>
        {inscripciones.map(ins => (
          <li key={ins._id} style={{ marginBottom: 12 }}>
            <div><strong>{ins.curso.titulo}</strong> — Inscrito: {new Date(ins.fecha).toLocaleDateString()}</div>
            <div>Progreso: {ins.progreso ?? 0}% {ins.completado ? '(Completado)' : ''}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
              <input type="range" min="0" max="100" value={ins.progreso ?? 0} onChange={e => actualizarProgreso(ins._id, e.target.value)} disabled={loadingId===ins._id} />
              <button onClick={() => actualizarProgreso(ins._id, 100)} disabled={ins.completado || loadingId===ins._id}>Marcar completado</button>
              {ins.completado && <button onClick={() => abrirCertificado(ins._id)}>Ver certificado</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InscripcionList;

