import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import '../../styles/Instruc_Formal.css';
import {Fieldset} from "primereact/fieldset";
import cardHeader from "../../shared/CardHeader";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Calendar} from "primereact/calendar";


class PrimeReactForm extends React.Component {
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
            <Fieldset className="fgrid col-fixed">
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-3">
                    <div className="h1-rem">
                        <Divider align='center'>
                            <h1 className="text-7xl font-smibold lg:md-2">Instrucción Formal</h1>
                        </Divider>
                    </div>

                    <div className="flex justify-content-center flex-wrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="flex flex-wrap flex-row align-content-center">
                                <div className="flex align-items-center justify-content-center">
                                    <div className="flex flex-column">
                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label htmlFor="firstName"
                                                       className="text-3xl font-medium w-full min-w-min" style={{marginRight:"5px"}}>Nivel
                                                    de Instruccion:</label>
                                                <InputText className="w-full min-w-min text-2xl" id="firstName"
                                                           name="firstName"
                                                           onChange={this.handleChange}/>
                                            </div>
                                            <div
                                                className="flex align-items-left justify-content-left w-auto pr-2">
                                                <label htmlFor="lastName"
                                                       className="text-3xl font-medium w-full min-w-min" style={{marginRight:"15px", marginLeft:"20px"}}>Titulo
                                                    Obtenido:</label>
                                                <InputText className="w-auto min-w-min text-2xl" id="lastName"
                                                           name="lastName"
                                                           onChange={this.handleChange}/>
                                            </div>


                                        </div>
                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between pt-5">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label htmlFor="firstName"
                                                       className="text-3xl font-medium w-full min-w-min"  style={{marginRight:"5px"}}>Institucion Educativa:</label>
                                                <InputText className="w-full min-w-min text-2xl" id="firstName"
                                                           name="firstName"
                                                           onChange={this.handleChange}/>
                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label htmlFor="lastName"
                                                       className="text-3xl font-medium w-full min-w-min"  style={{marginRight:"15px", marginLeft:"20px"}}>Tiempo de estudio:</label>
                                                <InputText className="w-auto min-w-min text-2xl" id="lastName"
                                                           name="lastName"
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
                            </div>
                        </form>
                    </div>


                    <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5 w-full h-full text-3xl font-medium">
                        <Column field="Nivel de Institución" header="Nivel de Institución"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Institución Educativa" header="Institución Educativa"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Título Obtenido" header="Título Obtenido"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Tiempo de Estudio" header="Tiempo de Estudio"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Valores" header="Valores"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                    </DataTable>
                </Card>
            </Fieldset>
        );
    }
}

export default PrimeReactForm;

