import React, {useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {FileUpload, FileUploadHandlerEvent} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import "../../styles/Capacitacitaciones.css";
import cardHeader from "../../shared/CardHeader";
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {ICapacitaciones} from "../../interfaces/Primary/ICapacitaciones";
import {CapacitacionesService} from "../../services/CapacitacionesService";
import {fileConverter} from "../../services/functions/fileConverter";
import ToastMessage from "../../shared/ToastMessage";
import {useFormik} from "formik";

import {
    InputNumber,

} from "primereact/inputnumber";
import {IMessage} from "../../interfaces/Secondary/IMessage";


const apiService = new CapacitacionesService();
export default function CapacitacionesContext() {

    const comboEvento = [
        {label: "CONFERENCIA", value: "CONFERENCIA"},
        {label: "CONGRESO", value: "CONGRESO"},
        {label: "DIPLOMADO", value: "DIPLOMADO"},
        {label: "JORNADA", value: "JORNADA"},
        {label: "PANEL", value: "PANEL"},
        {label: "PASANTIA", value: "PASANTIA"},
        {label: "SEMINARIO", value: "SEMINARIO"},
        {label: "TALLER", value: "TALLER"},
        {label: "VISITA DE OBSERVACION", value: "VISITA DE OBSERVACION"},
    ];


    const comboArea = [
        {label: "ADMINISTRACIÓN/OFICINA", value: "ADMINISTRACIÓN/OFICINA"},
        {
            label: "AGRICULTURA/PESCA/GANADERÍA",
            value: "AGRICULTURA/PESCA/GANADERÍA",
        },
        {label: "ARTE/DISEÑO/MEDIOS", value: "ARTE/DISEÑO/MEDIOS"},
        {label: "CIENTIFÍCO/INVESTIGACIÓN", value: "CIENTIFÍCO/INVESTIGACIÓN"},
        {label: "DIRECCIÓN/GERENCIA", value: "DIRECCIÓN/GERENCIA"},
        {label: "ECONOMÍA/CONTABILIDAD", value: "ECONOMÍA/CONTABILIDAD"},
        {label: "EDUCACIÓN BÁSICA/CURSOS", value: "EDUCACIÓN BÁSICA/CURSOS"},
        {label: "ENTRETENIMIENTO/DEPORTES", value: "ENTRETENIMIENTO/DEPORTES"},
        {label: "FABRICACIÓN", value: "FABRICACIÓN"},
        {label: "FINANZAS/BANCA", value: "FINANZAS/BANCA"},
        {label: "GOBIERNO", value: "GOBIERNO"},
        {label: "HOTELERÍA/TURISMO", value: "HOTELERÍA/TURISMO"},
        {label: "INFORMÁTICA HARDWARE", value: "INFORMÁTICA HARDWARE"},
        {label: "INFORMÁTICA SOFTWARE", value: "INFORMÁTICA SOFTWARE"},
        {
            label: "INFORMÁTICA/TELECOMUNICACIONES",
            value: "INFORMÁTICA/TELECOMUNICACIONES",
        },
        {label: "INGENERÍA/TÉCNICO", value: "INGENERÍA/TÉCNICO"},
        {label: "INTERNET", value: "INTERNET"},
        {label: "LEGAL/ASESORÍA", value: "LEGAL/ASESORÍA"},
        {label: "MARKETING/VENTAS", value: "MARKETING/VENTAS"},
        {label: "MATERIA PRIMA", value: "MATERIA PRIMA"},
        {label: "MEDICINA/SALUD", value: "MEDICINA/SALUD"},
        {label: "RECURSOS HUMANOS/PERSONAL", value: "RECURSOS HUMANOS/PERSONAL"},
        {label: "SIN ÁREA DE ESTUDIO", value: "SIN ÁREA DE ESTUDIO"},
        {label: "VENTAS AL CONSUMIDOR", value: "VENTAS AL CONSUMIDOR"},
    ];


    const comboCertificado = [
        {label: "APROBACIÓN", value: "APROBACIÓN"},
        {label: "ASISTENCIA", value: "ASISTENCIA"},
    ];

    const cargaBodyTemplate = (capacitacionesObj: ICapacitaciones) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Institucion: </h2>
                    <p className="text-2xl">{capacitacionesObj.institucion}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Tipo de evento: </h2>
                    <p className="text-2xl">{capacitacionesObj.tipo_evento}</p>
                </div>
                <div className="mr-4 ">
                    <h2 className="text-3xl">Area de estudio: </h2>
                    <p className="text-2xl">{capacitacionesObj.area_estudios}</p>
                </div>
                <div className=" ">
                    <h2 className="text-3xl">Desde: </h2>
                    <p className="text-2xl">{String(capacitacionesObj.fecha_inicio)}</p>
                </div>
            </div>
        );
    };

    const [items, setItems] = useState<ICapacitaciones[]>([]);
    const [selectItem, setSelectItem] = useState<ICapacitaciones | null>(null);
    const [message, setMessage] = useState<IMessage | null>(null);

    const fileUploadRef = useRef<FileUpload>(null);

    useEffect(() => {
        fecthCapacitaciones();
    }, []);

    const fecthCapacitaciones = () => {
        new CapacitacionesService()
            .getAllCap()
            .then((data) => {
                setItems(data);
            })
            .catch(error => {
                console.error(error);
                setMessage({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message
                })
            })
    };
    const formik = useFormik<ICapacitaciones>({
        initialValues: {
            institucion: '',
            tipo_evento: '',
            nombre_evento: '',
            area_estudios: '',
            tipo_certificado: '',
            fecha_inicio: null,
            fecha_fin: null,
            numero_dias: 0,
            cantidad_horas: 0,
            evidencia: null,
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
                errors.institucion = 'Nombre de Institucion es requerida';
            }
            if (!values.tipo_evento) {
                errors.tipo_evento = 'Tipo de evento es requerido';
            }
            if (!values.nombre_evento) {
                errors.nombre_evento = 'Nombre del evento es requerido';
            }
            if (!values.area_estudios) {
                errors.area_estudios = 'Area de estudios es requerida';
            }
            if (!values.tipo_certificado) {
                errors.tipo_certificado = 'Tipo de certificado es requerido';
            }
            if (!values.fecha_inicio) {
                errors.fecha_inicio = 'Fecha de inicio es requerida';
            }
            if (!values.fecha_fin) {
                errors.fecha_fin = 'Fecha de fin es requerida';
            }
            if (!values.numero_dias) {
                errors.numero_dias = 'Numero de dias es requerido';
            }
            if (!values.cantidad_horas) {
                errors.cantidad_horas = 'Cantidad de horas es requerida';
            }
            if (!values.evidencia) {
                errors.evidencia = 'Evidencia es requerida';
            }

            return errors;

        }

    });

    const handleSelectedRow = (rowData: ICapacitaciones | null) => {
        setSelectItem(rowData);
        if (rowData) {
            const fechaInicio = rowData.fecha_inicio ? new Date(rowData.fecha_inicio) : null;
            const fechaFin = rowData.fecha_fin ? new Date(rowData.fecha_fin) : null;
            formik.setValues({
                ...rowData,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
            });
        } else {
            formik.resetForm(); // Restablecer el formulario cuando no hay una fila seleccionada
        }
    };


    const handleSubmit = async (data: ICapacitaciones) => {
        if (selectItem) {
            // update an existing item
            await apiService.updateCapacitaciones(selectItem.id_capacitaciones!, data)
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
            setSelectItem(null);
        } else {
            // create new item
            await apiService.guardarCapacitaciones(data)
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
        fecthCapacitaciones();
    }

    const handleDeleteItem = () => {
        if (selectItem) {
            apiService.deleteCapacitaciones(selectItem.id_capacitaciones!)
                .then(() => {
                    console.log('Eliminado');
                    setMessage({
                        severity: 'info', detail: 'Registro Eliminado'
                    });
                    fecthCapacitaciones(); // reload items
                })
                .catch(error => {
                    console.error(error);
                    setMessage({
                        severity: 'error', summary: 'Error', detail: error.message
                    });
                })
        }
        setSelectItem(null);
        formik.resetForm();
    }

//Carga PDF
    const customBytesUploader = async (event: FileUploadHandlerEvent) => {
        // convert file to base64 encoded
        fileConverter(event.files[0])
            .then(data => {
                formik.setFieldValue('evidencia', data);
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

    const handleDownloadPDF = (rowData: ICapacitaciones) => {
        // Obtiene la URL del PDF asociado a la fila actual
        const pdfURL = rowData.evidencia ?? '';


        const downloadLink = document.createElement('a');
        downloadLink.href = pdfURL;
        downloadLink.target = '_blank'; // Abre el enlace en una nueva pestaña
        downloadLink.download = 'evidencia.pdf';

        // Simula un clic en el enlace para descargar el archivo
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Fieldset className="fgrid col-fixed">
            <Card
                header={cardHeader}
                className="border-solid border-blue-800 border-y-1"
            >
                <Card className="text-center ">
                    <div className="h1-rem">
                        <Divider align="center">
                            <h1 className="text-7xl font-smibold lg:md-2">Capacitaciones</h1>
                        </Divider>
                    </div>
                    <div className="flex justify-content-between flex-wrap">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-wrap flex-row">
                                <div className="flex align-items-center justify-content-center">
                                    <div className="flex flex-column">
                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-auto min-w-min"
                                                       htmlFor="institucion">
                                                    Institucion:
                                                </label>
                                                <InputText id="institucion" name="institucion"
                                                           type="text"
                                                           placeholder="Ingrese la Institucion"
                                                           className="w-auto min-w-min text-2xl"
                                                           value={formik.values.institucion}
                                                           onChange={formik.handleChange}
                                                           onBlur={formik.handleBlur}
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.institucion && formik.errors.institucion} </small>
                                            </div>
                                            <div className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-auto min-w-min"
                                                       htmlFor="tipo_evento">
                                                    Tipo de evento:
                                                </label>
                                                <Dropdown id="tipo_evento" name="tipo_evento"
                                                          options={comboEvento}
                                                          value={formik.values.tipo_evento}
                                                          onChange={formik.handleChange}
                                                          onBlur={formik.handleBlur}
                                                          placeholder="Seleccione"
                                                          className="border-round w-full min-w-min text-2xl"
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.tipo_evento && formik.errors.tipo_evento} </small>
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label className="text-3xl font-medium w-auto min-w-min"
                                                       htmlFor="area_estudios">
                                                    Area de estudio:
                                                </label>
                                                <Dropdown id="area_estudios" name="area_estudios"
                                                          options={comboArea}
                                                          value={formik.values.area_estudios}
                                                          onChange={formik.handleChange}
                                                          onBlur={formik.handleBlur}
                                                          placeholder="Seleccione"
                                                          className="border-round w-full min-w-min text-2xl"
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.area_estudios && formik.errors.area_estudios} </small>
                                            </div>
                                        </div>

                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 h-7rem">
                                                <label className="text-3xl font-medium w-auto min-w-min"
                                                       htmlFor="fecha_inicio">
                                                    Desde:
                                                </label>
                                                <Calendar id="fecha_inicio" name="fecha_inicio"
                                                          className=" w-full min-w-min "
                                                          placeholder="Fecha de inicio"
                                                          dateFormat="dd/mm/yy"
                                                          value={formik.values.fecha_inicio}
                                                          onChange={formik.handleChange}
                                                          onBlur={formik.handleBlur}
                                                          showIcon
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.fecha_inicio && formik.errors.fecha_inicio} </small>
                                            </div>
                                            <div className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-auto min-w-min"
                                                       htmlFor="fecha_fin">
                                                    Hasta:
                                                </label>
                                                <Calendar
                                                    className=" w-full min-w-min "
                                                    id="fecha_fin"
                                                    name="fecha_fin"
                                                    placeholder="Fecha de fin"
                                                    dateFormat="dd/mm/yy"
                                                    value={formik.values.fecha_fin}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur} showIcon
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.fecha_fin && formik.errors.fecha_fin} </small>
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label className="text-3xl font-medium w-full  min-w-min"
                                                       htmlFor="numero_dias">
                                                    Numero de dias:{" "}
                                                </label>
                                                <InputNumber id="numero_dias" name="numero_dias"
                                                             placeholder="Ingrese los dias"
                                                             className="w-auto min-w-min text-2xl"
                                                             value={formik.values.numero_dias}
                                                             onValueChange={(e) => {
                                                                 formik.setFieldValue('numero_dias', e.value);
                                                             }}

                                                             onBlur={formik.handleBlur}
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.numero_dias && formik.errors.numero_dias} </small>
                                            </div>
                                        </div>

                                        <div
                                            className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 h-7rem">
                                                <label className="text-3xl font-medium w-full  min-w-min" htmlFor="nombre_evento">
                                                    Nombre de evento:
                                                </label>
                                                <InputText id="nombre_evento" name="nombre_evento"
                                                    type="text"
                                                    placeholder="Ingrese el nombre"
                                                    className="w-auto min-w-min text-2xl"
                                                    value={formik.values.nombre_evento}
                                                           onChange={formik.handleChange}
                                                           onBlur={formik.handleBlur}
                                                />
                                            </div>
                                            <div className="flex align-items-center justify-content-center w-auto pr-2">
                                                <label className="text-3xl font-medium w-full  min-w-min" htmlFor="tipo_certificado">
                                                    Tipo de certificado:
                                                </label>
                                                <Dropdown
                                                    id="tipo_certificado"
                                                    name="tipo_certificado"
                                                    options={comboCertificado}
                                                    value={formik.values.tipo_certificado}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Seleccione"
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.tipo_certificado && formik.errors.tipo_certificado} </small>
                                            </div>

                                            <div
                                                className="flex align-items-center justify-content-center w-auto pr-2 ">
                                                <label className="text-3xl font-medium w-full  min-w-min" htmlFor="cantidad_horas">
                                                    N° de horas totales:{" "}
                                                </label>
                                                <InputNumber
                                                    id="cantidad_horas"
                                                    name="cantidad_horas"
                                                    placeholder="Ingrese los dias"
                                                    className="w-auto min-w-min text-2xl"
                                                    value={formik.values.cantidad_horas}
                                                             onValueChange={(e) => {
                                                                 formik.setFieldValue('cantidad_horas', e.value);
                                                             }}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <small
                                                    className="p-error"> {formik.touched.cantidad_horas && formik.errors.cantidad_horas} </small>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                                            <div
                                                className="flex align-items-center justify-content-center w-auto min-w-min">
                                                <Button
                                                    type="submit"
                                                    className="w-full text-3xl min-w-min "
                                                    rounded label={selectItem ? 'Actualizar' : 'Guardar'}
                                                    severity={selectItem ? 'warning' : 'success'}>

                                                </Button>
                                            </div>
                                            <div
                                                className="flex align-items-center justify-content-center w-auto min-w-min">
                                                <Button
                                                    type="button"
                                                    label="Cancel"
                                                    className="w-full text-3xl min-w-min"
                                                    rounded
                                                    onClick={() => {
                                                        formik.resetForm();
                                                        setSelectItem(null); }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-column align-items-center justify-content-center ml-4">
                                    <label className="flex text-3xl font-medium" htmlFor="evidencia">
                                        Subir PDF:
                                    </label>
                                    <ToastMessage message={message}/>
                                    <FileUpload
                                        name="evidencia" id="evidencia"
                                        ref={fileUploadRef}
                                        chooseLabel="Escoger"
                                        uploadLabel="Cargar"
                                        cancelLabel="Cancelar"
                                        accept=".pdf"
                                        customUpload
                                           uploadHandler={customBytesUploader}
                                        emptyTemplate={
                                            <p className="m-0 p-button-rounded">
                                                Arrastre y suelte los archivos aquí para cargarlos.
                                            </p>
                                        }
                                    />
                                    <small
                                        className="p-error w-full text-center">{formik.touched.evidencia && formik.errors.evidencia}</small>
                                </div>
                            </div>
                        </form>
                    </div>

                    <DataTable
                        tableStyle={{minWidth: "50rem"}}
                        className="mt-5  w-full h-full text-3xl font-medium"
                        value={items}
                    >
                        <Column
                            field="Capacitaciones"
                            header="Capacitaciones"
                            headerStyle={{backgroundColor: "#0C3255", color: "white"}}
                            body={cargaBodyTemplate}
                        ></Column>
                        <Column
                            field="PDF"
                            header="PDF"
                            headerStyle={{backgroundColor: "#0C3255", color: "white"}}
                            body={(rowData: ICapacitaciones) => (
                                <>
                                    <Button icon="pi pi-download p-clickable" className="p-button-rounded p-button-text mr-4"
                                            onClick={() => handleDownloadPDF(rowData)}></Button>
                                </>
                            )}
                        ></Column>
                        <Column
                            field="Acciones"
                            header="Acciones"
                            headerStyle={{backgroundColor: "#0C3255", color: "white"}}
                            body={(rowData: ICapacitaciones) => (
                                <>
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-text mr-4"
                                            onClick={() => handleSelectedRow(rowData)}/>
                                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"

                                            onClick={handleDeleteItem}/>
                                </>
                            )}
                        />
                    </DataTable>
                </Card>
            </Card>
        </Fieldset>
    );
}
