require('dotenv').config();
const mongoose = require('mongoose');

console.log('[CHECK-MONGO] MONGO_URI:', process.env.MONGO_URI ? 'PRUEBA_EXISTE' : 'NO_ENCONTRADO');

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('[CHECK-MONGO] Conexión exitosa a MongoDB');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('[CHECK-MONGO] Error de conexión:', err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });
