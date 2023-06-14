import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const Experiencia = () => {

    return (
        <>
            <Card className="m-5">
                <Divider align="center">
                    <h2>Experiencia</h2>
                </Divider>
                <form className="formgrid grid">
                    <div className="field col-4">
                        <label htmlFor="institution">Institución</label>
                        <InputText id="institution"
                                   className="p-inputtext-sm w-full"/>

                    </div>
                    <div className="field col-4">
                        <label htmlFor="start-date">Fecha Inicial</label>
                        <Calendar id="start-date"
                                  dateFormat="dd/mm/yy"
                                  className="p-inputtext-sm w-full"/>
                    </div>
                    <div className="field col-4">
                        <label htmlFor="work-area">Área de Trabajo</label>
                        <Dropdown
                            id="work-area"
                            placeholder="Seleccione"
                            className="p-inputtext-sm w-full"
                        />
                    </div>
                    <div className="field col-4">
                        <label htmlFor="job">Puesto</label>
                        <InputText id="job"
                                   className="p-inputtext-sm w-full"/>

                    </div>
                    <div className="field col-4">
                        <label htmlFor="end-date">Fecha Final</label>
                        <Calendar id="end-date"
                                  dateFormat="dd/mm/yy"
                                  className="p-inputtext-sm w-full"/>
                    </div>
                    <div className="field col-4 flex justify-content-center align-items-end">
                        <FileUpload mode="basic" chooseLabel="Subir PDF"/>
                    </div>

                    <div className="col-12 flex justify-content-evenly align-content-center mt-4">
                        <Button label="Agregar" severity="success" />
                        <Button label="Cancelar" severity="secondary" />
                    </div>
                </form>

                <Card  className="my-5 mx-auto">
                    <DataTable >
                        <Column header="Experiencia Agregada"></Column>
                        <Column header="Acciones"></Column>
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
