
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Instruc_Formal.css'; 


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
        <div style={{ marginBottom: '120px' }}></div>
  
        <div className="centered-form">
          <div className="title-container">
            <div className="title-line"></div>
            <h1 className="page-title">INSTRUCCION FORMAL</h1>
            <div className="title-line"></div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <label htmlFor="firstName">Nivel de Institución:</label>
              <InputText className="small-input" id="firstName" name="firstName" onChange={this.handleChange} />
              <label htmlFor="lastName">Titulo Obtenido:</label>
              <InputText className="small-input" id="lastName" name="lastName" onChange={this.handleChange} />
            </div>
            <div className="form-row">
              <label htmlFor="email">Institucion Educativa:</label>
              <InputText className="small-input" id="email" name="email" onChange={this.handleChange} />
              <label htmlFor="phone">Tiempo de Estudio:</label>
              <InputText className="small-input" id="phone" name="phone" onChange={this.handleChange} />
            </div>
            <div className="form-row-buttons">
              <Button type="submit" label="Submit" className="small-button p-button-success" style={{ background: 'black' }} />
              <Button type="button" label="Cancel" className="small-button p-button-secondary" style={{ background: 'black' }} />
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Primaria</td>
                  <td>Escuela XYZ</td>
                  <td>Graduado en Primaria</td>
                  <td>6 años</td>
                  <td>Responsabilidad, Honestidad</td>
                </tr>
                <tr>
                  <td>Secundaria</td>
                  <td>Colegio ABC</td>
                  <td>Graduado en Secundaria</td>
                  <td>4 años</td>
                  <td>Trabajo en equipo, Disciplina</td>
                </tr>
                <tr>
                  <td>Universidad</td>
                  <td>Universidad 123</td>
                  <td>Título Universitario</td>
                  <td>5 años</td>
                  <td>Perseverancia, Liderazgo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="additional-button-container">
          <Button type="button" label="Additional Button" className="small-button p-button-secondary additional-button" style={{ background: 'black' }} />
</div>
        </div>
      </div>
    );
  }
}

export default PrimeReactForm;

