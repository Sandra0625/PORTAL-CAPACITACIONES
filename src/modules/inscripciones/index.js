import React, { useState, useEffect } from 'react';
import api from '../../api';
import InscripcionList from './InscripcionList';
import InscripcionForm from './InscripcionForm';

function InscripcionesModule({ usuario }) {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    api.get('/inscripciones')
      .then(res => setInscripciones(res.data))
      .catch(err => console.error(err));
  }, []);

  const agregarInscripcion = nueva => setInscripciones([...inscripciones, nueva]);
  const onUpdate = updated => {
    setInscripciones(inscripciones.map(i => (i._id === updated._id ? updated : i)));
  };

  return (
    <div>
      <h2>Inscripciones</h2>
      <InscripcionForm usuario={usuario} onInscripcionCreada={agregarInscripcion} />
      <InscripcionList inscripciones={inscripciones} onUpdate={onUpdate} />
    </div>
  );
}

export default InscripcionesModule;
