const axios = require('axios');
(async ()=>{
  try{
    const login = await axios.post('http://localhost:4000/api/auth/login', { email: 'test456@example.com', contraseña: 'Password123' }, { headers: { 'Content-Type': 'application/json' } });
    const token = login.data.token;
    const res = await axios.get('http://localhost:4000/api/inscripciones', { headers: { Authorization: `Bearer ${token}` } });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    if (e.response) console.error(e.response.status, e.response.data);
    else console.error(e);
  }
})();
