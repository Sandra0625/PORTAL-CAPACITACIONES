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

// Actualizar progreso de una inscripción
router.put('/:id/progreso', verificarToken, async (req, res) => {
  try {
    const { progreso } = req.body;
    const insc = await Inscripcion.findById(req.params.id).populate('curso usuario');
    if (!insc) return res.status(404).json({ error: 'Inscripción no encontrada' });
    if (insc.usuario._id.toString() !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    insc.progreso = Math.max(0, Math.min(100, Number(progreso) || 0));
    if (insc.progreso >= 100 && !insc.completado) {
      insc.completado = true;
      insc.fechaCompletado = new Date();
    }
    await insc.save();
    res.json(insc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Generar / mostrar certificado (HTML simple imprimible)
router.get('/:id/certificado', verificarToken, async (req, res) => {
  try {
    const insc = await Inscripcion.findById(req.params.id).populate('curso usuario');
    if (!insc) return res.status(404).send('Inscripción no encontrada');
    if (insc.usuario._id.toString() !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).send('Acceso denegado');
    }

    if (!insc.completado) return res.status(400).send('Curso no completado aún');

    const nombre = insc.usuario.nombre;
    const titulo = insc.curso.titulo;
    const fecha = insc.fechaCompletado ? insc.fechaCompletado.toLocaleDateString() : new Date().toLocaleDateString();

    const html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Certificado</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .cert { border: 10px solid #ccc; padding: 40px; }
          h1 { font-size: 36px; }
          p { font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="cert">
          <h1>Certificado de finalización</h1>
          <p>Se certifica que</p>
          <h2>${nombre}</h2>
          <p>ha completado satisfactoriamente el curso</p>
          <h3>${titulo}</h3>
          <p>Fecha: ${fecha}</p>
        </div>
      </body>
    </html>`;

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    res.status(500).send('Error generando certificado');
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
