
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Instruc_FormalService} from '../../services/Instru_FormalService'
import {InstruccionFormalData} from '../../interfaces/Primary/IInstrucc_Formal'


import '../../styles/Instruc_Formal.css'; 



function Instruc_Formal() {
  const [instruc1, setInstruc1] = useState<InstruccionFormalData[]>([]);
  const [formData, setFormData] = useState<InstruccionFormalData>({
    id_instruccion: 0,
    nivelInstruccion: "",
    institucionEducativa: "",
    tituloObtenido: "",
    num_SenecytRegistro: "",
    tiempoEstudio: 0,
    anioGraduacion: 0,
    areaEstudios: "",
    titulo: "",
    
  });

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const instrucService = new Instruc_FormalService();

  useEffect(() => {
    instrucService.getAll()
      .then((data) => {
        setInstruc1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    instrucService
      .save(formData)
      .then((response) => {
        resetForm();
        console.log('Formulario enviado exitosamente:', response);
        instrucService.getAll()
          .then((data) => {
            setInstruc1(data);
          })
          .catch((error) => {
            console.error("Error al obtener los datos:", error);
          });
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
      });
  };

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      instrucService.delete(id)
        .then(() => {
          setInstruc1(instruc1.filter((instruc) => instruc.id_instruccion !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar el registro:', error);
        });
    }
  };

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = instruc1.find(instruc => instruc.id_instruccion === id);
      if (editItem) {
        setFormData(editItem);
        setEditMode(true);
        setEditItemId(id);
      }
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItemId !== undefined) {
      instrucService.update(Number(editItemId), formData as InstruccionFormalData)
        .then((response) => {
          setFormData({
            nivelInstruccion: "",
            institucionEducativa: "",
            tituloObtenido: "",
            num_SenecytRegistro: "",
            tiempoEstudio: 0,
            anioGraduacion: 0,
            areaEstudios: "",
            titulo: "",
            
          });
          setInstruc1(instruc1.map((instruc) => instruc.id_instruccion === editItemId ? response : instruc));
          setEditMode(false);
          setEditItemId(undefined);
        })
        .catch((error) => {
          console.error("Error al actualizar el formulario:", error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      nivelInstruccion: "",
      institucionEducativa: "",
      tituloObtenido: "",
      num_SenecytRegistro: "",
      tiempoEstudio: 0,
      anioGraduacion: 0,
      areaEstudios: "",
      titulo: "",
      
    });
    setEditMode(false);
    setEditItemId(undefined);
  };

  return (
    <div>
      <div className='totalcontainer'></div>

      <div className="centered-form">
        <div className="icono_insti"></div>
        <div className="title-container">
          <div className="title-line"></div>
          <h1 className="page-title">INSTRUCCION FORMAL</h1>
          <div className="title-line"></div>
        </div>
        <form onSubmit={editMode ? handleUpdate : handleSubmit}>
          <div className="form-row">
            <label htmlFor="firstName">Nivel de Institución:</label>
            <InputText
              className="small-input"
              id="firstName"
              name="firstName"
              value={formData.nivelInstruccion}
              onChange={(e) => setFormData({ ...formData, nivelInstruccion: e.target.value })}
            />
            <label htmlFor="lastName">Titulo Obtenido:</label>
            <InputText
              className="small-input"
              id="lastName"
              name="lastName"
              value={formData.tituloObtenido}
              onChange={(e) => setFormData({ ...formData, tituloObtenido: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Institucion Educativa:</label>
            <InputText
              className="small-input"
              id="email"
              name="email"
              value={formData.institucionEducativa}
              onChange={(e) => setFormData({ ...formData, institucionEducativa: e.target.value })}
            />
            <label htmlFor="phone">Tiempo de Estudio:</label>
            <InputText
              className="small-input"
              id="phone"
              name="phone"
              value={formData.tiempoEstudio.toString()}
              onChange={(e) => setFormData({ ...formData, tiempoEstudio: parseFloat(e.target.value) })}
            />
          </div>
          <div className="form-row-buttons">
          <Button
            type="submit"
            label={editMode ? 'Actualizar' : 'Submit'}
            className="small-button p-button-success"
            style={{ background: '#0C3255' }}
            onClick={editMode ? handleUpdate : handleSubmit}
          />
            <Button
              type="button"
              label="Cancel"
              className="small-button p-button-secondary"
              style={{ background: '#FF9800' }}
              onClick={resetForm}
            />
          </div>
        </form>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nivel de Institución</th>
                <th>Institución Educativa</th>
                <th>Título Obtenido</th>
                <th>Tiempo de Estudio</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {instruc1.map((instruc) => (
                <tr key={instruc.id_instruccion?.toString()}>
                  <td>{instruc.nivelInstruccion}</td>
                  <td>{instruc.institucionEducativa}</td>
                  <td>{instruc.tituloObtenido}</td>
                  <td>{instruc.tiempoEstudio.toString()}</td>
                  <td>
                    <button onClick={() => handleDelete(instruc.id_instruccion?.valueOf())}>Eliminar</button>
                    <button onClick={() => handleEdit(instruc.id_instruccion?.valueOf())}>Editar</button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Instruc_Formal;