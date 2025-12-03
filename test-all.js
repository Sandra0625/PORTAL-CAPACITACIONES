const http = require('http');

function req(path, method='GET', data=null, token=null){
  const body = data ? JSON.stringify(data) : null;
  const options = {
    hostname: '127.0.0.1',
    port: 4000,
    path,
    method,
    headers: {}
  };
  if(body){
    options.headers['Content-Type']='application/json';
    options.headers['Content-Length']=Buffer.byteLength(body,'utf8');
  }
  if(token) options.headers['Authorization'] = `Bearer ${token}`;

  return new Promise((resolve, reject)=>{
    const r = http.request(options, res=>{
      let chunks='';
      res.on('data', c=> chunks+=c);
      res.on('end', ()=>{
        let parsed=null;
        try{ parsed = JSON.parse(chunks); }catch(e){ parsed=chunks; }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });
    r.on('error', reject);
    if(body) r.write(body);
    r.end();
  });
}

(async ()=>{
  try{
    console.log('1) GET /');
    console.log(await req('/'));

    // login
    console.log('\n2) POST /api/auth/login');
    const loginResp = await req('/api/auth/login','POST',{ email: 'test456@example.com', contraseña: 'Password123' });
    console.log(loginResp);
    if(loginResp.statusCode !== 200){ console.error('Login falló, abortando.'); process.exit(1); }
    const token = loginResp.body.token;

    // list cursos
    console.log('\n3) GET /api/cursos (con token)');
    console.log(await req('/api/cursos','GET',null,token));

    // create curso
    console.log('\n4) POST /api/cursos (crear curso)');
    const cursoData = { titulo: 'Curso AutoTest', descripcion: 'Prueba automatizada', duracion: 5 };
    const createCurso = await req('/api/cursos','POST',cursoData,token);
    console.log(createCurso);
    const cursoId = createCurso.body && createCurso.body._id ? createCurso.body._id : (createCurso.body && createCurso.body.id ? createCurso.body.id : null);

    // list cursos again
    console.log('\n5) GET /api/cursos (verificar creación)');
    console.log(await req('/api/cursos','GET',null,token));

    // inscribirse
    console.log('\n6) POST /api/inscripciones (inscribir en curso)');
    const inscResp = await req('/api/inscripciones','POST',{ cursoId: cursoId }, token);
    console.log(inscResp);

    // listar inscripciones
    console.log('\n7) GET /api/inscripciones');
    console.log(await req('/api/inscripciones','GET',null,token));

    // reportes estudiante
    console.log('\n8) GET /api/reportes/estudiante');
    console.log(await req('/api/reportes/estudiante','GET',null,token));

    // reportes admin (debe dar 403)
    console.log('\n9) GET /api/reportes/admin (esperado 403)');
    console.log(await req('/api/reportes/admin','GET',null,token));

    // cleanup: eliminar curso si fue creado
    if(cursoId){
      console.log('\n10) DELETE /api/cursos/:id (eliminar curso creado)');
      const del = await req(`/api/cursos/${cursoId}`,'DELETE',null,token);
      console.log(del);
    }

    console.log('\nPruebas completadas.');
  }catch(e){
    console.error('Error en pruebas:', e);
    process.exit(1);
  }
})();
