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
                    <div className="title-container-horario ">
                        <div className="title-line-horario"></div>
                        <h1 className="page-title-horario">HORARIO</h1>
                        <div className="title-line-horario"></div>
                    </div>
                    <div className='contenedor-horario'>
                        <div className='div-ingreso-horario'>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-rows-horario">

                                </div>
                                <div className="input-container-horario">
                                    <label htmlFor="materia">Materia:</label>
                                    <InputText className="small-input-horario" id="materia" name="materia" onChange={this.handleChange} />
                                </div>
                                <div className="input-container-horario">
                                    <label htmlFor="horas">Horas Semanales:</label>
                                    <InputText className="small-input-horas-horario" id="horas" name="horas" onChange={this.handleChange} />
                                </div>
                                <div className="input-container-horario">
                                    <label htmlFor="ciclo">Ciclo:</label>
                                    <InputText className="small-input-horario" id="ciclo" name="ciclo" onChange={this.handleChange} />
                                </div>
                                <div className="input-container-horario">
                                    <label htmlFor="curso">Curso:</label>
                                    <InputText className="small-input-horario" id="curso" name="curso" onChange={this.handleChange} />
                                </div>
                                <div className="input-container-horario">
                                    <label htmlFor="carrera">Carrera:</label>
                                    <InputText className="small-input-horario" id="carrera" name="carrera" onChange={this.handleChange} />
                                </div>

                            </form>
                        </div>
                        <div className='div-tabla-horario'>
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
                            <div className="form-row-buttons-horario">
                                <Button type="submit" label="AGREGAR" style={{ background: 'black' }} />
                            </div>
                        </div>

                    </div>
                    <br/>
                    <div className='div-button-horario'>
                        <Button type="button" label="GUARDAR ➠"className='button-horario' style={{ background: 'black' }} />
                    </div>
                    <div>
                    </div>

                </div>
            </div>
        );
    }
}

export default HorarioCont;