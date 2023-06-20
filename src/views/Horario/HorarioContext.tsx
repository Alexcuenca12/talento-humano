import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Horario.css';


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
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario
    }

    render() {
        return (
            <div className='div-page-horario'>
                <div className='div-contenedor-horario div-general-horario'>
                    <div>
                        <h1 className="page-title-horario">INSTITULO SUPERIOR TECNOLOGICO DEL AZUAY</h1>

                    </div>
                    <div className="title-container-horario ">
                        <br />
                        <div className="title-line-horario"></div>
                        <h1 className="page-title-horario">HORARIO</h1>
                        <div className="title-line-horario"></div>
                    </div>

                    <div className=''>

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-rows-horario">

                                <div className="input-container-horario">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="materia"
                                                name="materia"
                                            />
                                            <label htmlFor="materia">Materia</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="input-container-horario">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="horas"
                                                name="horas"
                                            />
                                            <label htmlFor="horas">Horas</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="input-container-horario">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="ciclo"
                                                name="ciclo"
                                            />
                                            <label htmlFor="ciclo">Ciclo</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="input-container-horario">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="curso"
                                                name="curso"
                                            />
                                            <label htmlFor="curso">Curso</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="input-container-horario">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="carrera"
                                                name="carrera"
                                            />
                                            <label htmlFor="carrera">Carrera</label>
                                        </span>
                                    </div>
                                </div>


                            </div>
                            <div className=''>
                                <div className="table-container-horario">
                                    <table className="data-table-horario">
                                        <thead>
                                            <tr>
                                                <th>Materia</th>
                                                <th>Nombre</th>
                                                <th>Horas Semanales</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>mate</td>
                                                <td>Maria</td>
                                                <td>80 horas</td>
                                            </tr>
                                            <tr>
                                                <td>lengua</td>
                                                <td>Pepe</td>
                                                <td>80 horas</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br/>
                                <div className='dividir-botons-final-horario'>
                                    <div className="">
                                        <Button type="submit" className='button-circular-horario' label="GUARDAR" style={{
                                            background: '#ff9800',
                                            borderRadius: '10%',
                                            fontSize:'10px',
                                            justifyContent:'center'
                                        }} />
                                    </div>
                                    <div className=''>
                                        <Button type="button" label="AGREGAR" className='button-circular-horario' style={{
                                            background: '#ff9800',
                                            borderRadius: '10%',
                                            fontSize:'10px',
                                            justifyContent:'center'
                                        }} />
                                    </div>
                                </div>

                            </div>
                        </form>



                    </div>
                </div>
            </div>
        );
    }
}

export default HorarioCont;