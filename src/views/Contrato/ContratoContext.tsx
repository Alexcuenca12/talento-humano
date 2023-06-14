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
            <div>
                <div className='div-contenedor-contrato div-general-contrato'>
                    <div className="title-container-contrato">
                        <div className="title-line-contrato"></div>
                        <h1 className="page-title-contrato">CONTRATO</h1>
                        <div className="title-line-contrato"></div>
                    </div>
                    <div className='divisor-contrato'>
                        <div className='div-ingreso-contrato'>

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-rows-contrato">

                                </div>

                                <div className="input-container-contrato">

                                    <label htmlFor="inicio">Fecha Inicio:</label>
                                    <Calendar
                                        className="small-input-contrato"
                                        id="inicio"
                                        name="inicio"
                                        required
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="input-container-contrato">

                                    <label htmlFor="fin">Fecha Fin:</label>
                                    <Calendar
                                        className="small-input-contrato"
                                        id="fin"
                                        name="fin"
                                        required
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="input-container-contrato">
                                    <label htmlFor="anios">Años de duracion:</label>
                                    <InputText className="anios-contrato" id="anios" required name="anios" onChange={this.handleChange} />

                                </div>
                                <div className="input-container-contrato">
                                    <label htmlFor="horas">Horas:</label>
                                    <InputText className="small-input-contrato" id="horas" name="horas" onChange={this.handleChange} />
                                </div>
                                <div className="input-container-contrato">
                                    <label htmlFor="cargo">Cargo:</label>
                                    <InputText className="small-input-contrato" id="cargo" name="cargo" onChange={this.handleChange} />
                                </div>
                                <div className="input-container-contrato">
                                    <label htmlFor="salario">Salario:</label>
                                    <InputText className="small-input-contrato" id="salario" name="salario" onChange={this.handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className='div-pdf-contrato'>
                            <div className="input-containerinput-container-contrato">
                                <p>
                                    SUBIR PDF:
                                    <br />
                                    <input type="file" name="evidencia" accept="pdf"
                                        required />

                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="div-button-contrato">
                        <Button type="button" className='button-contrato' label="CONTINUAR ➠" style={{ background: 'black' }} />
                    </div>
                </div>


            </div >
        );
    }
}

export default ContratoCont;