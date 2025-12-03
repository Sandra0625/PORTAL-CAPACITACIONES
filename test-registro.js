const http = require('http');

const data = JSON.stringify({
  nombre: 'Test User',
  email: 'test456@example.com',
  contraseña: 'Password123'
});

const options = {
  hostname: '127.0.0.1',
  port: 4000,
  path: '/api/usuarios/registro',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data, 'utf8')
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
    try {
      const parsed = JSON.parse(responseData);
      console.log('Parsed:', JSON.stringify(parsed, null, 2));
    } catch(e) {
      console.log('Could not parse JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
