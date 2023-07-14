import {Divider} from "primereact/divider";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Fieldset} from "primereact/fieldset";
import cardHeader from "../../shared/CardHeader";
import React from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";

const EvaDocente = () => {
    return (
        <Fieldset className="fgrid col-fixed">
            <Card header={cardHeader}
                  className="border-solid border-blue-800 border-3">
                <div className="h1-rem">
                    <Divider align="center">
                        <h1 className="text-7xl font-smibold lg:md-2">Evaluación Docente</h1>
                    </Divider>
                </div>
                <div className="flex justify-content-center flex-wrap">
                    <form>
                        <div className="flex flex-wrap flex-row">
                            <div className="flex align-items-center justify-content-center">
                                <div className="flex flex-column">

                                    <div
                                        className="flex align-items-center justify-content-center w-auto pr-2">
                                        <label htmlFor="career"
                                               className="text-3xl font-medium w-full min-w-min ">Carrera:</label>
                                        <Dropdown
                                            id="career"
                                            placeholder="Seleccione"
                                            className="text-2xl w-auto"
                                        />

                                    </div>
                                    <div
                                        className="flex align-items-center justify-content-center w-full pr-2 mt-5">
                                        <label htmlFor="period" className="text-3xl font-medium w-auto min-w-min ">Periodo Académico:</label>
                                        <Dropdown
                                            id="period"
                                            placeholder="Seleccione"
                                            className=" w-auto text-2xl"
                                        />

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
                    <Column header="Carrera"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}/>
                    <Column header="Periodo"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}/>
                    <Column header="Fecha de Registro"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}/>
                </DataTable>


            </Card>
        </Fieldset>
    )
}

export default EvaDocente;
