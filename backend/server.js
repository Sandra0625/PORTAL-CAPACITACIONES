const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error de conexión:", err));

// Middleware de autenticación
const verificarToken = require('./middleware/auth');

// Importar rutas
const authRouter = require('./routes/auth');
const cursosRouter = require('./routes/cursos');
const inscripcionesRouter = require('./routes/inscripciones');
const reportesRouter = require('./routes/reportes');
const usuariosRouter = require('./routes/usuarios'); // nueva ruta

// Rutas públicas
app.use('/api/auth', authRouter);
app.use('/api/usuarios', usuariosRouter); // registro de usuarios

// Rutas protegidas
app.use('/api/cursos', verificarToken, cursosRouter);
app.use('/api/inscripciones', verificarToken, inscripcionesRouter);
app.use('/api/reportes', verificarToken, reportesRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));


