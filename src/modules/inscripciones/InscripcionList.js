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
    try {
      const base = api.defaults.baseURL || '';
      // baseURL está configurado como 'http://localhost:4000/api'
      // concatenamos la ruta relativa para obtener la URL completa
      const urlApi = `${base}/inscripciones/${id}/certificado`;

      // Si el registro ya tiene `certificadoUrl` (ruta pública bajo /certificates), usarla
      const ins = null; // placeholder para claridad
      // Intentaremos primero abrir la URL pública si está presente en el objeto de inscripciones
      // Buscamos la inscripción en el listado recibido
      const found = inscripciones.find(i => i._id === id);
      if (found && found.certificadoUrl) {
        // certificadoUrl suele ser '/certificates/filename.pdf'
        const host = base.replace(/\/api\/?$/, '');
        const publicUrl = host + found.certificadoUrl;
        window.open(publicUrl, '_blank');
        return;
      }

      // Si no hay certificado público, abrimos una ventana vacía (evitar bloqueadores)
      const win = window.open('', '_blank');
      if (!win) return alert('El navegador bloqueó la apertura de la ventana. Permite popups para continuar.');
      win.document.write('<p>Cargando certificado...</p>');

      // Hacemos la petición protegida con el token usando `api` para obtener el HTML imprimible
      api.get(`/inscripciones/${id}/certificado`, { responseType: 'blob' })
        .then(res => {
          const blob = new Blob([res.data], { type: res.data.type || 'text/html' });
          const blobUrl = URL.createObjectURL(blob);
          win.location.href = blobUrl;
        })
        .catch(err => {
          console.error('Error obteniendo certificado:', err);
          try { win.close(); } catch (e) {}
          alert('No se pudo obtener el certificado');
        });
    } catch (e) {
      console.error('No se pudo abrir certificado:', e);
      alert('No se pudo abrir el certificado');
    }
  };

  return (
    <div>
      <h3>Mis Inscripciones</h3>
      <ul>
        {inscripciones.map(ins => (
          <li key={ins._id} style={{ marginBottom: 12 }}>
            <div>
              <strong>{ins.curso ? ins.curso.titulo : 'Curso eliminado'}</strong> — Inscrito: {new Date(ins.fecha).toLocaleDateString()}
            </div>
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

