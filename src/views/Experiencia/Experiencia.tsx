import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Fieldset} from "primereact/fieldset";
import cardHeader from "../../shared/CardHeader";
import React from "react";

const Experiencia = () => {

    return (
        <Fieldset className="fgrid col-fixed">
            <Card header={cardHeader}
                  className="border-solid border-blue-800 border-3">
                <Divider align="center">
                    <h1 className="text-7xl font-smibold lg:md-2">Experiencia</h1>
                </Divider>

                <div className="flex justify-content-center flex-wrap">
                    <form>
                        <div className="flex flex-wrap flex-row">

                            <div className="flex align-items-center justify-content-center">
                                <div className="flex flex-column">
                                    <div
                                        className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label htmlFor="institution"
                                                   className="text-3xl font-medium w-full min-w-min">Institución:</label>
                                            <InputText id="institution"
                                                       className="w-full min-w-min text-2xl"/>

                                        </div>
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label htmlFor="start-date"
                                                   className="text-3xl font-medium w-full min-w-min">Fecha Inicial:</label>
                                            <Calendar className=" w-full min-w-min "
                                                      id="institution"
                                                      name="institution"
                                                      dateFormat="dd/mm/yy"
                                                      showIcon/>
                                        </div>

                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2 ">
                                            <label htmlFor="work-area"  className="text-3xl font-medium w-auto min-w-min">Área de Trabajo:</label>
                                            <Dropdown
                                                id="work-area"
                                                placeholder="Seleccione"
                                                className="w-full min-w-min text-2xl"
                                            />

                                        </div>
                                    </div>


                                    <div
                                        className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 ">
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label htmlFor="job" className="text-3xl font-medium w-full  min-w-min">Puesto:</label>
                                            <InputText id="job"
                                                       className="w-auto min-w-min text-2xl"/>


                                        </div>
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label htmlFor="start-date"
                                                   className="text-3xl font-medium w-full min-w-min">Fecha Final:</label>
                                            <Calendar className=" w-full min-w-min "
                                                      id="institution"
                                                      name="institution"
                                                      dateFormat="dd/mm/yy"
                                                      showIcon/>
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
                    <Column field='Experiencia Agregada' header="Experiencia Agregada"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                    <Column field='Acciones' header="Acciones"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                </DataTable>


            </Card>

        </Fieldset>
    )

}

export default Experiencia;
