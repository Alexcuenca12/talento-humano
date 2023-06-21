import {Card} from "primereact/card";
import {Fieldset} from "primereact/fieldset";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import cardHeader from "../../shared/CardHeader";
import {InputTextarea} from "primereact/inputtextarea";

const Habilidades = () => {

    const legendTemplate = (
        <div className="flex align-items-center gap-2">
            <Badge value="7" severity="warning"></Badge>
            <span className="font-bold">Habilidades</span>
        </div>
    )

    return (
        <>
            <Fieldset className="m-5" legend={legendTemplate}>
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-y-1">
                    <Card title="Habilidades">
                        <div className="formgrid grid">
                            <div className="field col-12">
                                <InputTextarea autoResize rows={5} cols={30}
                                               placeholder="Describa su habilidad"
                                className="w-full"/>
                            </div>
                            <div className="col-12 flex align-items-center justify-content-evenly">
                                <Button label="Agregar" severity="warning" rounded/>
                                <Button label="Cancelar" severity="secondary" rounded/>
                            </div>
                        </div>
                        <DataTable className="mt-5">
                            <Column header="Descripciones Agregadas"></Column>
                            <Column header="Acciones"></Column>
                        </DataTable>
                    </Card>
                    <div className="flex justify-content-end pt-5 align-items-center">
                        <Button icon="pi pi-arrow-right"
                                rounded severity="warning"
                                aria-label="Next"
                                className="z-0 shadow-2"
                        />
                    </div>

                </Card>
            </Fieldset>
        </>
    )
}

export default Habilidades;
