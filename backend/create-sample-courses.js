// create-sample-courses.js — crea cursos de muestra
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Curso = require('./models/Curso');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('No MONGO_URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const samples = [
      { titulo: 'Curso de JavaScript Básico', descripcion: 'Introducción a JS', duracion: 10 },
      { titulo: 'Curso de Node.js Avanzado', descripcion: 'Backend con Node y Express', duracion: 20 }
    ];

    for (const s of samples) {
      const exists = await Curso.findOne({ titulo: s.titulo });
      if (exists) {
        console.log('Ya existe:', s.titulo, exists._id);
      } else {
        const created = await Curso.create(s);
        console.log('Creado:', created._id, created.titulo);
      }
    }
  } catch (err) {
    console.error('Error:', err && err.message ? err.message : err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
