import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
      <div className="fgrid col ">
          <h1 className="text-center  mb-auto">Capacitaciones</h1>

          <div className="formgroup-inline text-center">
              <div className="field col-5 md:col-4">
                  <label className="text-center" >Institucion: </label>
                  <Dropdown options={comboOptions} placeholder="" id="institucion" className="border-round appearance-none outline-none"/>
              </div>
                  <div className="field col-4 md:col-4">
                      <label className="text-center">Tipo de evento:</label>
                      <Dropdown options={comboOptions} placeholder="" />
                  </div>
                  <div className="field col-5 md:col-3">
                      <label className="">Area de estudio:</label>
                      <Dropdown options={comboOptions} placeholder="" />
                  </div>

          </div>

          <div className="formgroup-inline text-center">
              <div className="field col-5 md:col-4">
                  <label>Desde:</label>
                  <Calendar placeholder="" showIcon={true} />
              </div>
              <div className="field col-5 md:col-4">
                  <label>Hasta:</label>
                  <Calendar placeholder="" showIcon={true} />
              </div>
              <div className="field col-5 md:col-3">
                  <label>Numero de dias:</label>
                  <InputText type="number" placeholder="" />
              </div>
          </div>

          <div className="formgroup-inline text-center">
              <div className="field col-5 md:col-3">
                  <label>Nombre de evento:</label>
                  <InputText type="text" placeholder="" />
              </div>

              <div className="field col-5 md:col-4">
                  <label>Tipo de certificado:</label>
                  <Dropdown options={comboOptions} placeholder="" />
              </div>
              <div className="field col-5 md:col-4">
                  <label>N° de horas totales: </label>
                  <InputText type="number" placeholder="" />
              </div>

          </div>

          <div className="formgroup-inline text-center">
              <div className="field col-5 md:col-4">
                  <label>Subir PDF:</label>
                  <FileUpload name="pdf" chooseLabel="Seleccionar archivo" />
              </div>
          </div>

          <div className="formgroup-inline grid">
              <div className="field col-6 md:col-4">
                  <Button label="Agregar" />
              </div>
              <div className="field col-6 md:col-4">
                  <Button label="Cancelar" />
              </div>
          </div>

          <div className="formgroup-inline p-grid p-justify-center">
              <div className="card p-col-12">
                  <DataTable  tableStyle={{ minWidth: '50rem' }}>
                      <Column field="Capacitaciones" header="Capacitaciones"></Column>
                      <Column field="PDF" header="PDF"></Column>
                      <Column field="Acciones" header="Acciones"></Column>

                  </DataTable>
              </div>
          </div>


      </div>
  );
};

export default Capacitaciones;
