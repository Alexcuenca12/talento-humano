import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '../../styles/Capacitacitaciones.css'
import {Badge} from "primereact/badge";
import cardHeader from "../../shared/CardHeader";
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
export default function CapacitacionesContext() {
    const legendTemplate = (
        <div className="flex align-items-center gap-2">

        </div>
    )

    const comboOptions = [
        { label: 'Opción 1', value: 'opcion1' },
        { label: 'Opción 2', value: 'opcion2' },
        { label: 'Opción 3', value: 'opcion3' }
    ];
    return (
        <Fieldset className="m-5" >
            <Card
                header={cardHeader}
                className="border-solid border-blue-800 border-y-1">

                <Card className="text-center ">
                    <div className="h1-rem">
                        <h1 className="text-7xl lg:md-2">Capacitaciones</h1>
                    </div>
                    <div className="formgroup-inline text-center">
                        <div className="field col-5 md:col-4">
                            <label className="text-center" >Institucion: </label>
                            <Dropdown options={comboOptions} placeholder="" id="institucion" className="border-round appearance-none outline-none"/>
                        </div>
                        <div className="field col-4 md:col-4">
                            <label className="text-center">Tipo de evento:</label>
                            <Dropdown options={comboOptions} placeholder="" />
                        </div>
                        <div className="field col-5 md:col-3">
                            <label className="">Area de estudio:</label>
                            <Dropdown options={comboOptions} placeholder="" />
                        </div>

                    </div>

                    <div className="formgroup-inline text-center">
                        <div className="field col-5 md:col-4">
                            <label>Desde:</label>
                            <Calendar placeholder="" showIcon={true} />
                        </div>
                        <div className="field col-5 md:col-4">
                            <label>Hasta:</label>
                            <Calendar placeholder="" showIcon={true} />
                        </div>
                        <div className="field col-5 md:col-3">
                            <label>Numero de dias:</label>
                            <InputText type="number" placeholder="" />
                        </div>
                    </div>

                    <div className="formgroup-inline text-center">
                        <div className="field col-5 md:col-3">
                            <label>Nombre de evento:</label>
                            <InputText type="text" placeholder="" />
                        </div>

                        <div className="field col-5 md:col-4">
                            <label>Tipo de certificado:</label>
                            <Dropdown options={comboOptions} placeholder="" />
                        </div>
                        <div className="field col-5 md:col-4">
                            <label>N° de horas totales: </label>
                            <InputText type="number" placeholder="" />
                        </div>

                    </div>

                    <div className="formgroup-inline text-center">
                        <div className="field col-5 md:col-4">
                            <label>Subir PDF:</label>
                            <FileUpload name="pdf" chooseLabel="Seleccionar archivo" />
                        </div>
                    </div>

                    <div className="formgroup-inline center-table">
                        <div className="field ">
                            <Button label="Agregar" />
                        </div>
                        <div className="field ">
                            <Button label="Cancelar" />
                        </div>
                    </div>

                    <div className="formgroup-inline center-table">
                        <div className="card p-col-12">
                            <DataTable  tableStyle={{ minWidth: '50rem' }}>
                                <Column field="Capacitaciones" header="Capacitaciones"></Column>
                                <Column field="PDF" header="PDF"></Column>
                                <Column field="Acciones" header="Acciones"></Column>

                            </DataTable>
                        </div>
                    </div>
                </Card>
            </Card>


        </Fieldset>
    )
}
