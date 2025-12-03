const mongoose = require('mongoose');

const InscripcionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  fecha: { type: Date, default: Date.now },
  progreso: { type: Number, default: 0 }, // 0-100
  completado: { type: Boolean, default: false },
  fechaCompletado: { type: Date },
  certificadoUrl: { type: String }
});

module.exports = mongoose.model('Inscripcion', InscripcionSchema);
