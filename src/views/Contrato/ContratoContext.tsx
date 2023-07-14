import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import '../../styles/Contrato.css';
import { IContratoData } from '../../interfaces/Primary/IContrato';
import { ContratoService } from '../../services/ContratoService'
import swal from 'sweetalert';
import { fileConverter } from "../../services/functions/fileConverter";



function ContratoContext() {
    const [contra1, setcontra1] = useState<IContratoData[]>([]);
    const [formData, setFormData] = useState<IContratoData>({
        id_contrato: 0,
        fecha_inicio: "",
        fecha_fin: "",
        anio_duracion: "",
        horas_diarias: "",
        cargo: "",
        salario: "",
        evidencia: "",
        persona: null,

    });

    const fileUploadRef = useRef<FileUpload>(null);

    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
    const contratService = new ContratoService();

    useEffect(() => {
        contratService.getAll()
            .then((data) => {
                setcontra1(data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, []);

    const customBytesUploader = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                const base64data = reader.result as string;
                setFormData({ ...formData, evidencia: base64data });
                console.log('pdf guardado....')
            };

            reader.onerror = (error) => {
                console.error('Error al leer el archivo:', error);
            };

            reader.readAsDataURL(file);

            if (fileUploadRef.current) {
                fileUploadRef.current.clear();
            }
        }
    };

    const decodeBase64 = (base64Data: string) => {
        try {
            // Eliminar encabezados o metadatos de la cadena base64
            const base64WithoutHeader = base64Data.replace(/^data:.*,/, '');

            const decodedData = atob(base64WithoutHeader); // Decodificar la cadena base64
            const byteCharacters = new Uint8Array(decodedData.length);

            for (let i = 0; i < decodedData.length; i++) {
                byteCharacters[i] = decodedData.charCodeAt(i);
            }

            const byteArray = new Blob([byteCharacters], { type: 'application/pdf' });
            const fileUrl = URL.createObjectURL(byteArray);

            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = 'archivo.pdf';
            link.click();
            swal('Contrato', 'Descargando pdf....', 'success');
            console.log('pdf descargado...')

            URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.error('Error al decodificar la cadena base64:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fecha_inicio || !formData.anio_duracion || !formData.fecha_fin || !formData.cargo || !formData.horas_diarias || !formData.salario) {
            swal('Advertencia', 'Por favor, complete todos los campos', 'warning');
            return;
        }



        // Validar solo números en anio_duracion
        const anioDuracionRegex = /^\d+$/;
        if (!anioDuracionRegex.test(formData.anio_duracion)) {
            swal('Advertencia', 'Por favor, ingrese solo números en el campo Años de Duracion', 'warning');
            return;
        }

        const salarioRegex = /^\d+$/;
        if (!salarioRegex.test(formData.salario)) {
            swal('Advertencia', 'Por favor, ingrese solo números en el campo Salario', 'warning');
            return;
        }

        const horasRegex = /^\d+$/;
        if (!horasRegex.test(formData.horas_diarias)) {
            swal('Advertencia', 'Por favor, ingrese solo números en el campo Horas Diarias', 'warning');
            return;
        }

        const fechaInicio = new Date(formData.fecha_inicio);
        const fechaFin = new Date(formData.fecha_fin);

        // Validar fecha de inicio y fecha de fin
        if (fechaInicio > fechaFin) {
            swal('Advertencia', 'La fecha de inicio debe ser menor que la fecha de fin', 'warning');
            return;
        }


        contratService
            .save(formData)
            .then((response) => {
                resetForm();
                swal('Contrato', 'Datos Guardados Correctamente', 'success');
                contratService.getAll()
                    .then((data) => {
                        setcontra1(data);
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
                    contratService
                        .delete(id)
                        .then(() => {
                            setcontra1(contra1.filter((contra) => contra.id_contrato !== id));
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
            const editItem = contra1.find(contra => contra.id_contrato === id);
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
            contratService.update(Number(editItemId), formData as IContratoData)
                .then((response) => {
                    swal({
                        title: "Contrato",
                        text: "Datos actualizados correctamente",
                        icon: "success"
                    });
                    setFormData({
                        fecha_inicio: "",
                        fecha_fin: "",
                        anio_duracion: "",
                        horas_diarias: "",
                        salario: "",
                        cargo: "",
                        evidencia: "",
                        persona: null,

                    });
                    setcontra1(contra1.map((contra) => contra.id_contrato === editItemId ? response : contra));
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
            fecha_inicio: "",
            fecha_fin: "",
            anio_duracion: "",
            horas_diarias: "",
            salario: "",
            cargo: "",
            evidencia: "",
            persona: null,

        });
        setEditMode(false);
        setEditItemId(undefined);
    };



    return (
        <div className='div-page-contrato'>
            <div className='div-contenedor-contrato div-general-contrato'>
                <div>
                    <h1 className="page-title-contrato">INSTITULO SUPERIOR TECNOLOGICO DEL AZUAY</h1>

                </div>
                <div className="title-container-contrato">

                    <br />
                    <div className="title-line-contrato"></div>
                    <br />
                    <h1 className="page-title-contrato">CONTRATO</h1>
                    <div className="title-line-contrato"></div>
                </div>
                <form onSubmit={editMode ? handleUpdate : handleSubmit} encType="multipart/form-data">

                    <div className=' '>



                        <div className="form-rows-contrato">
                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <Calendar
                                            onChange={(e) => setFormData({ ...formData, fecha_inicio: e.value instanceof Date ? e.value.toISOString() : '' })}
                                            value={typeof formData.fecha_inicio === 'string' ? new Date(formData.fecha_inicio) : null}

                                            required
                                        />
                                        <label htmlFor="inicio">Fecha Inicio </label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <Calendar
                                            onChange={(e) => setFormData({ ...formData, fecha_fin: e.value instanceof Date ? e.value.toISOString() : '' })}
                                            value={typeof formData.fecha_fin === 'string' ? new Date(formData.fecha_fin) : null}
                                            required
                                        />
                                        <label htmlFor="fin">Fecha Fin </label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="anios"
                                            name="anios"
                                            value={formData.anio_duracion}
                                            onChange={(e) => setFormData({ ...formData, anio_duracion: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="anios">Años de Duracion</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="hora"
                                            name="hora"
                                            value={formData.horas_diarias}
                                            onChange={(e) => setFormData({ ...formData, horas_diarias: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="hora">Horas</label>
                                    </span>
                                </div>
                            </div>
                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="cargo"
                                            name="cargo"
                                            value={formData.cargo}
                                            onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="cargo">Cargo</label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText
                                            id="salario"
                                            name="salario"
                                            pattern='[0-9,]*'
                                            value={formData.salario}
                                            onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="salario">Salario</label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container-contrato">
                                <div className="p-inputgroup field">
                                    <span className="p-float-label card flex justify-content-center">
                                        <p>
                                            SUBIR PDF:
                                            <br />

                                            <input type="file" accept="application/pdf"
                                                onChange={(e) => customBytesUploader(e)}
                                                required
                                            />
                                        </p>
                                    </span>
                                </div>
                            </div>

                            <div className="">
                                <Button type="button"
                                    label={editMode ? 'Actualizar' : 'Guardar'} className='button-contrato' style={{
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
                            <div className="table-container-contrato">
                                <table className="data-table-contrato">
                                    <thead>
                                        <tr>
                                            <th>Fecha Inicio</th>
                                            <th>Fecha Fin </th>
                                            <th>Años de Duración</th>
                                            <th>Horas</th>
                                            <th>Cargo</th>
                                            <th>Salario</th>
                                            <th>Operaciones</th>
                                            <th>Evidencia</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contra1.map((contrato) => (
                                            <tr key={contrato.id_contrato?.toString()}>
                                                <td>{contrato.fecha_inicio ? new Date(contrato.fecha_inicio).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                }) : ''}</td>
                                                <td>{contrato.fecha_fin ? new Date(contrato.fecha_fin).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                }) : ''}</td>
                                                <td>{contrato.anio_duracion}</td>
                                                <td>{contrato.horas_diarias}</td>
                                                <td>{contrato.cargo}</td>
                                                <td>{contrato.salario}</td>
                                                <td>
                                                    <Button
                                                        type="button"
                                                        className="button-contrato"
                                                        label="✎"

                                                        style={{
                                                            background: '#ff9800',
                                                            borderRadius: '10%',
                                                            fontSize: '30px',
                                                            color: "black",
                                                            justifyContent: 'center',
                                                            marginRight: '5px' // Espacio entre los botones
                                                        }}
                                                        onClick={() => handleEdit(contrato.id_contrato?.valueOf())}
                                                    // Agrega el evento onClick para la operación de editar

                                                    />
                                                    <Button
                                                        type="button"
                                                        className="button-contrato"
                                                        label="✘"
                                                        style={{
                                                            background: '#ff0000',
                                                            borderRadius: '10%',
                                                            fontSize: '30px',
                                                            color: "black",
                                                            justifyContent: 'center'
                                                        }}
                                                        onClick={() => handleDelete(contrato.id_contrato?.valueOf())}
                                                    // Agrega el evento onClick para la operación de eliminar

                                                    />
                                                </td>
                                                <td>
                                                    {contrato.evidencia ? (
                                                        <Button
                                                            type="button"
                                                            className="button-contrato"
                                                            label="Descargar PDF"
                                                            style={{
                                                                background: '#009688',
                                                                borderRadius: '10%',
                                                                fontSize: '12px',
                                                                color: 'black',
                                                                justifyContent: 'center',
                                                            }}
                                                            onClick={() => decodeBase64(contrato.evidencia!)}
                                                        />
                                                    ) : (
                                                        <span>Sin evidencia</span>
                                                    )}
                                                </td>



                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div className='dividir-botons-final-contrato'>
                                <div className="">
                                    <Button className='button-circular-contrato' label="AGREGAR" style={{
                                        background: '#ff9800',
                                        borderRadius: '10%',
                                        fontSize: '10px',
                                        justifyContent: 'center'
                                    }} />
                                </div>
                                <br />
                                <div className="">
                                    <Button className='button-circular-contrato' label="GUARDAR" style={{
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


        </div >

    );

}

export default ContratoContext;