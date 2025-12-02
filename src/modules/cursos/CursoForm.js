// src/modules/cursos/CursoForm.js
import React, { useState } from 'react';
import api from '../../api';

function CursoForm({ onCursoCreado }) {
  const [form, setForm] = useState({ titulo: '', descripcion: '', duracion: '', fechaInicio: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/cursos', form);
    onCursoCreado(res.data);
    setForm({ titulo: '', descripcion: '', duracion: '', fechaInicio: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" />
      <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="duracion" value={form.duracion} onChange={handleChange} placeholder="Duración (horas)" />
      <input name="fechaInicio" type="date" value={form.fechaInicio} onChange={handleChange} />
      <button type="submit">Crear Curso</button>
    </form>
  );
}

export default CursoForm;
