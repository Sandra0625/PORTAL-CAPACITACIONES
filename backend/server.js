const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION]', reason);
});

const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');

// Conexión a MongoDB Atlas
console.log('[SERVER] Conectando a MongoDB...');
const mongoConnection = mongoose.connect(process.env.MONGO_URI);

mongoConnection
  .then(() => {
    console.log("[SERVER] MongoDB conectado");
  })
  .catch(err => {
    console.error("[SERVER] Error de conexión:", err.message);
    console.error(err);
  });

// Middleware de autenticación
console.log('[SERVER] Cargando middleware de autenticación...');
const verificarToken = require('./middleware/auth');
console.log('[SERVER] Middleware cargado');

// Importar rutas
console.log('[SERVER] Importando rutas...');
try {
  const authRouter = require('./routes/auth');
  console.log('[SERVER] - authRouter cargado');
  
  const cursosRouter = require('./routes/cursos');
  console.log('[SERVER] - cursosRouter cargado');
  
  const inscripcionesRouter = require('./routes/inscripciones');
  console.log('[SERVER] - inscripcionesRouter cargado');
  
  const reportesRouter = require('./routes/reportes');
  console.log('[SERVER] - reportesRouter cargado');
  
  const usuariosRouter = require('./routes/usuarios');
  console.log('[SERVER] - usuariosRouter cargado');

  console.log('[SERVER] Todas las rutas importadas exitosamente');

  // Rutas públicas
  console.log('[SERVER] Configurando rutas públicas...');
  app.use('/api/auth', authRouter);
  app.use('/api/usuarios', usuariosRouter);
  console.log('[SERVER] Rutas públicas configuradas');

  // Servir certificados generados
  const certsDir = path.join(__dirname, 'certificates');
  app.use('/certificates', express.static(certsDir));

  // Rutas protegidas
  console.log('[SERVER] Configurando rutas protegidas...');
  app.use('/api/cursos', verificarToken, cursosRouter);
  app.use('/api/inscripciones', verificarToken, inscripcionesRouter);
  app.use('/api/reportes', verificarToken, reportesRouter);
  console.log('[SERVER] Rutas protegidas configuradas');

  // Ruta de prueba
  app.get("/", (req, res) => {
    res.send("Backend funcionando");
  });

  // Manejo de errores global
  app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    res.status(500).json({ error: err.message });
  });

  // Servidor
  console.log('[SERVER] Inicializando servidor HTTP...');
  const PORT = process.env.PORT || 4000;
  
  console.log('[SERVER] Intentando escuchar en puerto', PORT);
  
  const HOST = process.env.HOST || '0.0.0.0';
  const server = app.listen(PORT, HOST, () => {
    console.log(`[SERVER] ✓ Servidor escuchando en http://${HOST}:${PORT}`);
    console.log(`[SERVER] Servidor listo para recibir solicitudes`);
  });

  server.on('error', (err) => {
    console.error('[SERVER ERROR]', err);
  });

  server.on('listening', () => {
    console.log('[SERVER] El servidor está verdaderamente escuchando');
  });

  // Mantener el proceso vivo
  console.log('[SERVER] Configuración completada');
} catch (err) {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
}


