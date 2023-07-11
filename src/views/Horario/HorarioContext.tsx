import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Horario.css';
import { IHorarioData } from '../../interfaces/Primary/IHorario';
import { HorarioService } from '../../services/HorarioService'
import swal from 'sweetalert';

function HorarioContext() {
    const [hora1, sethora1] = useState<IHorarioData[]>([]);
    const [formData, setFormData] = useState<IHorarioData>({
        id_horario: 0,
        periodo: "",
        horario: "",
        dias: "",
        distributivo: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
    const horaService = new HorarioService();

    useEffect(() => {
        horaService.getAll()
            .then((data) => {
                sethora1(data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.horario || !formData.periodo || !formData.dias || !formData.distributivo) {
            swal('Advertencia', 'Por favor, complete todos los campos', 'warning');
            return;
        }


        horaService
            .save(formData)
            .then((response) => {
                resetForm();
                swal('Horario', 'Datos Guardados Correctamente', 'success');
                horaService.getAll()
                    .then((data) => {
                        sethora1(data);
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
                    horaService
                        .delete(id)
                        .then(() => {
                            sethora1(hora1.filter((hora) => hora.id_horario !== id));
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
            const editItem = hora1.find(hora => hora.id_horario === id);
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
            horaService.update(Number(editItemId), formData as IHorarioData)
                .then((response) => {
                    swal({
                        title: "Horario",
                        text: "Datos actualizados correctamente",
                        icon: "success"
                    });
                    setFormData({

                        periodo: "",
                        horario: "",
                        dias: "",
                        distributivo: "",

                    });
                    sethora1(hora1.map((hora) => hora.id_horario === editItemId ? response : hora));
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
            periodo: "",
            horario: "",
            dias: "",
            distributivo: "",

        });
        setEditMode(false);
        setEditItemId(undefined);
    };

    return (
        <div className='div-page-horario'>
            <div className='div-contenedor-horario div-general-horario'>
                <div>
                    <h1 className="page-title-horario">INSTITULO SUPERIOR TECNOLOGICO DEL AZUAY</h1>

                </div>
                <div className="title-container-horario ">
                    <br />
                    <div className="title-line-horario"></div>
                    <h1 className="page-title-horario">HORARIO</h1>
                    <div className="title-line-horario"></div>
                </div>
                <form onSubmit={editMode ? handleUpdate : handleSubmit}>
                    <div className=''>


                        <div className="form-rows-horario">

                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="materia"
                                            name="materia"
                                            
                                        />
                                        <label htmlFor="materia">Materia</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="horario"
                                            name="horario"
                                            value={formData.horario}
                                            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="horas">Horario</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="ciclo"
                                            name="ciclo"
                                        />
                                        <label htmlFor="ciclo">Ciclo</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="curso"
                                            name="curso"
                                        />
                                        <label htmlFor="curso">Curso</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="carrera"
                                            name="carrera"
                                        />
                                        <label htmlFor="carrera">Carrera</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="periodo"
                                            name="periodo"
                                            value={formData.periodo}
                                            onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="horas">Periodo</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="dias"
                                            name="dias"
                                            value={formData.dias}
                                            onChange={(e) => setFormData({ ...formData, dias: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="horas">Dias</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-horario">
                                <div className="p-inputgroup fieldH">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="distributivo"
                                            name="distributivo"
                                            value={formData.distributivo}
                                            onChange={(e) => setFormData({ ...formData, distributivo: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="horas">Distributivo</label>
                                    </span>
                                </div>
                            </div>
 

                        </div>
                        <div className=''>
                            <div className="table-container-horario">
                                <table className="data-table-horario">
                                    <thead>
                                        <tr>
                                            <th>Periodo</th>
                                            <th>Horario</th>
                                            <th>Dias</th>
                                            <th>Operaciones</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hora1.map((horario) => (
                                            <tr key={horario.id_horario?.toString()}>

                                                <td>{horario.periodo}</td>
                                                <td>{horario.horario}</td>
                                                <td>{horario.dias}</td>

                                                <td>
                                                    <Button
                                                        type="button"
                                                        className="button-horario"
                                                        label="✎"

                                                        style={{
                                                            background: '#ff9800',
                                                            borderRadius: '10%',
                                                            fontSize: '30px',
                                                            color: "black",
                                                            justifyContent: 'center',
                                                            marginRight: '5px' // Espacio entre los botones
                                                        }}
                                                        onClick={() => handleEdit(horario.id_horario?.valueOf())}
                                                    // Agrega el evento onClick para la operación de editar

                                                    />
                                                    <Button
                                                        type="button"
                                                        className="button-horario"
                                                        label="✘"
                                                        style={{
                                                            background: '#ff0000',
                                                            borderRadius: '10%',
                                                            fontSize: '30px',
                                                            color: "black",
                                                            justifyContent: 'center'
                                                        }}
                                                        onClick={() => handleDelete(horario.id_horario?.valueOf())}
                                                    // Agrega el evento onClick para la operación de eliminar

                                                    />
                                                </td>



                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div className='dividir-botons-final-horario'>
                                <div className="">
                                    <Button type="button" label={editMode ? 'Actualizar' : 'Guardar'} className='button-horario' style={{
                                        background: '#ff9800',
                                        borderRadius: '10%',
                                        fontSize: '10px',
                                        justifyContent: 'center'
                                    }}
                                        onClick={editMode ? handleUpdate : handleSubmit}
                                    />

                                </div>
                                <div className=''>
                                    <Button type="button" label="Cancelar" className='button-horario' onClick={resetForm} style={{
                                        background: '#ff9800',
                                        borderRadius: '10%',
                                        fontSize: '10px',
                                        justifyContent: 'center'
                                        
                                    }} />
                                </div>
                            </div>

                        </div>




                    </div>
                </form>


            </div>
        </div>
    );





}

export default HorarioContext;
