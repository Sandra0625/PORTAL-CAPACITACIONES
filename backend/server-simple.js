const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('[SIMPLE SERVER] Iniciando...');

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('[DB] Conectado a MongoDB'))
  .catch(err => console.error('[DB ERROR]', err.message));

// Crear servidor simple
const server = http.createServer((req, res) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Backend funcionando\n');
  } else if (req.url === '/api/usuarios/registro' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        console.log('[REGISTRO] Body recibido:', body);
        const { nombre, email, contraseña } = JSON.parse(body);
        
        const Usuario = require('./models/Usuario');
        
        // Verificar si existe
        const existe = await Usuario.findOne({ email });
        if (existe) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ mensaje: 'El email ya está registrado' }));
          return;
        }
        
        // Crear usuario
        const nuevoUsuario = new Usuario({ nombre, email, contraseña });
        await nuevoUsuario.save();
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          mensaje: 'Usuario registrado con éxito', 
          usuario: { id: nuevoUsuario._id, nombre, email } 
        }));
      } catch (err) {
        console.error('[REGISTRO ERROR]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensaje: 'Error al registrar usuario' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 4000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[SERVER] ✓ Escuchando en http://127.0.0.1:${PORT}`);
});

server.on('error', (err) => {
  console.error('[SERVER ERROR]', err);
});

// Log cada segundo para ver si el servidor sigue vivo
let contador = 0;
setInterval(() => {
  contador++;
  if (contador % 10 === 0) {
    console.log(`[HEARTBEAT] Servidor activo - ${contador} segundos`);
  }
}, 1000);

// Mantener el proceso activo indefinidamente
process.on('SIGTERM', () => {
  console.log('[SERVER] SIGTERM recibido, cerrando...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('[SERVER] SIGINT recibido, cerrando...');
  server.close();
});
