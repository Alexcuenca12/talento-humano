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

            if (!values.institucion) {
                errors.institucion = 'Institución es requerida';
            }
            if (!values.fecha_inicio) {
                errors.fecha_inicio = 'Fecha Inicio es requerida';
            }
            if (!values.area_trabajo) {
                errors.area_trabajo = 'Área de trabajo es requerida';
            }
            if (!values.puesto) {
                errors.puesto = 'Puesto es requerida';
            }
            if (!values.fecha_fin) {
                errors.fecha_fin = 'Fecha Final es requerida';
            }
            if (!values.certificado_trabajo) {
                errors.certificado_trabajo = 'Certificado de trabajo es requerida';
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

    const handleDeleteItem = () => {
        if (selectedItem) {
            apiService.deleteItem(selectedItem.id_experiencia!)
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
        <>
            <Card className="m-5">
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
                                  className="p-inputtext-sm w-full"
                                  name="fecha_fin"
                                  value={formik.values.fecha_fin}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                        />
                        <small className="p-error">{formik.touched.fecha_fin && formik.errors.fecha_fin}</small>
                    </div>
                    <div className="field col-4 flex justify-content-center align-items-center flex-column">
                        <ToastMessage message={message}/>
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
                            className="p-error w-full text-center">{formik.touched.certificado_trabajo && formik.errors.certificado_trabajo}</small>
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
                    <div className="flex justify-content-end mb-2">
                        <Button icon="pi pi-trash" severity="danger" aria-label="Cancel"
                                disabled={selectedItem == null}
                                onClick={handleDeleteItem}/>
                    </div>
                    <DataTable value={items}
                               selectionMode={'radiobutton'}
                               selection={selectedItem!}
                               onSelectionChange={(e) => handleSelectedRow(e)}
                               dataKey="id_experiencia">
                        <Column selectionMode="single" headerStyle={{width: '3rem'}}></Column>
                        <Column field="institucion" header="Institución"></Column>
                        <Column field="area_trabajo" header="Área de trabajo"></Column>
                        <Column field="puesto" header="Puesto"></Column>
                        <Column field="fecha_inicio" header="Fecha Inicial"></Column>
                        <Column field="fecha_fin" header="Fecha Final"></Column>
                    </DataTable>
                </Card>

                <div className="flex justify-content-end">
                    <Button label="Continuar" icon="pi pi-arrow-right" iconPos="right"/>
                </div>


            </Card>

        </>
    )

}

export default Experiencia;
