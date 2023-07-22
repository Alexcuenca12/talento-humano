import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {FileUpload, FileUploadHandlerEvent} from "primereact/fileupload";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useRef, useState} from "react";
import {useFormik} from "formik";
import {IExperiencia} from "../../interfaces/Primary/IExperiencia";
import {ExperienciaService} from "../../services/ExperienciaService";
import ToastMessage from "../../shared/ToastMessage";
import {IMessage} from "../../interfaces/Secondary/IMessage";
import {fileConverter} from "../../services/functions/fileConverter";
import React from "react";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {decoder} from "../../services/functions/decoder";
import {formatDate} from "../../services/functions/formatter";

const apiService = new ExperienciaService();

const Experiencia = () => {

    const [items, setItems] = useState<IExperiencia[]>([]);
    const [selectedItem, setSelectedItem] = useState<IExperiencia | null>(null);
    const [message, setMessage] = useState<IMessage | null>(null);

    const fileUploadRef = useRef<FileUpload>(null);
    const workAreas = [
        "Recursos Humanos",
        "Docencia",
        "Eventos"
    ]

    // * formik implementation
    const formik = useFormik<IExperiencia>({
        initialValues: {
            institucion: '',
            puesto: '',
            area_trabajo: '',
            fecha_inicio: null,
            fecha_fin: null,
            actividades: '',
            estado: true,
            certificado_trabajo: null,
            persona: null,
        },
        onSubmit: values => {
            console.log(values);
            handleSubmit(values);
            formik.resetForm();
        },
        validate: (values) => {
            let errors: any = {};

            if (!values.institucion.trim()) {
                errors.institucion = 'Institución es requerida';
            }
            if (!values.fecha_inicio) {
                errors.fecha_inicio = 'Fecha Inicio es requerida';
            }
            if (!values.area_trabajo) {
                errors.area_trabajo = 'Área de trabajo es requerida';
            }
            if (!values.puesto.trim()) {
                errors.puesto = 'Puesto es requerida';
            }
            if (!values.fecha_fin) {
                errors.fecha_fin = 'Fecha Final es requerida';
            }
            if (!values.certificado_trabajo) {
                errors.certificado_trabajo = 'Certificado de trabajo es requerido';
            }

            return errors;

        }

    });

    /* const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    }*/

    const customBytesUploader = async (event: FileUploadHandlerEvent) => {
        // convert file to base64 encoded
        fileConverter(event.files[0])
            .then(data => {
                formik.setFieldValue('certificado_trabajo', data);
                setMessage(
                    {severity: 'info', detail: 'Archivo Cargado'}
                );
            }).catch(error => {
            console.error(error);
            setMessage({severity: 'error', summary: 'Error', detail: error.message});
        })

        if (fileUploadRef.current) {
            // clean the file uploaded
            fileUploadRef.current.clear();
        }
    };


    const loadDataToForm = (rowData: IExperiencia) => {
        setSelectedItem(rowData);
        if (rowData) {
            formik.setValues({
                ...rowData,
                fecha_inicio: new Date(rowData.fecha_inicio!),
                fecha_fin: new Date(rowData.fecha_fin!)
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

    const handleSubmit = async (data: IExperiencia) => {
        if (selectedItem) {
            // update an existing item
            await apiService.updateItem(selectedItem.id_experiencia!, data)
                .then(response => {
                    console.log(response);
                    setMessage({severity: 'success', detail: 'Registro actualizado'});
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
                    setMessage({severity: 'success', detail: 'Registro creado'});
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

    const handleDeleteItem = (item_id: number) => {
        apiService.deleteItem(item_id)
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
        setSelectedItem(null);
        formik.resetForm();
    }

    // row templates
    const actionBodyTemplate = (rowData: IExperiencia) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => loadDataToForm(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined severity="danger" className="mr-2"
                        onClick={() => confirmDeleteItem(rowData)}/>
            </React.Fragment>
        )
    }

    const dateBodyTemplate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        };

        return new Date(date).toLocaleDateString('es-ES', options);
    }

    const confirmDeleteItem = (rowData: IExperiencia) => {
        confirmDialog({
            message: '¿Estás seguro de eliminar el elemento seleccionado?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDeleteItem(rowData.id_experiencia!),
            acceptLabel: "Si"
        })
    }

    const annexBodyTemplate = (rowData: IExperiencia) => {

        const base64File = rowData.certificado_trabajo;
        const fileName = `${rowData.puesto}_${formatDate(rowData.fecha_inicio!)}_${formatDate(rowData.fecha_fin!)}`
        return base64File ? (
            <Button type="button" icon="pi pi-file-pdf" severity="danger" rounded
                    onClick={() => decoder(base64File, fileName)}
                    data-pr-tooltip="PDF"/>) : (<span>Sin Anexo</span>)
    }


    return (
        <>
            <Card className="m-5">
                <ToastMessage message={message}/>
                <Divider align="center">
                    <h2>Experiencia</h2>
                </Divider>
                <form className="formgrid grid" onSubmit={formik.handleSubmit}>
                    <div className="field col-4">
                        <label htmlFor="institution">Institución</label>
                        <InputText id="institution"
                                   className="p-inputtext-sm w-full"
                                   name="institucion"
                                   value={formik.values.institucion}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                        />
                        <small className="p-error">{formik.touched.institucion && formik.errors.institucion}</small>
                    </div>
                    <div className="field col-4">
                        <label htmlFor="start-date">Fecha Inicial</label>
                        <Calendar id="start-date"
                                  dateFormat="dd/mm/yy"
                                  name="fecha_inicio"
                                  className="p-inputtext-sm w-full"
                                  value={formik.values.fecha_inicio}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                        />
                        <small className="p-error">{formik.touched.fecha_inicio && formik.errors.fecha_inicio}</small>
                    </div>
                    <div className="field col-4">
                        <label htmlFor="work-area">Área de Trabajo</label>
                        <Dropdown
                            id="work-area"
                            placeholder="Seleccione"
                            className="p-inputtext-sm w-full"
                            options={workAreas}
                            name="area_trabajo"
                            value={formik.values.area_trabajo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <small className="p-error">{formik.touched.area_trabajo && formik.errors.area_trabajo}</small>
                    </div>
                    <div className="field col-4">
                        <label htmlFor="job">Puesto</label>
                        <InputText id="job"
                                   className="p-inputtext-sm w-full"
                                   name="puesto"
                                   value={formik.values.puesto}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                        />
                        <small className="p-error">{formik.touched.puesto && formik.errors.puesto}</small>
                    </div>
                    <div className="field col-4">
                        <label htmlFor="end-date">Fecha Final</label>
                        <Calendar id="end-date"
                                  dateFormat="dd/mm/yy"
                                  className="p-calendar-sm w-full"
                                  name="fecha_fin"
                                  value={formik.values.fecha_fin}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                        />
                        <small className="p-error">{formik.touched.fecha_fin && formik.errors.fecha_fin}</small>
                    </div>
                    <div className="field col-4 flex flex-column">
                        <label htmlFor="annex-file">Anexo</label>
                        <FileUpload
                            id="annex-file"
                            ref={fileUploadRef}
                            mode="advanced"
                            name="file"
                            accept=".pdf"
                            customUpload
                            uploadHandler={customBytesUploader}
                            chooseLabel="Seleccionar"
                            uploadLabel="Cargar"
                            cancelLabel="Cancelar"
                            emptyTemplate={<p className="m-0">{
                                formik.values.certificado_trabajo ? "Archivo Cargado" : "Arrastre y suelte aquí los archivos para cargarlos."}</p>}
                        />
                        <small
                            className="p-error w-full">{formik.touched.certificado_trabajo && formik.errors.certificado_trabajo}</small>
                    </div>

                    <div className="col-12 flex justify-content-evenly align-content-center mt-4">
                        <Button label={selectedItem ? 'Actualizar' : 'Guardar'}
                                severity={selectedItem ? 'warning' : 'success'} type="submit"/>
                        <Button label="Cancelar" severity="secondary" type="button" onClick={() => {
                            formik.resetForm();
                            setSelectedItem(null);
                        }}/>
                    </div>
                </form>

                <Card className="my-5 mx-auto">
                    <DataTable value={items}
                               dataKey="id_experiencia"
                               paginator
                               rows={10}
                               rowsPerPageOptions={[5, 10, 25]}
                    >

                        <Column field="institucion" header="Institución"></Column>
                        <Column field="area_trabajo" header="Área de trabajo"></Column>
                        <Column field="puesto" header="Puesto"></Column>
                        <Column field="fecha_inicio" header="Fecha Inicial"
                                body={(rowData) => dateBodyTemplate(rowData.fecha_inicio)}></Column>
                        <Column field="fecha_fin" header="Fecha Final"
                                body={(rowData) => dateBodyTemplate(rowData.fecha_fin)}></Column>
                        <Column body={(rowData) => annexBodyTemplate(rowData)}
                                header="Anexo"></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </Card>

                <div className="flex justify-content-end">
                    <Button label="Continuar" icon="pi pi-arrow-right" iconPos="right"/>
                </div>
                <ConfirmDialog/>
            </Card>

        </>
    )

}

export default Experiencia;
