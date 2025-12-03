const axios = require('axios');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const login = await axios.post('http://localhost:4000/api/auth/login', { email: 'test456@example.com', contraseña: 'Password123' });
    const token = login.data.token;
    console.log('Logged in');

    const cursosRes = await axios.get('http://localhost:4000/api/cursos', { headers: { Authorization: `Bearer ${token}` } });
    const cursos = cursosRes.data;
    console.log('Cursos disponibles:', cursos.map(c => ({ id: c._id, titulo: c.titulo })));
    if (!cursos.length) return console.log('No hay cursos disponibles');

    const cursoId = cursos[0]._id;
    // Create inscription
    const ins = await axios.post('http://localhost:4000/api/inscripciones', { cursoId }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Inscripcion creada:', ins.data._id);

    // Update to 100
    const upd = await axios.put(`http://localhost:4000/api/inscripciones/${ins.data._id}/progreso`, { progreso: 100 }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Actualizado:', upd.data.progreso, 'completado:', upd.data.completado, 'certUrl:', upd.data.certificadoUrl);

    if (upd.data.certificadoUrl) {
      const url = 'http://localhost:4000' + upd.data.certificadoUrl;
      console.log('Descargando certificado desde', url);
      const pdfRes = await axios.get(url, { responseType: 'arraybuffer' });
      const outPath = path.join(__dirname, 'downloaded_cert.pdf');
      fs.writeFileSync(outPath, pdfRes.data);
      console.log('Certificado descargado a', outPath);
    } else {
      console.log('No se generó certificado (curso puede ser nulo).');
    }

  } catch (e) {
    if (e.response) console.error('ERR', e.response.status, e.response.data);
    else console.error(e);
  }
})();
