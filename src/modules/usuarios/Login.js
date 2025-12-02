import React, { useState } from 'react';
import api from '../../api';

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', contraseña: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.usuario);
    } catch (err) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} placeholder="Contraseña" />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
