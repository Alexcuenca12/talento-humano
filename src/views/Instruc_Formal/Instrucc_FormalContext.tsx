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

                    <div className="formgroup-inline center-table ">

                        <form onSubmit={this.handleSubmit} className="formgroup-inline text-center">
                            <div className="field col md:col-4">
                                <label htmlFor="firstName">Nivel de Institución:</label>
                                <InputText className="" id="firstName" name="firstName"
                                           onChange={this.handleChange}/>
                            </div>
                            <div className="field col md:col-4">
                                <label htmlFor="lastName">Titulo Obtenido:</label>
                                <InputText className="" id="lastName" name="lastName"
                                           onChange={this.handleChange}/>
                            </div>

                            <div className="field col md:col-4">
                                <label htmlFor="email">Institucion Educativa:</label>
                                <InputText className="" id="email" name="email"
                                           onChange={this.handleChange}/>
                            </div>
                            <div className="field col md:col-4">
                                <label htmlFor="phone">Tiempo de Estudio:</label>
                                <InputText className="" id="phone" name="phone"
                                           onChange={this.handleChange}/>
                            </div>

                        </form>

                    </div>
                    <div className="formgroup-inline center-table">
                        <div className="field">
                            <Button type="submit" label="Agregar"/>
                        </div>
                        <div className="field">
                            <Button type="button" label="Cancel"/>
                        </div>
                    </div>
                        <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5 ">
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

