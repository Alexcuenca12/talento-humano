import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {RadioButton} from "primereact/radiobutton";
import "../../styles/Persona.css";

const Persona = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setNombre("");
    setEmail("");
  };

  return (
      <Fieldset className="fgrid col-fixed">
        <Card header={cardHeader}
              className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap">

          <div className="h1-rem">
            <Divider align="center">
              <h4 className="text-7xl font-smibold lg:md-2">Datos Personales</h4>
            </Divider>
          </div>

          <div className="flex justify-content-center ">
            <div className="flex flex-column">
              <form className="flex flex-column flex-wrap gap-2">


                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Cedula:
                    </label>
                    <InputText
                        type="number"
                        placeholder="Cedula"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Apellido Paterno:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Apellido Paterno"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Apellido Materno:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Apellido Materno"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>


                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Primer Nombre:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Primer Nombre"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Segundo Nombre:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Segundo Nombre"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Estado Civil:
                    </label>
                    <Dropdown
                        type="text"
                        placeholder="Seleccione"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>


                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Edad:
                    </label>
                    <InputText
                        type="number"
                        placeholder="Edad"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-6rem ">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Fecha de nacimiento:
                    </label>
                    <Calendar
                        placeholder="Fecha de Nacimiento"
                        showIcon={true}
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem ">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Pais Natal:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Pais Natal"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>


                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Sexo:
                    </label>
                    <Dropdown
                        type="text"
                        placeholder="Seleccione"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Genero:
                    </label>
                    <Dropdown
                        type="text"
                        placeholder="Seleccione"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Tipo de Sangre:
                    </label>
                    <Dropdown
                        type="text"
                        placeholder="Seleccione"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>


                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Etnia:
                    </label>
                    <Dropdown
                        type="text"
                        placeholder="Seleccione"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Idioma Raíz:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Idioma Raíz"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Idioma Secundario:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Idioma Secundario"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>


                <div className="h1-rem">
                  <Divider align="center">
                    <h4 className="text-7xl font-smibold">Contacto</h4>
                  </Divider>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Numero Celular:
                    </label>
                    <InputText
                        type="number"
                        placeholder="Numero Celular"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Numero Telefonico:
                    </label>
                    <InputText
                        type="number"
                        placeholder="Numero Telefonico"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Correo Personal:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Correo Personal"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Correo Institucional:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Correo Institucional"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>


                <div className="h1-rem">
                  <Divider align="center">
                    <h4 className="text-7xl font-smibold lg:md-2">Dirección</h4>
                  </Divider>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min">
                      Pais:
                    </label>
                    <Dropdown
                        optionLabel="name"
                        placeholder="Seleccione"
                        className="w-full md:w-15rem"
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-auto pr-2 min-w-min">
                      Provincia:
                    </label>
                    <Dropdown
                        optionLabel="name"
                        placeholder="Seleccione"
                        className="w-full md:w-15rem"
                    />
                  </div>

                  <div className="flex align-items-center justify-content-center w-auto h-5rem ">
                    <label className="text-3xl font-medium w-auto pr-2 min-w-min">
                      Canton:
                    </label>
                    <Dropdown
                        optionLabel="name"
                        placeholder="Seleccione"
                        className="w-full md:w-15rem"
                    />
                  </div>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-auto pr-2 min-w-min">
                      Parroquia:
                    </label>
                    <Dropdown
                        optionLabel="name"
                        placeholder="Seleccione"
                        className="w-full md:w-15rem"
                    />
                  </div>

                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-auto pr-2 min-w-min">
                      Calles:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Ingrese las calles"
                        className="w-full text-2xl"
                    />
                  </div>

                  <div className="flex align-items-center justify-content-center w-auto h-5rem-table ">
                    <label className="text-3xl font-medium w-full min-w-min">
                      Nro de casa:
                    </label>
                    <InputText
                        type="number"
                        placeholder="Numero de casa"
                        className="w-full text-2xl"
                    />
                  </div>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Sector:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Sector"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Referencia:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Referencia"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>

                <div className="h1-rem">
                  <Divider align="center">
                    <h4 className="text-7xl font-smibold lg:md-2">Discapacidad</h4>
                  </Divider>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Discapacidad:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Discapacidad"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Tipo de Discapacidad:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Tipo de Discapacidad"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>

                <div
                    className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Porcentaje:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Porcentaje"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto h-5rem">
                    <label className="text-3xl font-medium w-full min-w-min" style={{marginLeft: "10px"}}>
                      Nro de Carnet:
                    </label>
                    <InputText
                        type="text"
                        placeholder="Nro de Carnet"
                        className="w-full min-w-min text-2xl"
                        style={{marginLeft: "10px"}}
                    />
                  </div>
                </div>

                <div
                    className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                  <div className="flex align-items-center justify-content-center w-auto min-w-min">
                    <Button
                        type="submit"
                        label="Agregar"
                        className="w-full text-3xl min-w-min "
                        rounded
                    />
                  </div>
                  <div className="flex align-items-center justify-content-center w-auto min-w-min">
                    <Button
                        type="button"
                        label="Cancel"
                        className="w-full text-3xl min-w-min"
                        rounded
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </Fieldset>
  );
};

export default Persona;