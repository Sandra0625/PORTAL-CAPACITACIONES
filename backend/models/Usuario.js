const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'estudiante'], default: 'estudiante' }
});

UsuarioSchema.pre('save', async function() {
  if (!this.isModified('contraseña')) return;
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
