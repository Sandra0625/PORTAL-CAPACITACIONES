const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

// Crear curso
router.post('/', async (req, res) => {
  try {
    const curso = new Curso(req.body);
    await curso.save();
    res.status(201).json(curso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar curso
router.delete('/:id', async (req, res) => {
  try {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Curso eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
