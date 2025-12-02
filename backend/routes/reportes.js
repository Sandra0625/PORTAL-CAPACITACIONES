const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');
const Inscripcion = require('../models/Inscripcion');
const verificarToken = require('../middleware/auth');

// Reportes para administrador
router.get('/admin', verificarToken, async (req, res) => {
  try {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const totalCursos = await Curso.countDocuments();
    const totalInscripciones = await Inscripcion.countDocuments();

    res.json({
      totalCursos,
      totalInscripciones
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reportes para estudiante
router.get('/estudiante', verificarToken, async (req, res) => {
  try {
    if (req.usuario.rol !== 'estudiante') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const inscripciones = await Inscripcion.find({ usuario: req.usuario.id }).populate('curso');
    res.json({
      cursosInscritos: inscripciones.map(i => i.curso.titulo)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
