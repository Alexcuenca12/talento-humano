import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const Persona = () => {
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
      <div className="fgrid col-fixed ">
        <h1 className="text-center  mb-auto">Carga Familiar</h1>

        <div className="formgroup-inline text-center">
          <div className="field col-5 md:col-4">
            <label className="text-center" >Cedula: </label>
            <Dropdown options={comboOptions} placeholder="" className="border-round appearance-none outline-none"/>
          </div>
          <div className="field col-4 md:col-4">
            <label className="">Nombres:</label>
            <Dropdown options={comboOptions} placeholder="" />
          </div>
          <div className="field col-5 md:col-3">
            <label className="">Apellidos:</label>
            <Dropdown options={comboOptions} placeholder="" />
          </div>

        </div>

        <div className="formgroup-inline text-center">
          <div className="field col-5 md:col-4">
            <label>Fecha de nacimiento:</label>
            <Calendar placeholder="" showIcon={true} />
          </div>

          <div className="field col-5 md:col-4">
            <label>Subir PDF:</label>
            <FileUpload name="pdf" chooseLabel="Seleccionar archivo" />
          </div>
        </div>



        <div className="formgroup-inline text-center">
          <div className="field col-5 md:col-4">
            <Button label="Agregar" />
          </div>
          <div className="field col-5 md:col-4">
            <Button label="Cancelar" />
          </div>
        </div>

        <div className="formgroup-inline p-grid p-justify-center">
          <div className="card p-col-12">
            <DataTable  tableStyle={{ minWidth: '50rem' }}>
              <Column field="Carga Familiar" header="Carga Familiar"></Column>
              <Column field="PDF" header="PDF"></Column>
              <Column field="Acciones" header="Acciones"></Column>

            </DataTable>
          </div>
        </div>


      </div>
  );
};

export default Persona;
