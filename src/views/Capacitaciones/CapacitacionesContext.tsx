import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
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

  const comboOptions = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
    { label: 'Opción 3', value: 'opcion3' }
  ];

  return (
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-md-4">
          <label>Label 1</label>
          <Dropdown options={comboOptions} placeholder="Combo Box 1" />
        </div>
        <div className="p-col-12 p-md-4">
          <label>Label 2</label>
          <Dropdown options={comboOptions} placeholder="Combo Box 2" />
        </div>
        <div className="p-col-12 p-md-4">
          <label>Label 3</label>
          <Dropdown options={comboOptions} placeholder="Combo Box 3" />
        </div>

        <div className="p-col-12 p-md-4">
          <label>Label 4</label>
          <Calendar placeholder="Fecha 1" showIcon={true} />
        </div>
        <div className="p-col-12 p-md-4">
          <label>Label 5</label>
          <Calendar placeholder="Fecha 2" showIcon={true} />
        </div>
        <div className="p-col-12 p-md-4">
          <label>Label 6</label>
          <InputText type="number" placeholder="Número" />
        </div>

        <div className="p-col-12 p-md-4">
          <label>Label 7</label>
          <Dropdown options={comboOptions} placeholder="Combo Box 4" />
        </div>
        <div className="p-col-12 p-md-4"></div>
        <div className="p-col-12 p-md-4"></div>

        <div className="p-col-12">
          <label>Label 8</label>
          <FileUpload name="pdf" chooseLabel="Seleccionar archivo" />
        </div>

        <div className="p-col-12 p-md-6">
          <Button label="Agregar" />
        </div>
        <div className="p-col-12 p-md-6">
          <Button label="Cancelar" />
        </div>
      </div>
  );
};

export default Capacitaciones;
