const axios = require('axios');

async function run() {
  try {
    // Login
    const login = await axios.post('http://localhost:4000/api/auth/login', {
      email: 'test456@example.com',
      contraseña: 'Password123'
    }, { headers: { 'Content-Type': 'application/json' } });

    const token = login.data.token;
    console.log('Token obtenido');

    // List inscripciones
    const insRes = await axios.get('http://localhost:4000/api/inscripciones', { headers: { Authorization: `Bearer ${token}` } });
    console.log('Inscripciones:', insRes.data.length);
    if (!insRes.data.length) return console.log('No hay inscripciones para probar');

    const ins = insRes.data[0];
    console.log('Probar inscripcion id:', ins._id, 'progreso actual:', ins.progreso);

    // Update progreso to 50
    const putRes = await axios.put(`http://localhost:4000/api/inscripciones/${ins._id}/progreso`, { progreso: 50 }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('PUT respuesta:', putRes.status, putRes.data.progreso, putRes.data.completado);

    // Update progreso to 100
    const putRes2 = await axios.put(`http://localhost:4000/api/inscripciones/${ins._id}/progreso`, { progreso: 100 }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('PUT a 100 respuesta:', putRes2.status, 'completado:', putRes2.data.completado, 'certificadoUrl:', putRes2.data.certificadoUrl);

  } catch (err) {
    if (err.response) console.error('Error response:', err.response.status, err.response.data);
    else console.error('Error (no response):', err && err.stack ? err.stack : err);
  }
}

run();
