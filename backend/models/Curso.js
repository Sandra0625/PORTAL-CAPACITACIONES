const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  duracion: { type: Number },
  fechaInicio: { type: Date }
});

module.exports = mongoose.model('Curso', CursoSchema);
