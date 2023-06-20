import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import '../../styles/Recomendaciones.css';

class Recomendaciones extends React.Component {
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
          <h1 className="page-title">RECOMENDACIONES PERSONALES</h1>
          <div className="title-line"></div>
        </div>
        <form className='formulario' onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta"htmlFor="level">Nombres:</label>
              <InputText className="small-input" id="level" name="level" onChange={this.handleChange} />
            </div>
            <div className="input-container">
              <label className="etiqueta" htmlFor="title">Apellidos:</label>
              <InputText className="small-input" id="title" name="title" onChange={this.handleChange} />
            </div>
            <div className="input-container">
  <label className="etiqueta" htmlFor="institution">Email:</label>
  <InputText className="small-input" id="title" name="title" onChange={this.handleChange} />
</div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta" htmlFor="duration">Telefono:</label>
              <InputText className="small-input" id="duration" name="duration" onChange={this.handleChange} />
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
          <div className="form-row">
            
            <div className="input-container">
              
              
            </div>
 
          </div>
          <div className="form-row-buttons">
            <Button type="submit" label="Agregar" className="small-button p-button-success" style={{ background: '#0C3255' }} />
            <Button type="button" label="Cancelar" className="small-button p-button-secondary" style={{background: '#FF9800' }} />
          </div>
        </form>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '70%' }}>Recomendaciones Agregadas</th>
                <th style={{ width: '30%' }}>Acciones</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primaria</td>
                <td>Escuela XYZ</td>
               
              </tr>
              <tr>
                <td>Secundaria</td>
                <td>Colegio ABC</td>
             
              </tr>
              <tr>
                <td>Universidad</td>
                <td>Universidad 123</td>
               
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <Button type="button" label="Continuar" className="small-button p-button-secondary additional-button" style={{ background: '#0C3255'}} />
        </div>
      </div>
    </div>
    );
  }
}

export default Recomendaciones;
