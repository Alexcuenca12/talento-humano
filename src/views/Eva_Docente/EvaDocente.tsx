import {Divider} from "primereact/divider";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const EvaDocente = () => {
    return (
        <>
            <Card className="m-5">
                <Divider align="center">
                    <h2>Evaluación Docente</h2>
                </Divider>
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
                                <Button label="Agregar" severity="success"/>
                            </div>
                        </form>
                        <Card className="my-5">
                            <DataTable>
                                <Column header="Carrera"/>
                                <Column header="Periodo"/>
                                <Column header="Fecha de Registro"/>
                            </DataTable>
                        </Card>
                    </div>

                    <FileUpload chooseLabel="Escoger"
                                uploadLabel="Cargar"
                                cancelLabel="Cancelar"
                        emptyTemplate={<p className="m-0">Arrastre y suelte los archivos aquí para cargarlos.</p>} />

                </div>

                <div className="flex justify-content-end">
                    <Button label="Continuar" icon="pi pi-arrow-right" iconPos="right"/>
                </div>


            </Card>
        </>
    )
}

export default EvaDocente;
