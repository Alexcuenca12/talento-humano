import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const Capacitaciones = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Aquí puedes realizar las acciones necesarias con los datos del formulario, como enviarlos a un servidor

    // Limpia los campos después de enviar el formulario
    setNombre('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="p-field">
          <Button label="Enviar" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default Capacitaciones;
