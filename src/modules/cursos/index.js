// src/modules/cursos/index.js
import React, { useState, useEffect } from 'react';
import api from '../../api';
import CursoList from './CursoList';
import CursoForm from './CursoForm';

function CursosModule() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    api.get('/cursos')
      .then(res => setCursos(res.data))
      .catch(err => console.error(err));
  }, []);

  const agregarCurso = nuevoCurso => setCursos([...cursos, nuevoCurso]);
  const eliminarCurso = id => setCursos(cursos.filter(c => c._id !== id));

  return (
    <div>
      <CursoForm onCursoCreado={agregarCurso} />
      <CursoList cursos={cursos} onDelete={eliminarCurso} />
    </div>
  );
}

export default CursosModule;
