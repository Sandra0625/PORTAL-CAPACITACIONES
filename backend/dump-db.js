// dump-db.js — conecta a Mongo y vuelca colecciones claves
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');

const Usuario = require('./models/Usuario');
const Curso = require('./models/Curso');
const Inscripcion = require('./models/Inscripcion');

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
    const usuarios = await Usuario.find().lean();
    const cursos = await Curso.find().lean();
    const inscripciones = await Inscripcion.find().lean();

    console.log(JSON.stringify({ usuarios, cursos, inscripciones }, null, 2));
  } catch (err) {
    console.error('Error consultando colecciones:', err && err.message ? err.message : err);
    process.exit(4);
  } finally {
    await mongoose.disconnect();
  }
}

run();
