import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import '../../styles/Instruct_Formal2.css';

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
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    this.setState({ file });
  }

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
  }

  render() {
    return (
      <div>
      <div style={{ marginBottom: '120px' }}></div>

      <div className="centered-form">
      <div className="icono_insti"></div>
        <div className="title-container">
          <div className="title-line"></div>
          <h1 className="page-title">INSTRUCCION FORMAL</h1>
          <div className="title-line"></div>
        </div>
        <form className="formulario" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta" htmlFor="level">Nivel de Institución:</label>
              <InputText className="small-input" id="level" name="level" onChange={this.handleChange} />
            </div>
            <div className="input-container">
              <label className="etiqueta" htmlFor="title">Título Obtenido:</label>
              <InputText className="small-input" id="title" name="title" onChange={this.handleChange} />
            </div>
            <div className="input-container">
  <label className="etiqueta" htmlFor="institution">Tiempo de Estudio:</label>
  <Calendar
    className="small-input"
    id="institution"
    name="institution"
    dateFormat="dd/mm/yy"
    showIcon
    onChange={this.handleChange}
  />
</div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta" htmlFor="duration">Institución Educativa:</label>
              <InputText className="small-input" id="duration" name="duration" onChange={this.handleChange} />
            </div>
            <div className="input-container">
              <label className="etiqueta" htmlFor="input6">Registro Seneciyt:</label>
              <InputText className="small-input" id="input6" name="input6" onChange={this.handleChange} />
            </div>
            <div className="input-container">
  <label className="etiqueta" htmlFor="institution">Tiempo de Estudio:</label>
  <Calendar
    className="small-input"
    id="institution"
    name="institution"
    dateFormat="dd/mm/yy"
    showIcon
    onChange={this.handleChange}
  />
</div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta" htmlFor="input8">Area de estudio:</label>
              <InputText className="small-input" id="input8" name="input8" onChange={this.handleChange} />
            </div>
            <div className="input-container">
              
              
            </div>
            <div className="input-container">
  <label className="etiqueta" htmlFor="pdf">Subir PDF:</label>
  <FileUpload
    className="small-input"
    id="pdf"
    name="pdf"
    chooseLabel="Seleccionar"
    mode="basic"
    uploadLabel="Subir"
    cancelLabel="Cancelar"
    customUpload
    
    accept=".pdf"
  />
</div>
          </div>
          <div className="form-row-buttons">
            <Button type="submit" label="Submit" className="small-button p-button-success" style={{ background: '#0C3255' }} />
            <Button type="button" label="Cancel" className="small-button p-button-secondary" style={{ background: '#FF9800' }} />
          </div>
        </form>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nivel de Institución</th>
                <th>Institución Educativa</th>
                <th>Título Obtenido</th>
                <th>Tiempo de Estudio</th>
                <th>Valores</th>
                <th>Campo 6</th>
                <th>Campo 7</th>
                <th>Campo 8</th>
                <th>Campo 9</th>
                <th>Subir PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primaria</td>
                <td>Escuela XYZ</td>
                <td>Graduado en Primaria</td>
                <td>6 años</td>
                <td>Responsabilidad, Honestidad</td>
                <td>Dato 6</td>
                <td>Dato 7</td>
                <td>Dato 8</td>
                <td>Dato 9</td>
                <td>PDF 1</td>
              </tr>
              <tr>
                <td>Secundaria</td>
                <td>Colegio ABC</td>
                <td>Graduado en Secundaria</td>
                <td>4 años</td>
                <td>Trabajo en equipo, Disciplina</td>
                <td>Dato 6</td>
                <td>Dato 7</td>
                <td>Dato 8</td>
                <td>Dato 9</td>
                <td>PDF 2</td>
              </tr>
              <tr>
                <td>Universidad</td>
                <td>Universidad 123</td>
                <td>Título Universitario</td>
                <td>5 años</td>
                <td>Perseverancia, Liderazgo</td>
                <td>Dato 6</td>
                <td>Dato 7</td>
                <td>Dato 8</td>
                <td>Dato 9</td>
                <td>PDF 3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <Button type="button" label="Additional Button" className="small-button p-button-secondary additional-button" style={{ background: '#0C3255' }} />
        </div>
      </div>
    </div>
    );
  }
}

export default PrimeReactForm2;
