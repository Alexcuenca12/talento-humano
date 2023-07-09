
// import React, { useState, useEffect } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { FileUpload } from 'primereact/fileupload';
// import { Button } from 'primereact/button';
// import { Calendar } from 'primereact/calendar';
// import '../../styles/Recomendaciones.css';
// import {IRecomendaciones} from '../../interfaces/Primary/Recomendaciones'
// import {RecomendacionesService} from '../../services/RecomendacionesService'
// import { log } from 'console';

// function Recomendaciones() {
//   const [evidencia, setevidencia] = useState<Uint8Array | null>(null);
//   const [reco1, setReco1] = useState<IRecomendaciones[]>([]);
//   const [formData, setFormData] = useState<IRecomendaciones>({
//     id_recomendaciones: 0,
//     primer_nombre   : "",
//     segundo_nombre: "",
//     primer_apellido: "",
//     segundo_apellido   : "",
//     correo: "",
//     documentoRecomendacion: null,
//     persona   : {}
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [editItemId, setEditItemId] = useState<number | undefined>(undefined);

//   const recomendacionesService = new RecomendacionesService();

//   const createProduct = (product: any) => {
//     recomendacionesService.save(product).then((data: any) => {
//       setReco1([...reco1, data]);
//     });
//   };

//   const guardarProduct = () => {   
//         createProduct(formData);
        

