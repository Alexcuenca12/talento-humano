import {Divider} from "primereact/divider";
import {Dropdown} from "primereact/dropdown";
import {FileUpload, FileUploadHandlerEvent} from "primereact/fileupload";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useRef, useState} from "react";
import {IPeriodo_Aca} from "../../interfaces/Primary/IPeriodo_Aca";
import {IEva_Docente} from "../../interfaces/Primary/IEva_Docente";
import academicPeriodService from "../../services/Periodo_AcaService";
import {useFormik} from "formik";
import {fileConverter} from "../../services/functions/fileConverter";
import evaluacionService from "../../services/EvaluacionService";
import {annexBodyTemplate} from "../../shared/AnnexBodyTemplate";
import RowActionTemplate from "../../shared/RowActionTemplate";
import {confirmDeleteActionDialog, showErrorMessage, showSucessInfoMessage} from "../../shared/SweetAlertMessage";

const EvaDocente = () => {

    const [academicPeriods, setAcademicPeriods] = useState<IPeriodo_Aca[]>([]);
    const [evaluations, setEvaluations] = useState<IEva_Docente[]>([]);
    const [selectedEvaluation, setSelectedEvaluation] = useState<IEva_Docente | null>(null);
    const fileUploadRef = useRef<FileUpload>(null);

    const careers: { name: string, code: string }[] = [
        {name: "Desarrollo de Software", code: "DE"},
        {name: "Entrenamiento Deportivo", code: "ED"},
        {name: "Mecatrónica", code: "MC"}
    ]

    // * formik implementation
    const formik = useFormik<IEva_Docente>({
        initialValues: {
            codCarrera: '',
            evidenciaEva: null,
            periodoAc: null,
            persona: null
        },
        onSubmit: values => {
            handleSubmit(values);
            formik.resetForm();
            setSelectedEvaluation(null);
        },
        validate: (values) => {
            let errors: any = {};
            if (!values.codCarrera) {
                errors.codCarrera = 'Carrera es requerida';
            }

            if (!values.periodoAc) {
                errors.periodoAc = 'Periodo es requerido';
            }

            if (!values.evidenciaEva) {
                errors.evidenciaEva = 'Evidencia es requerida';
            }

            return errors;
        }
    });


    // FILL ACADEMIC PERIODS
    useEffect(() => {
        fetchAcademicPeriods();
        fetchEvaluations();
    }, [])

    // RETRIEVE TEACHER EVALUATION
    const handleSubmit = async (data: IEva_Docente) => {
        if (selectedEvaluation) {
            // update
            await evaluacionService.updateItem(selectedEvaluation.id_evaluacion!, data)
                .then(response => {
                    console.log(response);
                    showSucessInfoMessage('Registro Actualizado')
                })
                .catch(error => {
                    console.error(error);
                    showErrorMessage(error.message);
                })
        } else {
            // create
            await evaluacionService.createItem(data)
                .then(response => {
                    console.log(response);
                    showSucessInfoMessage('Registro credo');
                }).catch(error => {
                    console.error(error);
                    showErrorMessage(error.message);
                });
        }
        fetchEvaluations();
    }


    // SERVICE METHODS
    function fetchEvaluations() {
        evaluacionService.getAllItems()
            .then(response => {
                setEvaluations(response);
            }).catch(error => {
            console.error(error);
            showErrorMessage(error.message);
        })
    }

    function fetchAcademicPeriods() {
        academicPeriodService.getAllItems()
            .then(response => {
                setAcademicPeriods(response);
            })
            .catch(error => {
                console.error(error);
                showErrorMessage(error.message);
            })
    }

    const handleDeleteItem = (item_id: number): Promise<void> => {

        return new Promise((resolve, reject) => {
            evaluacionService.deleteItem(item_id)
                .then(() => {
                    fetchEvaluations();
                    resolve();
                }).catch(error => {
                reject(error);
            }).finally(() => {
                setSelectedEvaluation(null);
            });
        });
    }

    //* file Uploader
    const customFileUploader = async (event: FileUploadHandlerEvent) => {
        fileConverter(event.files[0])
            .then(data => {
                formik.setFieldValue('evidenciaEva', data);
                showSucessInfoMessage('Archivo Cargado',
                    'info');
            }).catch(error => {
            console.error(error);
            showErrorMessage(error.message);
        })

        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
    }

    const loadDataToForm = (rowData: IEva_Docente) => {
        setSelectedEvaluation(rowData);
        if (rowData) {
            formik.setValues({
                ...rowData
            })
        }
    }

    // row body templates
    const actionBodyTemplate = (rowData: IEva_Docente) => {
        return (
            <RowActionTemplate onEdit={() => loadDataToForm(rowData)}
                               onRemove={() => confirmDeleteActionDialog(() => handleDeleteItem(rowData.id_evaluacion!))}/>
        )
    }


    return (
        <>
            <Card className="m-5">
                <Divider align="center">
                    <h2>Evaluación Docente</h2>
                </Divider>
                <form className="formgrid grid" onSubmit={formik.handleSubmit}>
                    <div className="field col-6">
                        <div className="field col-6">
                            <label htmlFor="career">Carrera</label>
                            <Dropdown
                                id="career"
                                placeholder="Seleccione"
                                className="p-inputtext-sm w-full"
                                options={careers}
                                name="codCarrera"
                                optionLabel="name"
                                value={formik.values.codCarrera}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                optionValue="code"
                            />
                            <small className="p-error">{formik.touched.codCarrera && formik.errors.codCarrera}</small>
                        </div>
                        <div className="field col-6">
                            <label htmlFor="period">Periodo Académico</label>
                            <Dropdown
                                id="period"
                                inputId="period"
                                name="periodoAc"
                                options={academicPeriods}
                                value={formik.values.periodoAc}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                optionLabel="nombre"
                                placeholder="Seleccione"
                                className="p-inputtext-sm w-full"
                            />
                            <small className="p-error">{formik.touched.periodoAc && formik.errors.periodoAc}</small>
                        </div>
                    </div>
                    <div className="field col-4 flex flex-column">
                        <label htmlFor="annex-file">Anexo</label>
                        <FileUpload
                            id="annex-file"
                            ref={fileUploadRef}
                            mode="advanced"
                            name="evidenciaEva"
                            accept=".pdf"
                            customUpload
                            uploadHandler={customFileUploader}
                            chooseLabel="Escoger"
                            uploadLabel="Cargar"
                            cancelLabel="Cancelar"
                            emptyTemplate={<p className="m-0">{
                                formik.values.evidenciaEva ? "Archivo Cargado" : "Arrastre y suelte aquí los archivos para cargarlos."}</p>}/>
                        <small
                            className="p-error w-full">{formik.touched.evidenciaEva && formik.errors.evidenciaEva}</small>
                    </div>


                    <div className="col-10 flex justify-content-end align-content-center mt-4 gap-2">
                        <Button label={selectedEvaluation ? 'Actualizar' : 'Guardar'}
                                severity={selectedEvaluation ? 'warning' : 'success'}
                                type='submit'/>
                        <Button
                            label="Cancelar"
                            severity="secondary"
                            type="button"
                            onClick={() => {
                                formik.resetForm();
                                setSelectedEvaluation(null);
                            }}
                        />
                    </div>
                </form>
                <Card className="my-5">
                    <DataTable
                        value={evaluations}
                        dataKey="id_evaluacion"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}>
                        <Column field="codCarrera" header="Carrera"/>
                        <Column field="periodoAc.nombre" header="Periodo"/>
                        <Column field="registrationDate" header="Fecha de Registro"/>
                        <Column body={(rowData) => {
                            const data = rowData as IEva_Docente;
                            const fileName = `${data.codCarrera}_${data.periodoAc?.nombre}`;
                            return annexBodyTemplate(data.evidenciaEva!, fileName);
                        }}
                                header="Anexo"></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </Card>

                <div className="flex justify-content-end">
                    <Button label="Continuar" icon="pi pi-arrow-right" iconPos="right"/>
                </div>
            </Card>
        </>
    )
}

export default EvaDocente;
