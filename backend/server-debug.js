const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log('1. Iniciando aplicación...');

const app = express();
app.use(cors());
app.use(express.json());

console.log('2. CORS y JSON configurados');

// Conexión a MongoDB Atlas
console.log('3. Intentando conectar a MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("4. MongoDB conectado"))
  .catch(err => {
    console.error("4. Error de conexión a MongoDB:", err.message);
    process.exit(1);
  });

console.log('5. Importando middleware...');
const verificarToken = require('./middleware/auth');

console.log('6. Importando rutas...');
try {
  const authRouter = require('./routes/auth');
  console.log('   - auth importado');
  
  const cursosRouter = require('./routes/cursos');
  console.log('   - cursos importado');
  
  const inscripcionesRouter = require('./routes/inscripciones');
  console.log('   - inscripciones importado');
  
  const reportesRouter = require('./routes/reportes');
  console.log('   - reportes importado');
  
  const usuariosRouter = require('./routes/usuarios');
  console.log('   - usuarios importado');

  console.log('7. Configurando rutas...');
  app.use('/api/auth', authRouter);
  app.use('/api/usuarios', usuariosRouter);
  app.use('/api/cursos', verificarToken, cursosRouter);
  app.use('/api/inscripciones', verificarToken, inscripcionesRouter);
  app.use('/api/reportes', verificarToken, reportesRouter);

  app.get("/", (req, res) => {
    res.send("Backend funcionando");
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`8. Servidor en puerto ${PORT}`));
} catch (err) {
  console.error('Error importando rutas:', err);
  process.exit(1);
}
