const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const router = express.Router();
const SECRET = 'clave_secreta'; // usa .env en producción

// Registro
router.post('/register', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

  const valido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, SECRET, { expiresIn: '1d' });
  res.json({ token, usuario });
});

module.exports = router;
