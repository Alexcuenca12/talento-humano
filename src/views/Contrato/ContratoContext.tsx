import React from 'react';
import {InputText} from 'primereact/inputtext';
import {FileUpload} from 'primereact/fileupload';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
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
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario
    }

    render() {
        return (
            <Fieldset
                className="fgrid col-fixed ">
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap">
                    <div className="h1-rem">
                        <Divider align='center'>
                            <h1 className="text-7xl font-smibold lg:md-2  w-full h-full max-w-full max-h-full min-w-min">Contrato</h1>
                        </Divider>
                    </div>

                    <div className="flex justify-content-center flex-wrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="flex flex-wrap flex-row">
                                <div className="flex align-items-center justify-content-center">
                                    <div className="flex flex-column flex-wrap gap-4">
                                        <div
                                            className="flex flex-wrap w-full h-full justify-content-between">
                                            <label htmlFor="inicio" className="text-3xl font-medium w-auto min-w-min">Fecha
                                                Inicio:</label>
                                            <Calendar
                                                className=" text-2xl"
                                                id="inicio"
                                                name="inicio"
                                                required
                                                dateFormat="dd/mm/yy"
                                                showIcon
                                                onChange={this.handleChange}
                                            />

                                        </div>
                                        <div
                                            className="flex flex-wrap w-full h-full  justify-content-between ">
                                            <label htmlFor="fin" className="text-3xl font-medium w-auto min-w-min">Fecha
                                                Fin:</label>
                                            <Calendar
                                                className="text-2xl"
                                                id="fin"
                                                name="fin"
                                                required
                                                dateFormat="dd/mm/yy"
                                                showIcon
                                                onChange={this.handleChange}
                                            />

                                        </div>
                                        <div
                                            className="flex flex-wrap w-full h-full  justify-content-between  ">
                                            <label htmlFor="anios" className="text-3xl font-medium w-auto min-w-min">Años
                                                de duracion:</label>
                                            <InputText className="text-2xl" id="anios" required name="anios"
                                                       onChange={this.handleChange}/>

                                        </div>
                                        <div
                                            className="flex flex-wrap w-full h-full  justify-content-between  ">
                                            <label htmlFor="horas"
                                                   className="text-3xl font-medium w-auto min-w-min">Horas:</label>
                                            <InputText className="text-2xl" id="horas" name="horas"
                                                       onChange={this.handleChange}/>

                                        </div>
                                        <div
                                            className="flex flex-wrap w-full h-full  justify-content-between  ">
                                            <label htmlFor="cargo"
                                                   className="text-3xl font-medium w-auto min-w-min">Cargo:</label>
                                            <InputText className="text-2xl" id="cargo" name="cargo"
                                                       onChange={this.handleChange}/>
                                        </div>
                                        <div
                                            className="flex flex-wrap w-full h-full  justify-content-between  ">
                                            <label htmlFor="salario"
                                                   className="text-3xl font-medium w-auto min-w-min">Salario:</label>
                                            <InputText className="text-2xl" id="salario" name="salario"
                                                       onChange={this.handleChange}/>

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


                </Card>


            </Fieldset>
        )
            ;
    }
}

export default ContratoCont;