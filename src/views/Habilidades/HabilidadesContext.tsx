import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Habilidades.css';

class HabilidadesContext extends React.Component {
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
      <div className='div-page-habilidad'>
        <div className='div-contenedor-habilidad div-general-habilidad'>
          <div className="title-container-habilidad">
            <div className="title-line-habilidad"></div>
            <h1 className="page-title-habilidad">HABILIDADES</h1>
            <div className="title-line-habilidad"></div>
          </div>
          <div className='contenedor-habilidad'>
            <form onSubmit={this.handleSubmit}>
              <div className="div-ingreso-habilidad">
                <label htmlFor="descripcion">Descripcion de Habilidad:</label>
                <InputText className="small-input-habilidad" id="descripcion" placeholder='Ingrese una descripción' name="descripcion" onChange={this.handleChange} />
              </div>
              <br />
              <div className='div-botons-habilidad'>
                <Button type="button" label="CANCELAR" className="small-button-habilidad  " style={{ background: 'black' }} />
                <Button type="submit" label="AGREGAR" className="small-button-habilidad " style={{ background: 'black' }} />
              </div>
            </form>
          </div>
          <div className='div-table-habilidad'>
            <div className="table-container-habilidad">
              <table className="data-table-habilidad">
                <thead>
                  <tr>
                    <th>Descripciones Agregadas</th>
                    <th>Acciones</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Descripcion 1</td>
                    <td>Escuela XYZ</td>
                  </tr>
                  <tr>
                    <td>Secundaria</td>
                    <td>Colegio ABC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


          <br />
          <div className="div-button-habilidad">
            <Button type="button" label="CONTINUAR ➠" className="button-habilidad" style={{ background: 'black' }} />
          </div>

        </div>


      </div>
    );
  }
}

export default HabilidadesContext;