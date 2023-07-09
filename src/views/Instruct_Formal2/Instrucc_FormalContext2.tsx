import React from 'react';
import {InputText} from 'primereact/inputtext';
import {FileUpload} from 'primereact/fileupload';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import '../../styles/Instruct_Formal2.css';
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {Fieldset} from "primereact/fieldset";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

class PrimeReactForm2 extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            file: null,
        };
    }

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFileUpload = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        this.setState({file});
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario
    }

    render() {
        return (
            <Fieldset
                className="flex flex-wrap align-items-center justify-content-center flex-colum flex-row max-w-full max-h-full">
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap"
                >
                    <div className="h1-rem">
                        <Divider align='center' className="flex flex-wrap">
                            <h1 className="text-7xl font-smibold lg:md-2  w-full h-full max-w-full max-h-full min-w-min">Instrucción
                                Formal</h1>
                        </Divider>
                    </div>

                    <div className="flex justify-content-between flex-wrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="flex flex-wrap flex-row">
                                <div className="flex align-items-center justify-content-center">
                                    <div className="flex flex-column">
                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label htmlFor="firstName"
                                                       className="text-3xl font-medium w-full min-w-min">Nivel
                                                    de Institución:</label>
                                                <InputText className="w-full min-w-min text-2xl" id="firstName"
                                                           name="firstName"
                                                           onChange={this.handleChange}/>
                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label htmlFor="lastName"
                                                       className="text-3xl font-medium w-full min-w-min">Titulo
                                                    Obtenido:</label>
                                                <InputText className="w-auto min-w-min text-2xl" id="lastName"
                                                           name="lastName"
                                                           onChange={this.handleChange}/>
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label htmlFor="tEstudio"
                                                       className="text-3xl font-medium w-full  min-w-min">Tiempo
                                                    de Estudio:</label>
                                                <Calendar
                                                    className=" w-full min-w-min "
                                                    id="institution"
                                                    name="institution"
                                                    dateFormat="dd/mm/yy"
                                                    showIcon
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>


                                        <div
                                            className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto h-5rem ">
                                                <label htmlFor="institutionE"
                                                       className="text-3xl font-medium w-full min-w-min">Institucion
                                                    Educativa:</label>
                                                <InputText className="w-full text-2xl" id="phone" name="institutionE"
                                                           type="text"
                                                           onChange={this.handleChange}/>
                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto h-6rem">
                                                <label htmlFor="Registro"
                                                       className="text-3xl font-medium w-full min-w-min">Registro
                                                    Senecyt:</label>
                                                <InputText className="w-full text-2xl" id="Registro" name="phone"
                                                           type="text"
                                                           onChange={this.handleChange}/>
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto h-6rem">
                                                <label htmlFor="anioEg"
                                                       className="text-3xl font-medium w-full min-w-min">Año
                                                    de
                                                    Egreso:</label>
                                                <Calendar
                                                    className="w-full min-w-min text-4xl"
                                                    id="institution"
                                                    name="institution"
                                                    dateFormat="dd/mm/yy"
                                                    showIcon
                                                    onChange={this.handleChange}
                                                />

                                            </div>
                                        </div>


                                        <div
                                            className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-10 flex-wrap">
                                            <div className="flex align-items-center justify-content-center w-auto">
                                                <label htmlFor="phone"
                                                       className="text-3xl font-medium w-auto min-w-min">Año
                                                    de
                                                    Estudio:</label>
                                                <InputText className="text-2xl" id="phone" name="phone" type="number"
                                                           onChange={this.handleChange}/>
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
                        <Column field="Nivel de Instruccion" header="Nivel de Instruccion"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Institución Educativa" header="Institución Educativa"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Título Obtenido" header="Título Obtenido"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Tiempo de Estudio" header="Tiempo de Estudio"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Registro Senecyt" header="Registro Senecyt"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Acciones" header="Acciones"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                    </DataTable>
                </Card>
            </Fieldset>

        );
    }
}

export default PrimeReactForm2;
