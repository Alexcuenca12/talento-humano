import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {RadioButton} from "primereact/radiobutton";

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

  return (
      <Fieldset className="fgrid col-fixed">

        <Card
            header={cardHeader}
            className="border-solid border-blue-800 border-3">
          <div className="h1-rem">
            <Divider align='center'>
              <h1 className="text-7xl font-smibold lg:md-2">Ficha Familiar</h1>
            </Divider>
          </div>

          <div className="formgroup-inline center-table ">
            <div className="center-table">
              <div className="field col md:col-4">
                <label className="">Cedula: </label>
                <InputText type="number" placeholder="Ingrese su Cedula"/>
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-4">
                <label className="">Apellido Paterno:</label>
                <InputText type="text" placeholder="Ingrese sus Nombres"/>
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Apellido Materno:</label>
                <InputText type="text" placeholder="Ingrese sus Apellidos"/>
              </div>
            </div>
          </div>

          <div className="formgroup-inline center-table">
            <div className="center-table">
              <div className="field col md:col-4">
                <label className="">Primer Nombre:</label>
                <InputText type="text" placeholder="Ingrese sus Nombres"/>
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Segundo Nombre:</label>
                <InputText type="text" placeholder="Ingrese sus Apellidos"/>
              </div>
            </div>

            <div className="center-table ">
              <div className="field col-8 md:col-8 ">
                <label>Fecha de nacimiento:</label>
                <Calendar placeholder="Ingrese su Fecha de Nacimiento" showIcon={true}
                          className="color-calendario"/>
              </div>
            </div>
          </div>

          <div className="formgroup-inline center-table">
            <div className="center-table">
              <div className="field col md:col-4">
                <label>Pais de nacimiento:</label>
                <Dropdown  optionLabel="name"
                           placeholder="Seleccione el pais" className="w-full md:w-14rem" />
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Edad:</label>
                <InputText type="number" placeholder="Ingrese sus Apellidos"/>
              </div>
            </div>

            <div className="center-table ">
              <div className="field col md:col-4">
                <label>Genero:</label>
                <Dropdown  optionLabel="name"
                           placeholder="Seleccione el genero" className="w-full md:w-14rem" />
              </div>
            </div>
          </div>

          <div className="h1-rem">
            <Divider align='center'>
              <h4 className="text-7xl font-smibold lg:md-2">Dirección</h4>
            </Divider>
          </div>

          <div className="formgroup-inline center-table">
            <div className="center-table">
              <div className="field col-8 md:col-4">
                <label>Pais:</label>
                <Dropdown  optionLabel="name"
                           placeholder="Seleccione el pais" className="w-full md:w-14rem" />
              </div>
            </div>
            <div className="center-table">
              <div className="field col-8 md:col-4">
                <label>Provincia:</label>
                <Dropdown  optionLabel="name"
                           placeholder="Seleccione la provincia" className="w-full md:w-14rem" />
              </div>
            </div>

            <div className="center-table ">
              <div className="field col-8 md:col-4">
                <label>Canton:</label>
                <Dropdown  optionLabel="name"
                           placeholder="Seleccione el canton" className="w-full md:w-14rem" />
              </div>
            </div>
          </div>

          <div className="formgroup-inline center-table">
            <div className="center-table">
              <div className="field col-8 md:col-4">
                <label>Parroquia:</label>
                <Dropdown  optionLabel="name"
                           placeholder="Seleccione el parroquia" className="w-full md:w-14rem" />
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Calles:</label>
                <InputText type="text" placeholder="Ingrese las calles"/>
              </div>
            </div>

            <div className="center-table ">
              <div className="field col md:col-3">
                <label className="">Numero de casa:</label>
                <InputText type="number" placeholder="Ingrese numero de casa"/>
              </div>
            </div>
          </div>

          <div className="formgroup-inline center-table">
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Telefono de casa:</label>
                <InputText type="text" placeholder="Ingrese el telefono"/>
              </div>
            </div>
            <div className="center-table">
              <div className="field col md:col-3">
                <label className="">Telefono Personal:</label>
                <InputText type="number" placeholder="Ingrese el telefono"/>
              </div>
            </div>

            <div className="center-table ">
              <div className="field col md:col-3">
                <label className="">Correo:</label>
                <InputText type="email" placeholder="Ingrese el correo"/>
              </div>
            </div>
          </div>

          <div className="h1-rem">
            <Divider align='center'>
              <h4 className="text-7xl font-smibold lg:md-2">Discapacidad</h4>
            </Divider>
          </div>
          <div className="formgroup ">
            <div className="flex flex-column gap-4">
              <div className="flex-wrap ">
                <label className="">Tienes algun tipo de discapacidad? :</label>
                <div className="flex flex-initial gap-3 align-items-center justify-content-center" >
                  <div className="flex flex-none">
                    <RadioButton inputId="Si" name="si" value="si"  />
                    <label htmlFor="si" className="ml-2">Si</label>
                  </div>
                  <div className="flex flex-none">
                    <RadioButton inputId="no" name="no" value="no"  />
                    <label htmlFor="no" className="ml-2">No</label>
                  </div>
                </div>
              </div>
              <Card  className="border-solid border-blue-800 border-3 flex align-items-center justify-content-center mb-6">
                <div className="flex flex-none ">
                  <label>Tipo de Discapacidad:</label>
                  <Dropdown  optionLabel="name"
                             placeholder="Seleccione el tipo" className="w-full md:w-14rem" />
                </div>
                <div className="field ">
                  <label>N° Carnet Conadis:</label>
                  <InputText type="number" placeholder="Ingrese el numero"/>
                </div>
                <div className="field ">
                  <label>Grado Discapacidad:</label>
                  <InputText type="number" placeholder="Ingrese el grado"/>
                </div>

              </Card>
            </div>
          </div>

          <div className="formgroup-inline center-table ">
            <div className="field">
              <Button label="Agregar" rounded/>
            </div>
            <div className="field">
              <Button label="Cancelar" rounded/>
            </div>
          </div>

        </Card>


      </Fieldset>
  )
      ;
};

export default Persona;