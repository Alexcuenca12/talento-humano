import "../../styles/CargaFamiliar.css";
import { Panel } from "primereact/panel";
import React, {useState, useEffect} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '../../styles/CargaFamiliar.css'
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Fieldset} from "primereact/fieldset";
import {Divider} from "primereact/divider";

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
    const comboOptions = [
        {label: 'Opción 1', value: 'opcion1'},
        {label: 'Opción 2', value: 'opcion2'},
        {label: 'Opción 3', value: 'opcion3'}
    ];

    return (
        <Fieldset className="fgrid col-fixed">

            <Card
                header={cardHeader}
                className="border-solid border-blue-800 border-3">
                <div className="h1-rem">
                    <Divider align='center' >
                        <h1 className="text-7xl font-smibold lg:md-2">Carga Familiar</h1>
                    </Divider>
                </div>
                <div className="flex justify-content-between flex-wrap">
                    <form >
                        <div className="flex flex-wrap flex-row ">
                            <div className="flex align-items-center justify-content-center">
                                <div className="flex flex-column">
                                    <div
                                        className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label  className="text-3xl font-medium w-full min-w-min">Cedula: </label>
                                            <InputText type="number" placeholder="Ingrese su Cedula" className="w-auto min-w-min text-2xl"/>
                                        </div>
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label className="text-3xl font-medium w-full min-w-min">Nombres:</label>
                                            <InputText type="text" placeholder="Ingrese sus Nombres" className="w-auto min-w-min text-2xl"/>
                                        </div>

                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2 ">
                                            <label className="text-3xl font-medium w-full min-w-min">Apellidos:</label>
                                            <InputText type="text" placeholder="Ingrese sus Apellidos" className="w-auto min-w-min text-2xl"/>

                                        </div>

                                    </div>
                                    <div
                                        className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1 ">
                                        <div
                                            className="flex align-items-center justify-content-center w-auto h-6rem">
                                            <label  className="text-3xl font-medium w-auto min-w-min">Fecha de nacimiento:</label>
                                            <Calendar placeholder="Ingrese su Fecha de Nacimiento"  className="w-full min-w-min text-4xl"
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
                            <div className="flex flex-column align-items-center justify-content-between ml-4">
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


                <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5  w-full h-full text-3xl font-medium ">
                    <Column field="Carga Familiar" header="Carga Familiar"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                    <Column field="PDF" header="PDF"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                    <Column field="Acciones" header="Acciones"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                </DataTable>
            </Card>


        </Fieldset>
    );
};

export default Persona;
