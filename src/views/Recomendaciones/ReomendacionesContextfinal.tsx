import React, { useState, useEffect, ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import '../../styles/Recomendaciones.css';
import {IRecomendaciones} from '../../interfaces/Primary/Recomendaciones'
import {RecomendacionesService} from '../../services/RecomendacionesService'
import { log } from 'console';




function Recomendaciones() {
    const recomendacionesService = new RecomendacionesService();
    const [reco1, setReco1] = useState<IRecomendaciones[]>([]);
    const [pnombre, setpnombre] = useState('');
    const [snombre, setsnombre] = useState('');
    const [papellido, setpapellido] = useState('');
    const [sapellido, setsapellido] = useState('');
    const [correo, setcorreo] = useState('');
    const [idpersona, setpersona] = useState <number>(1); 
    const [docummetno, setdocumento] = useState<Uint8Array | null>(null);
    const [formData, setFormData] = useState<IRecomendaciones>({
      id_recomendaciones: 0,
      primer_nombre   : "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido   : "",
      correo: "",
      documentoRecomendacion: null,
      
    });
    const interfar =  useState <IRecomendaciones>
    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
    
    const handlepnombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        setpnombre(event.target.value);
    };
    const handlesnombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        setsnombre(event.target.value);
    };
    const handlepapellidoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setpapellido(event.target.value);
    };
    const handlesapellidoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setsapellido(event.target.value);
    };
    const handlecorreoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setcorreo(event.target.value);
    };
    const handledocumentoChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file);
            const reader = new FileReader();

            reader.onload = () => {
                const buffer = reader.result as ArrayBuffer;
                const byteArray = new Uint8Array(buffer);
                setdocumento(byteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    };


    const handleGuardarClick = async () => {
        const nuevaRecomendacion:   IRecomendaciones= {
            id_recomendaciones: reco1.length + 1,
            primer_nombre : pnombre,            
            segundo_nombre: snombre,
            primer_apellido: papellido,
            segundo_apellido   : sapellido,
            correo: correo,
            documentoRecomendacion: docummetno,
            

           // Utilizar el valor de idPersona
        };
    
        try {
          const response = await fetch('http://localhost:8080/api/recomendaciones/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaRecomendacion),
          });
    
          if (response.ok) {
            
            
            
            
        // Actualizar la lista de habilidades después de guardar en la base de datos
        setpnombre("");
      setsnombre("");
      setpapellido("");
      setsapellido("");
      setcorreo("")    
        obtenerRecomendaciones();
            
          } else {
            console.log('Error al guardar la habilidad');
          }
        } catch (error) {
          console.log('Error al realizar la llamada a la API', error);
        }
      };

    useEffect(() => {
      recomendacionesService.getAll()
        .then((data) => {
          setReco1(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    }, []);
  

    const handleEdit = (id: number | undefined) => {
      setEditMode(true);
      if (id !== undefined) {
        const editItem = reco1.find(reco => reco.id_recomendaciones === id);
        if (editItem) {
          setFormData(editItem);
          setEditMode(true);
          setEditItemId(id);
        }
      }
    };
    const handleUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (editMode && editItemId !== undefined) {
        
        const updatedFormData = { ...formData, id: editItemId };
        
        recomendacionesService.update(Number(editItemId), formData as IRecomendaciones)
          .then((response) => {
            console.log('Formulario actualizado exitosamente:', response);
            
            resetForm();
            setEditMode(false);
            setEditItemId(undefined);
            obtenerRecomendaciones();
          })
          .catch((error) => {
            console.error('Error al actualizar el formulario:', error);
          });
      } else {
        console.log("no funciona")
      }
    };
    const resetForm = () => {
      setpnombre("");
      setsnombre("");
      setpapellido("");
      setsapellido("");
      
      setEditMode(false);
      setEditItemId(undefined);
    };
  
    const handleDelete = (id: number | undefined) => {
      if (id !== undefined) {
        recomendacionesService.delete(id)
          .then(() => {
            setReco1(reco1.filter((reco) => reco.id_recomendaciones !== id));
          })
          .catch((error) => {
            console.error('Error al eliminar el registro:', error);
          });
      }
    };

    const obtenerRecomendaciones = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/recomendaciones/read');
          if (response.ok) {
            const data = await response.json();
            setReco1(data);
          } else {
            console.log('Error al obtener las habilidades');
          }
        } catch (error) {
          console.log('Error al realizar la llamada a la API', error);
        }
      };


    return (
      <div>
      <div>
      <div style={{ marginBottom: '120px' }}></div>

      <div className="centered-form">
      <div className="icono_insti"></div>
        <div className="title-container">
          <div className="title-line"></div>
          <h1 className="page-title">RECOMENDACIONES PERSONALES</h1>
          <div className="title-line"></div>
        </div>
        <form className='formulario' >
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta"htmlFor="level">Nombres:</label>
              <InputText  className="small-input"
              id="firstName"
              name="firstName"
              value={editMode? formData.primer_nombre : pnombre }
              onChange={editMode? (e) => setFormData({ ...formData, primer_nombre: e.target.value }) : handlepnombreChange}
              />
            </div>
            <div className="input-container">
              <label className="etiqueta" htmlFor="title">Apellidos:</label>
              <InputText 
              className="small-input"
              id="lastName"
              name="lastName"
              value={editMode? formData.primer_apellido : papellido }
              onChange={editMode? (e) => setFormData({ ...formData, primer_apellido: e.target.value }) : handlepapellidoChange}
             /> 
            </div>
            <div className="input-container">
  <label className="etiqueta" htmlFor="institution">Email:</label>
  <InputText 
  
              id="email"
              className="small-input"
              name="email"
              value={editMode? formData.correo : correo}
              onChange={editMode? (e) => setFormData({ ...formData, correo: e.target.value }) : handlecorreoChange}
               />
</div>
          </div>
          <div className="form-row">
            <div className="input-container">
              <label className="etiqueta" htmlFor="duration">Telefono:</label>
              <InputText 
              className="small-input"
              id="secondName"
              name="secondName"
              value={editMode? formData.segundo_nombre :snombre }
              onChange={editMode? (e) => setFormData({ ...formData, segundo_nombre: e.target.value }): handlesnombreChange}
               />
            </div>
            
            {/* <div className="input-container">
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
</div> */}
          </div>
          <div className="form-row">
            
            <div className="input-container">
              
              
            </div>
 
          </div>
          <div className="form-row-buttons">
          <Button
                type="button"
                label={editMode ? 'Actualizar' : 'Guardar'}
                className="small-button p-button-success"
                style={{ background: '#0C3255' }}
                onClick={editMode? handleUpdate : handleGuardarClick}
  
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
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '70%' }}>Recomendaciones Agregadas</th>
                <th style={{ width: '30%' }}>Acciones</th>
               
              </tr>
            </thead>
            <tbody>
            {reco1.map((reco) => (
                <tr key={reco.id_recomendaciones?.toString()}>
                  <td>{reco.correo}</td>
                  
                  
                    <button onClick={() => handleDelete(reco.id_recomendaciones?.valueOf())}>Eliminar</button>
                     <button onClick={() => handleEdit(reco.id_recomendaciones?.valueOf())}>Editar</button> 
                    
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="">
          <Button type="button" label="Continuar" className="small-button p-button-secondary additional-button" style={{ background: '#0C3255'}} />
        </div>
      </div>
    </div>
      </div>
      
    );
  
}

export default Recomendaciones;
