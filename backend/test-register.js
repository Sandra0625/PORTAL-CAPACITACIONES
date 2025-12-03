const axios = require('axios');

async function run() {
  try {
    const res = await axios.post('http://localhost:4000/api/usuarios/registro', {
      nombre: 'AutoTest User',
      email: 'autotest+' + Date.now() + '@example.com',
      contraseña: 'Password123'
    }, { headers: { 'Content-Type': 'application/json' } });
    console.log('Status', res.status, res.data);
  } catch (err) {
    if (err.response) console.error('Status', err.response.status, err.response.data);
    else {
      console.error('Error (no response):', err && err.stack ? err.stack : err);
    }
  }
}

run();
