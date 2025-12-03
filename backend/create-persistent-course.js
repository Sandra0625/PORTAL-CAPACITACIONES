// create-persistent-course.js — crea un curso de prueba persistente si no existe
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Curso = require('./models/Curso');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('No se encontró MONGO_URI en backend/.env');
    process.exit(2);
  }

  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err && err.message ? err.message : err);
    process.exit(3);
  }

  try {
    const titulo = 'Curso Persistente AutoTest';
    let curso = await Curso.findOne({ titulo }).lean();
    if (curso) {
      console.log('El curso ya existe:', curso._id);
    } else {
      curso = await Curso.create({ titulo, descripcion: 'Curso persistente creado para inspección', duracion: 8 });
      console.log('Curso creado:', curso._id);
    }
  } catch (err) {
    console.error('Error creando/consultando curso:', err && err.message ? err.message : err);
    process.exit(4);
  } finally {
    await mongoose.disconnect();
  }
}

run();
