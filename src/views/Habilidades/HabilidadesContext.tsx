import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Habilidades.css';
import { IHabilidadesData } from '../../interfaces/Primary/IHabilidades';
import { HabilidadesService } from '../../services/HabilidadesService'
import swal from 'sweetalert';

function HabilidadesContext() {
  const [habi1, sethabi1] = useState<IHabilidadesData[]>([]);
  const [formData, setFormData] = useState<IHabilidadesData>({
    id_habilidades: 0,
    descripcion: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const habilidadService = new HabilidadesService();

  useEffect(() => {
    habilidadService.getAll()
      .then((data) => {
        sethabi1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.descripcion) {
      swal('Advertencia', 'Por favor, complete todos los campos', 'warning');
      return;
    }


    habilidadService
      .save(formData)
      .then((response) => {
        resetForm();
        swal('Habilidad', 'Datos Guardados Correctamente', 'success');
        habilidadService.getAll()
          .then((data) => {
            sethabi1(data);
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
      swal({
        title: 'Confirmar Eliminación',
        text: '¿Estás seguro de eliminar este registro?',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancelar',
            visible: true,
            className: 'cancel-button',
          },
          confirm: {
            text: 'Sí, eliminar',
            className: 'confirm-button',
          },
        },
      }).then((confirmed) => {
        if (confirmed) {
          habilidadService
            .delete(id)
            .then(() => {
              sethabi1(habi1.filter((habi) => habi.id_habilidades !== id));
              swal('Eliminado', 'El registro ha sido eliminado correctamente', 'success');
            })
            .catch((error) => {
              console.error('Error al eliminar el registro:', error);
              swal('Error', 'Ha ocurrido un error al eliminar el registro', 'error');
            });
        }
      });
    }
  };

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = habi1.find(habi => habi.id_habilidades === id);
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
      habilidadService.update(Number(editItemId), formData as IHabilidadesData)
        .then((response) => {
          swal({
            title: "Habilidad",
            text: "Datos actualizados correctamente",
            icon: "success"
          });
          setFormData({

            descripcion: "",

          });
          sethabi1(habi1.map((habi) => habi.id_habilidades === editItemId ? response : habi));
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
      descripcion: "",

    });
    setEditMode(false);
    setEditItemId(undefined);
  };

  return (
    <div className='div-page-habilidad'>
      <div className='div-contenedor-habilidad div-general-habilidad'>
        <div className="title-container-habilidad">
          <div className="title-line-habilidad"></div>
          <h1 className="page-title-habilidad">HABILIDADES</h1>
          <div className="title-line-habilidad"></div>
        </div>
        <form onSubmit={editMode ? handleUpdate : handleSubmit}>
          <div className='contenedor-habilidad'>

            <div className="">
              <label htmlFor="descripcion">Descripcion de Habilidad:</label>
              <InputText className="" id="descripcion" name="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                style={{
                  width: '400px',
                  height: 'auto',
                  resize: 'vertical',
                  overflow: 'hidden',
                  wordWrap: 'break-word',
                  fontSize: '16px'

                }}
              />
            </div>
            <br />
            <div className='div-botons-habilidad'>
              <Button type="button" label="CANCELAR" className="small-button-habilidad  " style={{ background: 'black' }} onClick={resetForm} />

              <Button type="button" label={editMode ? 'Actualizar' : 'Guardar'} className='small-button-habilidad'  style={{
                background: '#ff9800',
                borderRadius: '10%',
                fontSize: '10px',
                justifyContent: 'center'
              }}
                onClick={editMode ? handleUpdate : handleSubmit}
              />
            </div>

          </div>
          <div className=''>
            <div className="table-container-habilidad">
              <table className="data-table-habilidad">
                <thead>
                  <tr>
                    <th>Descripciones Agregadas</th>
                    <th>Acciones</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {habi1.map((habilidad) => (
                    <tr key={habilidad.id_habilidades?.toString()}>

                      <td>{habilidad.descripcion}</td>
                      <td></td>
                      <td>
                        <Button
                          type="button"
                          className="button-habilidad"
                          label="✎"

                          style={{
                            background: '#ff9800',
                            borderRadius: '10%',
                            fontSize: '30px',
                            width: '70px',
                            height: '50px',
                            color: "black",
                            justifyContent: 'center',
                            marginRight: '5px' // Espacio entre los botones
                          }}
                          onClick={() => handleEdit(habilidad.id_habilidades?.valueOf())}
                        // Agrega el evento onClick para la operación de editar

                        />
                        <Button
                          type="button"
                          className="button-habilidad"
                          label="✘"
                          style={{
                            background: '#ff0000',
                            borderRadius: '10%',
                            fontSize: '30px',
                            width: '70px',
                            height: '50px',
                            color: "black",
                            justifyContent: 'center'
                          }}
                          onClick={() => handleDelete(habilidad.id_habilidades?.valueOf())}
                        // Agrega el evento onClick para la operación de eliminar

                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <br />
          <div className="div-button-habilidad">
            <Button type="button" label="CONTINUAR ➠" className="button-habilidad" style={{ background: 'black' }} />
          </div>
        </form>




      </div>


    </div>
  );





}

export default HabilidadesContext;
