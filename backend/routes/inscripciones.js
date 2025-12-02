const express = require('express');
const router = express.Router();
const Inscripcion = require('../models/Inscripcion');
const verificarToken = require('../middleware/auth');

// Crear inscripción
router.post('/', verificarToken, async (req, res) => {
  try {
    const inscripcion = new Inscripcion({
      usuario: req.usuario.id,
      curso: req.body.cursoId
    });
    await inscripcion.save();
    res.status(201).json(await inscripcion.populate('curso usuario'));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar inscripciones
router.get('/', verificarToken, async (req, res) => {
  try {
    let inscripciones;
    if (req.usuario.rol === 'admin') {
      inscripciones = await Inscripcion.find().populate('curso usuario');
    } else {
      inscripciones = await Inscripcion.find({ usuario: req.usuario.id }).populate('curso usuario');
    }
    res.json(inscripciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
