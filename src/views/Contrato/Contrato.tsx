export{}
/*

import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { IContratoData } from "../../interfaces/Primary/IContrato";
import { ContratoService } from "../../services/ContratoService";
import ToastMessage from "../../shared/ToastMessage";
import { IMessage } from "../../interfaces/Secondary/IMessage";
import { fileConverter } from "../../services/functions/fileConverter";

const apiService = new ContratoService();

const Contrato = () => {

    const [items, setItems] = useState<IContratoData[]>([]);
    const [selectedItem, setSelectedItem] = useState<IContratoData | null>(null);
    const [message, setMessage] = useState<IMessage | null>(null);

    const fileUploadRef = useRef<FileUpload>(null);
    const workAreas = [
        "Recursos Humanos",
        "Docencia",
        "Eventos"
    ]

    // * formik implementation
    const formik = useFormik<IContratoData>({
        initialValues: {

            fecha_inicio: null,
            fecha_fin: null,
            anio_duracion: '',
            horas_diarias: '',
            cargo: '',
            salario: '',
            evidencia: '',
            persona: null,
        },
        onSubmit: values => {
            console.log(values);
            handleSubmit(values);
            formik.resetForm();
        },
        validate: (values) => {
            let errors: any = {};

            if (!values.fecha_inicio) {
                errors.fecha_inicio = 'Fecha de Inicio es requerida';
            }
            if (!values.fecha_fin) {
                errors.fecha_fin = 'Fecha de Fin es requerida';
            }
            if (!values.anio_duracion) {
                errors.anio_duracion = 'Años de Duracion es requerida';
            }
            if (!values.horas_diarias) {
                errors.horas_diarias = 'Horas Diarias es requerida';
            }
            if (!values.cargo) {
                errors.cargo = 'Cargo es requerida';
            }
            if (!values.salario) {
                errors.salario = 'Salario es requerida';
            }
            if (!values.evidencia) {
                errors.evidencia = 'Evidencia es requerida';
            }

            return errors;

        }

    });

    /* const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    }

const customBytesUploader = async (event: FileUploadHandlerEvent) => {
    // convert file to base64 encoded
    fileConverter(event.files[0])
        .then(data => {
            formik.setFieldValue('evidencia', data);
            setMessage(
                { severity: 'info', detail: 'Archivo Cargado' }
            );
        }).catch(error => {
            console.error(error);
            setMessage({ severity: 'error', summary: 'Error', detail: error.message });
        })

    if (fileUploadRef.current) {
        // clean the file uploaded
        fileUploadRef.current.clear();
    }
};


const handleSelectedRow = (e: any) => {
    const rowData = e.value;
    setSelectedItem(rowData);
    if (rowData) {
        formik.setValues({
            ...rowData,
            fecha_inicio: new Date(rowData.fecha_inicio),
            fecha_fin: new Date(rowData.fecha_fin)
        });
    } else {
        formik.resetForm();
    }
}


// CALL TO SERVICE METHODS

useEffect(() => {
    fetchItems();
}, [])

// SERVICE METHODS
const fetchItems = () => {
    apiService.getAllItems()
        .then(response => {
            setItems(response);
        })
        .catch(error => {
            console.error(error);
            setMessage({
                severity: 'error',
                summary: 'Error',
                detail: error.message
            })
        })
}

const handleSubmit = async (data: IContratoData) => {
    if (selectedItem) {
        // update an existing item
        await apiService.updateItem(selectedItem.id_contrato!, data)
            .then(response => {
                console.log(response);
                setMessage({ severity: 'success', detail: 'Registro actualizado' });
            })
            .catch(error => {
                console.error(error);
                setMessage({
                    severity: 'error', summary: 'Error', detail: error.message
                });
            });
        setSelectedItem(null);
    } else {
        // create new item
        await apiService.createItem(data)
            .then(response => {
                console.log(response);
                setMessage({ severity: 'success', detail: 'Registro creado' });
            })
            .catch(error => {
                console.error(error);
                setMessage({
                    severity: 'error', summary: 'Error', detail: error.message
                });
            });
    }
    fetchItems();
}

const handleDeleteItem = () => {
    if (selectedItem) {
        apiService.deleteItem(selectedItem.id_contrato!)
            .then(() => {
                console.log('Eliminado');
                setMessage({
                    severity: 'info', detail: 'Registro Eliminado'
                });
                fetchItems(); // reload items
            })
            .catch(error => {
                console.error(error);
                setMessage({
                    severity: 'error', summary: 'Error', detail: error.message
                });
            })
    }
    setSelectedItem(null);
    formik.resetForm();
}

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
            <form onSubmit={formik.handleSubmit}>

                <div className=' '>



                    <div className="form-rows-contrato">
                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <Calendar
                                        dateFormat="dd/mm/yy"
                                        name="fecha_inicio"
                                        value={formik.values.fecha_inicio}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label htmlFor="inicio">Fecha Inicio </label>
                                </span>
                            </div>
                        </div>

                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <Calendar
                                        dateFormat="dd/mm/yy"
                                        name="fecha_fin"
                                        value={formik.values.fecha_fin}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                        value={formik.values.anio_duracion}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <small className="p-error">{formik.touched.anio_duracion && formik.errors.anio_duracion}</small>
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
                                        value={formik.values.horas_diarias}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <small className="p-error">{formik.touched.horas_diarias && formik.errors.horas_diarias}</small>
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
                                        value={formik.values.cargo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <small className="p-error">{formik.touched.cargo && formik.errors.cargo}</small>
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
                                        value={formik.values.salario}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <small className="p-error">{formik.touched.salario && formik.errors.salario}</small>
                                    <label htmlFor="salario">Salario</label>
                                </span>
                            </div>
                        </div>

                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <ToastMessage message={message} />
                                    <FileUpload
                                        ref={fileUploadRef}
                                        mode="basic"
                                        name="file"
                                        accept=".pdf"
                                        chooseLabel="Subir PDF"
                                        customUpload
                                        uploadHandler={customBytesUploader}
                                    />
                                    <small
                                        className="p-error w-full text-center">{formik.touched.evidencia && formik.errors.evidencia}</small>
                                </span>
                            </div>
                        </div>

                        <div className="">
                            <Button type="button"
                                label={selectedItem ? 'Actualizar' : 'Guardar'} className='button-contrato' style={{
                                    background: '#ff9800',
                                    borderRadius: '10%',
                                    fontSize: '10px',
                                    justifyContent: 'center'
                                }}

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

                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((contrato) => (
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

                                                // Agrega el evento onClick para la operación de eliminar

                                                />
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



        </div >


    </div >

);

}

export default Contrato;

*/
