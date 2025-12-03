import React, { useState } from 'react';
import api from '../../api';

function Register({ onLogin }) {
  const [form, setForm] = useState({ nombre: '', email: '', contraseña: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validar campos vacíos
    if (!form.nombre || !form.email || !form.contraseña) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await api.post('/usuarios/registro', form);
      // Si el registro fue exitoso, intentar login automático
      setSuccess(response.data.mensaje || 'Registro exitoso');
      try {
        const loginRes = await api.post('/auth/login', { email: form.email, contraseña: form.contraseña });
        localStorage.setItem('token', loginRes.data.token);
        if (onLogin) onLogin(loginRes.data.usuario);
      } catch (loginErr) {
        // si falla el login automático, dejar el formulario limpio y mostrar mensaje
        setError('Registro OK, pero login automático falló. Por favor inicia sesión.');
      }
      setForm({ nombre: '', email: '', contraseña: '' });
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} placeholder="Contraseña" />
      <button type="submit">Registrarse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}

export default Register;
