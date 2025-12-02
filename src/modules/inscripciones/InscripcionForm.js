import React, { useState } from 'react';
import api from '../../api';

function InscripcionForm({ usuario, onInscripcionCreada }) {
  const [cursoId, setCursoId] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/inscripciones', { usuarioId: usuario._id, cursoId });
    onInscripcionCreada(res.data);
    setCursoId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="cursoId" 
        value={cursoId} 
        onChange={e => setCursoId(e.target.value)} 
        placeholder="ID del curso" 
      />
      <button type="submit">Inscribirse</button>
    </form>
  );
}

export default InscripcionForm;
