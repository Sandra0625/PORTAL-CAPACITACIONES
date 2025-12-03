import React, { useState } from 'react';
import api from '../../api';

function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', contraseña: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/usuarios/registro', form);
      alert('Usuario registrado con éxito');
    } catch (err) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} placeholder="Contraseña" />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
