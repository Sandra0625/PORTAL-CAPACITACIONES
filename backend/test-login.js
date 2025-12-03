const axios = require('axios');

async function run() {
  try {
    const res = await axios.post('http://localhost:4000/api/auth/login', {
      email: 'test456@example.com',
      contraseña: 'Password123'
    }, { headers: { 'Content-Type': 'application/json' } });
    console.log(res.data);
  } catch (err) {
    if (err.response) console.error('Status', err.response.status, err.response.data);
    else console.error(err.message);
  }
}

run();
