import React, { useState, useEffect } from 'react';
import api from '../../api';

function InscripcionForm({ usuario, onInscripcionCreada }) {
  const [cursoId, setCursoId] = useState('');
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchCursos() {
      try {
        const res = await api.get('/cursos');
        if (mounted) setCursos(res.data || []);
      } catch (err) {
        console.error('Error cargando cursos', err);
      }
    }
    fetchCursos();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!cursoId) {
      alert('Selecciona un curso');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/inscripciones', { cursoId });
      onInscripcionCreada(res.data);
      setCursoId('');
    } catch (err) {
      console.error(err);
      alert('Error al inscribirse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Selecciona un curso:
        <select value={cursoId} onChange={e => setCursoId(e.target.value)}>
          <option value="">-- Seleccionar --</option>
          {cursos.map(c => (
            <option key={c._id} value={c._id}>{c.titulo} {c.duracion ? `(${c.duracion}h)` : ''}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Inscribiendo...' : 'Inscribirse'}</button>
    </form>
  );
}

export default InscripcionForm;
