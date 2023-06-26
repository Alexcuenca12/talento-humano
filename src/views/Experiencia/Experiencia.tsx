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
        <Fieldset className="m-5">
            <Card header={cardHeader}
                  className="border-solid border-blue-800 border-3">
                <Divider align="center">
                    <h1 className="text-7xl font-smibold lg:md-2">Experiencia</h1>
                </Divider>
                <div className="flex align-items-center justify-content-around">
                    <form className="formgrid-inline">
                        <div className="formgroup-inline">
                            <div className="field col">
                                <label htmlFor="institution">Institución</label>
                                <InputText id="institution"
                                           className="p-inputtext-sm w-full"/>
                            </div>
                            <div className="field col">
                                <label htmlFor="start-date">Fecha Inicial</label>
                                <Calendar id="start-date"
                                          dateFormat="dd/mm/yy"
                                          className="p-inputtext-sm w-full"/>
                            </div>
                            <div className="field col">
                                <label htmlFor="work-area">Área de Trabajo</label>
                                <Dropdown
                                    id="work-area"
                                    placeholder="Seleccione"
                                    className="p-inputtext-sm w-full"
                                />
                            </div>
                        </div>
                        <div className="formgroup-inline">
                            <div className="field col">
                                <label htmlFor="job">Puesto</label>
                                <InputText id="job"
                                           className="p-inputtext-sm w-full"/>

                            </div>
                            <div className="field col">
                                <label htmlFor="end-date">Fecha Final</label>
                                <Calendar id="end-date"
                                          dateFormat="dd/mm/yy"
                                          className="p-inputtext-sm w-full"/>
                            </div>
                            <div className="field col-4 flex justify-content-center align-items-end">
                                <FileUpload mode="basic" chooseLabel="Subir PDF"/>
                            </div>
                        </div>


                        <div className="formgroup-inline center-table">
                            <div className="field ">
                                <Button label="Agregar" severity="success" rounded/>
                            </div>
                            <div className="field  ">
                                <Button label="Cancelar" severity="secondary" rounded/>
                            </div>
                        </div>

                    </form>

                </div>
                <Card className="my-5 mx-auto">
                    <DataTable>
                        <Column field='Experiencia Agregada' header="Experiencia Agregada"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field='Acciones' header="Acciones"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                    </DataTable>
                </Card>



            </Card>

        </Fieldset>
    )

}

export default Experiencia;
