import React from 'react'
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '../../styles/Capacitacitaciones.css'
import cardHeader from "../../shared/CardHeader";
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";

export default function CapacitacionesContext() {
    const legendTemplate = (
        <div className="flex align-items-center gap-2">

        </div>
    )

    const comboOptions = [
        {label: 'Opción 1', value: 'opcion1'},
        {label: 'Opción 2', value: 'opcion2'},
        {label: 'Opción 3', value: 'opcion3'}
    ];
    return (
        <Fieldset className="fgrid col-fixed">
            <Card
                header={cardHeader}
                className="border-solid border-blue-800 border-y-1">

                <Card className="text-center ">
                    <div className="h1-rem">
                        <Divider align="center">
                            <h1 className="text-7xl font-smibold lg:md-2">Capacitaciones</h1>
                        </Divider>
                    </div>
                    <div className="flex justify-content-between flex-wrap">
                        <form>
                            <div className="flex flex-wrap flex-row">
                                <div className="flex align-items-center justify-content-center">
                                    <div className="flex flex-column">
                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label
                                                    className="text-3xl font-medium w-auto min-w-min">Institucion: </label>
                                                <Dropdown options={comboOptions} placeholder="" id="institucion"
                                                          className="border-round w-full min-w-min text-2xl"/>
                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-auto min-w-min">Tipo de evento:</label>
                                                <Dropdown options={comboOptions} placeholder="" className="border-round w-full min-w-min text-2xl"/>

                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label className="text-3xl font-medium w-auto min-w-min">Area de estudio:</label>
                                                <Dropdown options={comboOptions} placeholder="" className="border-round w-full min-w-min text-2xl"/>

                                            </div>
                                        </div>

                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 h-7rem">
                                                <label className="text-3xl font-medium w-auto min-w-min">Desde:</label>
                                                <Calendar className=" w-full min-w-min "
                                                          id="desde"
                                                          name="desde"
                                                          dateFormat="dd/mm/yy"
                                                          showIcon/>
                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-auto min-w-min">Hasta:</label>
                                                <Calendar className=" w-full min-w-min "
                                                          id="desde"
                                                          name="desde"
                                                          dateFormat="dd/mm/yy"
                                                          showIcon/>
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label className="text-3xl font-medium w-full  min-w-min">Numero de dias:</label>
                                                <InputText type="number" placeholder="" className="w-auto min-w-min text-2xl"/>
                                            </div>
                                        </div>


                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 h-7rem">
                                                <label className="text-3xl font-medium w-full  min-w-min">Nombre de evento:</label>
                                                <InputText type="text" placeholder="" className="w-auto min-w-min text-2xl"/>

                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-full  min-w-min">Tipo de certificado:</label>
                                                <Dropdown options={comboOptions} placeholder="" />
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label className="text-3xl font-medium w-full  min-w-min">N° de horas totales: </label>
                                                <InputText type="number" placeholder="" />

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
                        <Column field="Capacitaciones" header="Capacitaciones"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="PDF" header="PDF"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Acciones" header="Acciones"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                    </DataTable>


                </Card>
            </Card>


        </Fieldset>
    )
}