//       }
//   useEffect(() => {
//     recomendacionesService.getAll()
//       .then((data) => {
//         setReco1(data);
//       })
//       .catch((error) => {
//         console.error("Error al obtener los datos:", error);
//       });
//   }, []);

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (editMode && editItemId !== undefined) {
//   //     const updatedFormData = { ...formData, id: editItemId };
//   //     recomendacionesService.update(Number(editItemId), formData as IRecomendaciones)
//   //       .then((response) => {
//   //         console.log('Formulario actualizado exitosamente:', response);
//   //         resetForm();
//   //         setEditMode(false);
//   //         setEditItemId(undefined);
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error al actualizar el formulario:', error);
//   //       });
//   //   } else {
//   //     recomendacionesService
//   //       .save(createProduct(formData))
        
//   //       .catch((error) => {
//   //         console.error('Error al enviar el formulario:', error);
//   //       });
//   //   }
//   // };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (editMode && editItemId !== undefined) {
//       const updatedFormData = { ...formData, id: editItemId };
//       handleUpdate(e);
//     } else {
//       const nuevaReco: IRecomendaciones = {
//         id_recomendaciones: 123,
//         primer_nombre   : "asdasd",
//         segundo_nombre: "asdasd",
//         primer_apellido: "asdasd",
//         segundo_apellido   : "asdasd",
//         correo: "asdasd",
//         documentoRecomendacion: null,
//         persona   : {}
    
//     };
//       try {
//         const response = await fetch('http://localhost:8080/api/recomendaciones/create', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(nuevaReco),
//         });
        

//         if (response.ok) {
//             // Actualizar la lista de habilidades después de guardar en la base de datos
//             console.log(response)


//         } else {
//             console.log('Error al guardar el contrato');
//         }
//     } catch (error) {
//         console.log('Error al realizar la llamada a la API', error);
//     }
//     }
//   };

//   const handleUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editItemId !== undefined) {
//       recomendacionesService.update(Number(editItemId), formData as IRecomendaciones)
//         .then((response) => {
//           setFormData({
//             id_recomendaciones: 0,
//             primer_nombre   : "",
//             segundo_nombre: "",
//             primer_apellido: "",
//             segundo_apellido   : "",
//             correo: "",
//             documentoRecomendacion: null,
//             persona   : {}
//           });
//           setReco1(reco1.map((reco) => reco.id_recomendaciones === editItemId ? response : reco));
//           setEditMode(false);
//           setEditItemId(undefined);
//         })
//         .catch((error) => {
//           console.error("Error al actualizar el formulario:", error);
//         });
//     }
//   };

//   const handleGuardarClick = async () => {
//     let evidenciaString: string | null = null;
    
    


//     const nuevaReco: IRecomendaciones = {
//       id_recomendaciones: 123,
//       primer_nombre   : "asdasd",
//       segundo_nombre: "asdasd",
//       primer_apellido: "asdasd",
//       segundo_apellido   : "asdasd",
//       correo: "asdasd",
//       documentoRecomendacion: null,
//       persona   : {}
  
//   };
        

//         if (evidencia) {
//             const blob = new Blob([evidencia], { type: 'application/pdf' });
//             evidenciaString = URL.createObjectURL(blob);
//         }

//         // Validar que fecha_fin no sea menor que fecha_inicio
       




//         try {
//             const response = await fetch('http://localhost:8080/api/recomendaciones/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(nuevaReco),
//             });

//             if (response.ok) {
//                 // Actualizar la lista de habilidades después de guardar en la base de datos
//                 console.log('funcionaaaaaa')


//             } else {
//                 console.log('Error al guardar el contrato');
//             }
//         } catch (error) {
//             console.log('Error al realizar la llamada a la API', error);
//         }
//     }








//   const handleEdit = (id: number | undefined) => {
//     if (id !== undefined) {
//       const editItem = reco1.find(reco => reco.id_recomendaciones === id);
//       if (editItem) {
//         setFormData(editItem);
//         setEditMode(true);
//         setEditItemId(id);
//       }
//     }
//   };

//   const handleDelete = (id: number | undefined) => {
//     if (id !== undefined) {
//       recomendacionesService.delete(id)
//         .then(() => {
//           setReco1(reco1.filter((reco) => reco.id_recomendaciones !== id));
//         })
//         .catch((error) => {
//           console.error('Error al eliminar el registro:', error);
//         });
//     }
//   };
//   const resetForm = () => {
//     setFormData({
//     id_recomendaciones: 0,
//     primer_nombre   : "",
//     segundo_nombre: "",
//     primer_apellido: "",
//     segundo_apellido   : "",
//     correo: "",
//     documentoRecomendacion: null,
//     persona   : {}
//     });
//     setEditMode(false);
//     setEditItemId(undefined);
//   };
  
//     return (
//       <div>
//       <div>
//       <div style={{ marginBottom: '120px' }}></div>

//       <div className="centered-form">
//       <div className="icono_insti"></div>
//         <div className="title-container">
//           <div className="title-line"></div>
//           <h1 className="page-title">RECOMENDACIONES PERSONALES</h1>
//           <div className="title-line"></div>
//         </div>
//         <form className='formulario' onSubmit={editMode ? handleUpdate : handleSubmit}>
//           <div className="form-row">
//             <div className="input-container">
//               <label className="etiqueta"htmlFor="level">Nombres:</label>
//               <InputText  className="small-input"
//               id="firstName"
//               name="firstName"
//               value={formData.primer_nombre}
//               onChange={(e) => setFormData({ ...formData, primer_nombre: e.target.value })}/>
//             </div>
//             <div className="input-container">
//               <label className="etiqueta" htmlFor="title">Apellidos:</label>
//               <InputText 
//               className="small-input"
//               id="lastName"
//               name="lastName"
//               value={formData.primer_apellido}
//               onChange={(e) => setFormData({ ...formData, primer_apellido: e.target.value })}/> 
//             </div>
//             <div className="input-container">
//   <label className="etiqueta" htmlFor="institution">Email:</label>
//   <InputText 
  
//               id="email"
//               className="small-input"
//               name="email"
//               value={formData.correo}
//               onChange={(e) => setFormData({ ...formData, correo: e.target.value })} />
// </div>
//           </div>
//           <div className="form-row">
//             <div className="input-container">
//               <label className="etiqueta" htmlFor="duration">Telefono:</label>
//               <InputText 
//               className="small-input"
//               id="secondName"
//               name="secondName"
//               value={formData.segundo_nombre}
//               onChange={(e) => setFormData({ ...formData, segundo_nombre: e.target.value })} />
//             </div>
            
//             {/* <div className="input-container">
//   <label className="etiqueta" htmlFor="pdf">Subir PDF:</label>
//   <FileUpload
//     className="small-input"
//     id="pdf"
//     name="pdf"
//     chooseLabel="Seleccionar"
//     mode="basic"
//     uploadLabel="Subir"
//     cancelLabel="Cancelar"
//     customUpload
    
//     accept=".pdf"
//   />
// </div> */}
//           </div>
//           <div className="form-row">
            
//             <div className="input-container">
              
              
//             </div>
 
//           </div>
//           <div className="form-row-buttons">
//           <Button
//   type="submit"
//   label={editMode ? 'Actualizar' : 'Submit'}
//   className="small-button p-button-success"
//   style={{ background: '#0C3255' }}
//   onClick={handleGuardarClick}
// />
//             <Button
//               type="button"
//               label="Cancel"
//               className="small-button p-button-secondary"
//               style={{ background: '#FF9800' }}
//               onClick={resetForm}
//             />
//           </div>
//         </form>
//         <div className="table-container">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th style={{ width: '70%' }}>Recomendaciones Agregadas</th>
//                 <th style={{ width: '30%' }}>Acciones</th>
               
//               </tr>
//             </thead>
//             <tbody>
//             {reco1.map((reco) => (
//                 <tr key={reco.id_recomendaciones?.toString()}>
//                   <td>{reco.correo}</td>
                  
//                   <td>
//                     <button onClick={() => handleDelete(reco.id_recomendaciones?.valueOf())}>Eliminar</button>
//                      <button onClick={() => handleEdit(reco.id_recomendaciones?.valueOf())}>Editar</button> 
                    
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="">
//           <Button type="button" label="Continuar" className="small-button p-button-secondary additional-button" style={{ background: '#0C3255'}} />
//         </div>
//       </div>
//     </div>
//       </div>
      
//     );
  
// }

export default {};
