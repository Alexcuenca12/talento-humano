import React from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import "../../styles/Recomendaciones.css";
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputNumber} from "primereact/inputnumber";

class Recomendaciones extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      file: null,
    };
  }

  handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileUpload = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    this.setState({ file });
  };

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
  };

  render() {
    return (
        <Fieldset className="fgrid col-fixed">
          <Card header={cardHeader}
                className="border-solid border-blue-800 border-3">
            <Divider align="center">
              <h1 className="text-7xl font-smibold lg:md-2">Recomendaciones Personales</h1>
            </Divider>

            <div className="flex justify-content-between flex-wrap">
              <form>
                <div className="flex flex-wrap flex-row justify-content-center">

                  <div className="flex align-items-center justify-content-center">
                    <div className="flex flex-column justify-content-center ml-6 ">
                      <div
                          className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                        <div
                            className="flex align-items-center justify-content-center w-auto pr-2">
                          <label htmlFor="nombres"
                                 className="text-3xl font-medium w-auto min-w-min">Nombres:</label>
                          <InputText id="nombres"
                                     className="w-full min-w-min text-2xl"/>

                        </div>
                        <div
                            className="flex align-items-center justify-content-center w-auto pr-2">
                          <label htmlFor="apellidos"
                                 className="text-3xl font-medium w-auto min-w-min">Apellidos:</label>
                          <InputText id="apellidos"
                                     className="w-full min-w-min text-2xl"/>
                        </div>

                      </div>


                      <div
                          className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 mt-5">
                        <div
                            className="flex align-items-center justify-content-center w-auto pr-2">
                          <label htmlFor="job" className="text-3xl font-medium w-full  min-w-min">Email:</label>
                          <InputText id="job"
                                     className="w-auto min-w-min text-2xl"/>


                        </div>
                        <div
                            className="flex align-items-center justify-content-center w-auto pr-2">
                          <label htmlFor="telefono"
                                 className="text-3xl font-medium w-auto min-w-min">Telefono:</label>
                          <InputNumber id="telefono"
                                     className="w-full min-w-min text-2xl"/>
                        </div>


                      </div>
                      <div
                          className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                        <div
                            className="flex align-items-center justify-content-center w-auto min-w-min">
                          <Button type="submit" label="Agregar"
                                  className="w-full text-3xl min-w-min "
                                  rounded/>
                        </div>
                        <div
                            className="flex align-items-center justify-content-center w-auto min-w-min">
                          <Button type="button" label="Cancel"
                                  className="w-full text-3xl min-w-min"
                                  rounded/>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-column align-items-center justify-content-center ml-4">
                    <label className="flex text-3xl font-medium">Subir PDF:</label>
                    <FileUpload name="pdf"
                                chooseLabel="Escoger"
                                uploadLabel="Cargar"
                                cancelLabel="Cancelar"
                                emptyTemplate={<p className="m-0 p-button-rounded">Arrastre y suelte los
                                  archivos aquí para
                                  cargarlos.</p>}/>
                  </div>
                </div>
              </form>
            </div>

            <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5  w-full h-full text-3xl font-medium">
              <Column field='Experiencia Agregada' header="Recomendaciones Personales"
                      headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
              <Column field='Acciones' header="Acciones"
                      headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
            </DataTable>


          </Card>

        </Fieldset>
    );
  }
}

export default Recomendaciones;
