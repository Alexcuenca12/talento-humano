import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import '../../styles/Contrato.css';
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";


class ContratoCont extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };
    }

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario
    }

    render() {
        return (
            <Fieldset className="fgrid col-fixed ">
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-3">
                    <div className="h1-rem">
                        <Divider align='center'  >
                            <h1 className="text-7xl font-smibold lg:md-2">Contrato</h1>
                        </Divider>
                    </div>
                    <div className="flex">
                        <div className="flex-1 align-items-center justify-content-around">
                            <form onSubmit={this.handleSubmit} className="formgroup-inline ">

                                <div className="field col md:col-4 align-items-start">
                                    <label htmlFor="inicio">Fecha Inicio:</label>
                                    <Calendar
                                        className=""
                                        id="inicio"
                                        name="inicio"
                                        required
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="field col md:col-4 align-items-start">
                                    <label htmlFor="fin">Fecha Fin:</label>
                                    <Calendar
                                        className=""
                                        id="fin"
                                        name="fin"
                                        required
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="field col md:col-4 align-items-start">
                                    <label htmlFor="anios">Años de duracion:</label>
                                    <InputText className="" id="anios" required name="anios" onChange={this.handleChange} />
                                </div>
                                <div className="field col md:col-4 align-items-start">
                                    <label htmlFor="horas">Horas:</label>
                                    <InputText className="" id="horas" name="horas" onChange={this.handleChange} />
                                </div>
                                <div className="field col md:col-4 align-items-start">
                                    <label htmlFor="cargo">Cargo:</label>
                                    <InputText className="" id="cargo" name="cargo" onChange={this.handleChange} />
                                </div>
                                <div className="field col md:col-4 align-items-start">
                                    <label htmlFor="salario">Salario:</label>
                                    <InputText className="" id="salario" name="salario" onChange={this.handleChange} />
                                </div>
                            </form>

                            <div className="flex justify-content-center align-items-center">
                                <div className="field col-2">
                                    <Button label="Agregar" rounded/>
                                </div>
                                <div className="field col-2">
                                    <Button label="Cancelar" rounded/>
                                </div>
                            </div>
                        </div>


                        <div className='flex-none'>
                            <div className="fied md:col-8">
                                <label>Subir PDF:</label>
                                <FileUpload name="pdf"
                                            chooseLabel="Escoger"
                                            uploadLabel="Cargar"
                                            cancelLabel="Cancelar"
                                            emptyTemplate={<p className="m-0">Arrastre y suelte los archivos aquí para
                                                cargarlos.</p>}/>

                            </div>
                        </div>
                    </div>


                </Card>


            </Fieldset >
        );
    }
}

export default ContratoCont;