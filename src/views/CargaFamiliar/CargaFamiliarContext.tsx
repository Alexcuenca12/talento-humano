import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '../../styles/CargaFamiliar.css'
import {Panel} from "primereact/panel";

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
      <div className="fgrid col-fixed  ">
        <Panel>
          <h4 className="text-center  mb-auto">Carga Familiar</h4>

          <div className="formgroup-inline center-table ">
            <div className="center-table">
              <div className="field col md:col-4">
                <label className="">Cedula: </label>
                <InputText type="number" placeholder="Ingrese su cedula" />
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-4">
                <label className="">Nombres:</label>
                <InputText type="text" placeholder="Ingrese sus nombres" />
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Apellidos:</label>
                <InputText type="text" placeholder="Ingrese sus apellidos" />
              </div>
            </div>


          </div>

          <div className="formgroup-inline center-table">
            <div className="center-table">
              <div className="field col-5 md:col-4">
                <label>Fecha de nacimiento:</label>
                <Calendar placeholder="Ingrese su Fecha de Nacimiento" showIcon={true}  className="color-calendario" />
              </div>
            </div>


            <div className="field col-5 md:col-4">
              <label>Subir PDF:</label>
              <FileUpload name="pdf"
                          chooseLabel="Escoger"
                          uploadLabel="Cargar"
                          cancelLabel="Cancelar"
                          emptyTemplate={<p className="m-0">Arrastre y suelte los archivos aquí para cargarlos.</p>} />

            </div>
          </div>



          <div className="formgroup-inline center-table">
            <div className="field">
              <Button label="Agregar" />
            </div>
            <div className="field">
              <Button label="Cancelar" />
            </div>
          </div>



          <div className="formgroup-inline   center-table">
            <div className="card p-col-12">
              <DataTable  tableStyle={{ minWidth: '50rem' }}>
                <Column field="Carga Familiar" header="Carga Familiar"></Column>
                <Column field="PDF" header="PDF"></Column>
                <Column field="Acciones" header="Acciones"></Column>

              </DataTable>
            </div>
          </div>
        </Panel>


      </div>
  );
};

export default Persona;
