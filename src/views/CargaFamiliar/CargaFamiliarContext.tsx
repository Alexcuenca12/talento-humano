import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '../../styles/CargaFamiliar.css'
import {Panel} from "primereact/panel";
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

                <div className="formgroup-inline center-table ">
                    <div className="center-table">
                        <div className="field col md:col-4">
                            <label className="">Cedula: </label>
                            <InputText type="number" placeholder="Ingrese su Cedula"/>
                        </div>
                    </div>
                    <div className="center-table">
                        <div className="field col md:col-4">
                            <label className="">Nombres:</label>
                            <InputText type="text" placeholder="Ingrese sus Nombres"/>
                        </div>
                    </div>
                    <div className="center-table">
                        <div className="field col md:col-3">
                            <label className="">Apellidos:</label>
                            <InputText type="text" placeholder="Ingrese sus Apellidos"/>
                        </div>
                    </div>


                </div>

                <div className="formgroup-inline center-table">
                    <div className="center-table ">
                        <div className="field col-8 md:col-8 ">
                            <label>Fecha de nacimiento:</label>
                            <Calendar placeholder="Ingrese su Fecha de Nacimiento" showIcon={true}
                                      className="color-calendario"/>
                        </div>
                    </div>


                    <div className="field col-8 md:col-4">
                        <label>Subir PDF:</label>
                        <FileUpload name="pdf"
                                    chooseLabel="Escoger"
                                    uploadLabel="Cargar"
                                    cancelLabel="Cancelar"
                                    emptyTemplate={<p className="m-0 p-button-rounded">Arrastre y suelte los archivos aquí para
                                        cargarlos.</p>}/>

                    </div>
                </div>


                <div className="formgroup-inline center-table">
                    <div className="field">
                        <Button label="Agregar" rounded/>
                    </div>
                    <div className="field">
                        <Button label="Cancelar" rounded/>
                    </div>
                </div>

                <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5 ">
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
