import {Divider} from "primereact/divider";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Fieldset} from "primereact/fieldset";
import cardHeader from "../../shared/CardHeader";
import React from "react";

const EvaDocente = () => {
    return (
        <Fieldset className="m-5">
            <Card header={cardHeader}
                  className="border-solid border-blue-800 border-3">
                <div className="h1-rem">
                    <Divider align="center">
                        <h1 className="text-7xl font-smibold lg:md-2">Evaluación Docente</h1>
                    </Divider>
                </div>
                <div className="flex justify-content-between">
                    <div className="flex flex-column">
                        <form className="formgrid grid">
                            <div className="field col-12">
                                <label htmlFor="career">Carrera</label>
                                <Dropdown
                                    id="career"
                                    placeholder="Seleccione"
                                    className="p-inputtext-sm w-full"
                                />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="period">Periodo Académico</label>
                                <Dropdown
                                    id="period"
                                    placeholder="Seleccione"
                                    className="p-inputtext-sm w-full"
                                />
                            </div>

                            <div className="col-12 flex justify-content-end align-content-center mt-4">
                                <Button label="Agregar" severity="success" rounded/>
                            </div>
                        </form>

                            <DataTable className="mt-5">
                                <Column header="Carrera"
                                        headerStyle={{backgroundColor: '#0C3255', color:'white'}}/>
                                <Column header="Periodo"
                                        headerStyle={{backgroundColor: '#0C3255', color:'white'}}/>
                                <Column header="Fecha de Registro"
                                        headerStyle={{backgroundColor: '#0C3255', color:'white'}}/>
                            </DataTable>

                    </div>

                    <div className="field col-8 md:col-4">
                        <label>Subir PDF:</label>
                    <FileUpload chooseLabel="Escoger"
                                uploadLabel="Cargar"
                                cancelLabel="Cancelar"
                        emptyTemplate={<p className="m-0">Arrastre y suelte los archivos aquí para cargarlos.</p>} />
                    </div>

                </div>



            </Card>
        </Fieldset>
    )
}

export default EvaDocente;
