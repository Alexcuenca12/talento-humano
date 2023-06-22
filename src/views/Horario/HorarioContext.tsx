import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import '../../styles/Horario.css';
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";


class HorarioCont extends React.Component {
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
            <Fieldset className="m-5">
                <Card header={cardHeader}
                      className="border-solid border-blue-800 border-3">
                    <Card className="text-center">
                        <div className="h1-rem">
                            <Divider align="center">
                                <h1 className="text-7xl font-smibold lg:md-2">Horario</h1>
                            </Divider>
                        </div>

                        <div className="flex">
                            <div className="flex-1 align-items-center">
                                <form onSubmit={this.handleSubmit} className="formgroup-inline ">

                                    <div className="field col md:col-4 align-items-start">
                                        <label htmlFor="materia">Materia:</label>
                                        <InputText className="" id="materia" name="materia"
                                                   onChange={this.handleChange}/>
                                    </div>
                                    <div className="field col md:col-4 align-items-start">
                                        <label htmlFor="horas">Horas Semanales:</label>
                                        <InputText className="" id="horas" name="horas"
                                                   onChange={this.handleChange}/>
                                    </div>
                                    <div className="field col md:col-4 align-items-start">
                                        <label htmlFor="ciclo">Ciclo:</label>
                                        <InputText className="" id="ciclo" name="ciclo"
                                                   onChange={this.handleChange}/>
                                    </div>
                                    <div className="field col md:col-4 align-items-start">
                                        <label htmlFor="curso">Curso:</label>
                                        <InputText className="" id="curso" name="curso"
                                                   onChange={this.handleChange}/>
                                    </div>
                                    <div className="field col md:col-4 align-items-start">
                                        <label htmlFor="carrera">Carrera:</label>
                                        <InputText className="" id="carrera" name="carrera"
                                                   onChange={this.handleChange}/>
                                    </div>

                                </form>
                            </div>
                            <div className='flex-none'>
                                <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5 ">
                                    <Column field="Materia" header="Materia"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field="Nombre" header="Nombre"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field="Horas Semanales" header="Horas Semanales"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                                </DataTable>
                                <div className="m-5">
                                    <div className="field">
                                        <Button type="submit" label="AGREGAR"/>
                                    </div>
                                </div>


                            </div>
                        </div>


                        <div>
                        </div>
                    </Card>
                </Card>
            </Fieldset>
        );
    }
}

export default HorarioCont;