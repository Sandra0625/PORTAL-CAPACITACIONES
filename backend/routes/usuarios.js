const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Crear nuevo usuario (la contraseña se encriptará automáticamente en el modelo)
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: { id: nuevoUsuario._id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email } });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
});

module.exports = router;
