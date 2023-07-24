import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "../../styles/Horario.css";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";

class HorarioCont extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
  };

  render() {
    return (
      <Fieldset className="fgrid col-fixed">
        <Card
          header={cardHeader}
          className="border-solid border-blue-800 border-3"
        >
          <Card className="text-center">
            <div className="h1-rem">
              <Divider align="center">
                <h1 className="text-7xl font-smibold lg:md-2">Horario</h1>
              </Divider>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="flex flex-wrap flex-row align-content-left">
                <div className="flex align-content-left">
                  <div className="flex flex-column flex-start gap-4 align-items-left justify-content-left">
                    <div className="flex flex-wrap w-full h-full align-items-left justify-content-left ">
                      <label
                        htmlFor="materia"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                        style={{ marginLeft: "55px" }}
                      >
                        Materia:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="materia"
                        name="materia"
                        onChange={this.handleChange}
                        style={{ marginLeft: "80px" }}
                      />
                    </div>
                    <div className="flex flex-start w-full h-full align-items-center justify-content-left">
                      <label
                        htmlFor="horas"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                        style={{ marginLeft: "55px" }}
                      >
                        Horas Semanales:
                      </label>
                      <InputText
                        id="horas"
                        name="horas"
                        className="text-2xl"
                        style={{ marginLeft: "5px" }}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-left">
                      <label
                        htmlFor="ciclo"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginLeft: "55px" }}
                      >
                        Ciclo:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="ciclo"
                        name="ciclo"
                        style={{ marginLeft: "108px" }}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-left">
                      <label
                        htmlFor="curso"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                        style={{ marginLeft: "55px" }}
                      >
                        Curso:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="curso"
                        name="curso"
                        style={{ marginLeft: "95px" }}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-left">
                      <label
                        htmlFor="carrera"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                        style={{ marginLeft: "55px" }}
                      >
                        Carrera:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="carrera"
                        name="carrera"
                        style={{ marginLeft: "82px" }}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className=""></div>
                    <div className="flex align-content-center">
                      <div className="flex flex-column flex-wrap gap-4 align-items-center justify-content-center">
                        <div className="flex flex-column flex-wrap gap-4 align-items-center justify-content-center">
                          <div className="flex flex-wrap w-full h-full align-items-center ">
                            <label
                              htmlFor="Periodo"
                              className="text-3xl font-medium w-auto min-w-min pr-2"
                              style={{
                                marginLeft: "55px",
                                marginRight: "77px",
                                marginTop: "-25px",
                              }}
                            >
                              Periodo:
                            </label>
                            <Dropdown
                              className="text-2xl"
                              id="Periodo"
                              name="Periodo"
                              onChange={this.handleChange}
                              placeholder="Seleccione el Periodo"
                              style={{ marginTop: "-25px" }}
                            />
                          </div>
                          <div className="flex flex-wrap w-full h-full align-items-center ">
                            <label
                              htmlFor="descripcion"
                              className="text-3xl font-medium w-auto min-w-min pr-2"
                              style={{
                                marginLeft: "55px",
                                marginRight: "25px",
                              }}
                            >
                              Descripcion:
                            </label>
                            <InputTextarea
                              autoResize
                              rows={5}
                              cols={30}
                              className="text-2xl"
                              id="descripcion"
                              name="descripcion"
                              style={{ marginLeft: "20px" }}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-column align-items-right justify-content-right ml-4">
                        <label
                          className="flex text-3xl font-medium"
                          style={{ marginLeft: "240px" }}
                        >
                          Subir PDF:
                        </label>
                        <FileUpload
                          name="pdf"
                          chooseLabel="Escoger"
                          uploadLabel="Cargar"
                          cancelLabel="Cancelar"
                          style={{ marginLeft: "500px" }}
                          emptyTemplate={
                            <p className="m-0 p-button-rounded">
                              Arrastre y suelte los archivos aquí para
                              cargarlos.
                            </p>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
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

            <DataTable
              tableStyle={{ minWidth: "50rem" }}
              className="mt-5  w-full h-full text-4xl font-medium"
            >
              <Column
                field="Materia"
                header="Materia"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
              <Column
                field="Horas"
                header="Horas"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
              <Column
                field="Ciclo"
                header="Ciclo"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
              <Column
                field="Curso"
                header="Curso"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
              <Column
                field="Periodo"
                header="Perido Academico"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
              <Column
                field="PDF"
                header="PDF"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
              <Column
                field="Acciones"
                header="Acciones"
                headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              ></Column>
            </DataTable>
          </Card>
        </Card>
      </Fieldset>
    );
  }
}

export default HorarioCont;
