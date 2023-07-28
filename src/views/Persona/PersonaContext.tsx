import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import "../../styles/Persona.css";
const Persona = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Aquí puedes realizar las acciones necesarias con los datos del formulario, como enviarlos a un servidor

    // Limpia los campos después de enviar el formulario
    setNombre("");
    setEmail("");
  };

  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap"
      >
        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2  w-full h-full max-w-full max-h-full min-w-min">
              Ficha Familiar
            </h1>
          </Divider>
        </div>

        <div className="flex justify-content-center ">
          <div className="flex flex-column">
            <form className="flex flex-column flex-wrap gap-2">
              <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label
                    className="text-3xl font-medium w-auto pr-2 min-w-min"
                    style={{ marginLeft: "-45px" }}
                  >
                    Cedula:
                  </label>
                  <InputText
                    className="text-2xl"
                    type="number"
                    placeholder="Ingrese su Cedula"
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label className="text-3xl font-medium w-full min-w-min">
                    Apellido Paterno:
                  </label>
                  <InputText
                    type="text"
                    placeholder="Ingrese sus Nombres"
                    className="w-full min-w-min text-2xl"
                  />
                </div>
                <div className="flex align-items-center justify-content-center h-5rem">
                  <label className="text-3xl font-medium w-full min-w-min">
                    Apellido Materno:
                  </label>
                  <InputText
                    type="text"
                    placeholder="Ingrese sus Apellidos"
                    className="w-full min-w-min text-2xl"
                  />
                </div>
              </div>

              <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label
                    className="text-3xl font-medium w-full min-w-min"
                    style={{ marginLeft: "-20px" }}
                  >
                    Primer Nombre:
                  </label>
                  <InputText
                    type="text"
                    placeholder="Ingrese sus Nombres"
                    className="w-full text-2xl"
                  />
                </div>
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label className="text-3xl font-medium w-full min-w-min">
                    Segundo Nombre:
                  </label>
                  <InputText
                    type="text"
                    placeholder="Ingrese sus Apellidos"
                    className="w-full text-2xl"
                  />
                </div>

                <div className="flex align-items-center justify-content-center w-auto h-6rem ">
                  <label className="text-3xl font-medium w-auto min-w-min">
                    Fecha de nacimiento:
                  </label>
                  <Calendar
                    placeholder="Ingrese su Fecha de Nacimiento"
                    showIcon={true}
                    className="w-full large-font"
                  />
                </div>
              </div>

              <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label
                    className="text-3xl font-medium w-auto min-w-min"
                    style={{ marginLeft: "-65px", marginRight: "5px" }}
                  >
                    Pais de nacimiento:
                  </label>
                  <Dropdown
                    optionLabel="name"
                    placeholder="Seleccione"
                    className="w-full md:w-14rem"
                  />
                </div>
                <div className="flex align-items-center justify-content-center w-auto h-5remtable">
                  <label className="text-3xl font-medium w-auto min-w-min">
                    Edad:
                  </label>
                  <InputText
                    type="number"
                    placeholder="Ingrese su edad"
                    className="w-full text-2xl"
                  />
                </div>

                <div className="flex align-items-center justify-content-center w-auto h-5rem ">
                  <label className="text-3xl font-medium w-auto min-w-min">
                    Genero:
                  </label>
                  <Dropdown
                    optionLabel="name"
                    placeholder="Seleccione"
                    className="w-full md:w-14rem"
                  />
                </div>
              </div>

              <div className="h1-rem">
                <Divider align="center">
                  <h4 className="text-7xl font-smibold lg:md-2">Dirección</h4>
                </Divider>
              </div>

              <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
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

              <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
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
                    Numero de casa:
                  </label>
                  <InputText
                    type="number"
                    placeholder="Ingrese numero de casa"
                    className="w-full text-2xl"
                  />
                </div>
              </div>

              <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-8 flex-wrap">
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label className="text-3xl font-medium w-full min-w-min">
                    Telefono de casa:
                  </label>
                  <InputText
                    type="text"
                    placeholder="Ingrese el telefono"
                    className="w-full text-2xl"
                  />
                </div>
                <div className="flex align-items-center justify-content-center w-auto h-5rem">
                  <label className="text-3xl font-medium w-full min-w-min">
                    Telefono Personal:
                  </label>
                  <InputText
                    type="number"
                    placeholder="Ingrese el telefono"
                    className="w-full text-2xl"
                  />
                </div>

                <div className="flex align-items-center justify-content-center w-auto h-5rem ">
                  <label className="text-3xl font-medium w-auto pr-2 min-w-min">
                    Correo:
                  </label>
                  <InputText
                    type="email"
                    placeholder="Ingrese el correo"
                    className="w-full text-2xl"
                  />
                </div>
              </div>

              <div className="h1-rem">
                <Divider align="center">
                  <h4 className="text-7xl font-smibold lg:md-2">
                    Discapacidad
                  </h4>
                </Divider>
              </div>
              <div className="formgroup ">
                <div className="flex flex-column gap-4">
                  <div className="flex-wrap ">
                    <label className="text-3xl font-medium w-auto min-w-min">
                      Tienes algun tipo de discapacidad? :
                    </label>
                    <div className="flex flex-initial gap-3 align-items-center justify-content-center">
                      <div className="flex flex-none">
                        <RadioButton inputId="Si" name="si" value="si" />
                        <label htmlFor="si" className="ml-2 w-full text-2xl">
                          Si
                        </label>
                      </div>
                      <div className="flex flex-none">
                        <RadioButton inputId="no" name="no" value="no" />
                        <label htmlFor="no" className="ml-2 w-full text-2xl">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <Card className="border-solid border-blue-800 border-3 flex align-items-center justify-content-center mb-6">
                    <div className="flex align-items-center justify-content-center  mb-3">
                      <label className="text-2xl font-medium w-auto min-w-min">
                        Tipo de Discapacidad:
                      </label>
                      <Dropdown
                        optionLabel="name"
                        placeholder="Seleccione el tipo"
                        className="w-full md:w-14rem"
                      />
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto mb-3">
                      <label className="text-2xl font-medium w-auto min-w-min">
                        N° Carnet Conadis:
                      </label>
                      <InputText
                        type="number"
                        placeholder="Ingrese el numero"
                      />
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto ">
                      <label className="text-2xl font-medium w-auto min-w-min">
                        Grado Discapacidad:
                      </label>
                      <InputText type="number" placeholder="Ingrese el grado" />
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap ">
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
