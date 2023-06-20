import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import '../../styles/Contrato.css';


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
            <div className='div-page-contrato'>
                <div className='div-contenedor-contrato div-general-contrato'>
                    <div>
                        <h1 className="page-title-contrato">INSTITULO SUPERIOR TECNOLOGICO DEL AZUAY</h1>

                    </div>
                    <div className="title-container-contrato">

                        <br />
                        <div className="title-line-contrato"></div>
                        <br />
                        <h1 className="page-title-contrato">CONTRATO</h1>
                        <div className="title-line-contrato"></div>
                    </div>

                    <div className='divisor-contrato  '>


                        <form onSubmit={this.handleSubmit}>
                            <div className="form-rows-contrato">
                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <Calendar
                                                id="inicio"
                                                name="inicio"

                                            />
                                            <label htmlFor="inicio">Fecha Inicio</label>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <Calendar
                                                id="fin"
                                                name="fin"
                                            />
                                            <label htmlFor="fin">Fecha Fin</label>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="anios"
                                                name="anios"
                                            />
                                            <label htmlFor="anios">Años de Duracion</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="hora"
                                                name="hora"
                                            />
                                            <label htmlFor="hora">Horas</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="cargo"
                                                name="cargo"
                                            />
                                            <label htmlFor="cargo">Cargo</label>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <InputText
                                                id="salario"
                                                name="salario"
                                            />
                                            <label htmlFor="salario">Salario</label>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-container-contrato">
                                    <div className="p-inputgroup">
                                        <span className="p-float-label card flex justify-content-center">
                                            <p>
                                                SUBIR PDF:
                                                <br />
                                                <input type="file" name="evidencia" accept="pdf"
                                                    required />
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <div className="">
                                    <Button type="button" className='button-contrato' label="GUARDAR" style={{
                                        background: '#ff9800',
                                        borderRadius: '10%',
                                        fontSize:'10px',
                                        justifyContent:'center'
                                    }} />
                                </div>
                            </div>

                            <div className=''>
                                <div className="table-container-contrato">
                                    <table className="data-table-contrato">
                                        <thead>
                                            <tr>
                                                <th>Fecha Inicio</th>
                                                <th>Fecha Fin </th>
                                                <th>Años de Duración</th>
                                                <th>Horas</th>
                                                <th>Cargo</th>
                                                <th>Salario</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>06/09/2023</td>
                                                <td>06/10/2023</td>
                                                <td>3 Años</td>
                                                <td>805 horas</td>
                                                <td>Ninguno</td>
                                                <td>900</td>


                                            </tr>
                                            <tr>
                                                <td>18/02/2023</td>
                                                <td>26/05/2024</td>
                                                <td>8 Años</td>
                                                <td>2305 horas</td>
                                                <td>Ninguno</td>
                                                <td>990</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                <div className='dividir-botons-final-contrato'>
                                    <div className="">
                                        <Button className='button-circular-contrato' label="AGREGAR" style={{
                                            background: '#ff9800',
                                            borderRadius: '10%',
                                            fontSize:'10px',
                                            justifyContent:'center'
                                        }} />
                                    </div>
                                    <br />
                                    <div className="">
                                        <Button className='button-circular-contrato' label="GUARDAR" style={{
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


            </div >
        );
    }
}

export default ContratoCont;