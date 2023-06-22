import {Card} from "primereact/card";
import {Fieldset} from "primereact/fieldset";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import cardHeader from "../../shared/CardHeader";
import {InputTextarea} from "primereact/inputtextarea";
import React from "react";
import {Divider} from "primereact/divider";

const Habilidades = () => {


    return (
            <Fieldset className="m-5" >
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-3">
                    <Card className="text-center">
                        <div className="h1-rem">
                            <Divider align="center">
                                <h1 className="text-7xl font-smibold lg:md-2">Habilidades</h1>
                            </Divider>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-12">
                                <InputTextarea autoResize rows={5} cols={30}
                                               placeholder="Describa su habilidad"
                                className="w-full"/>
                            </div>
                            <div className="col-12 flex align-items-center justify-content-evenly">
                                <Button label="Agregar"  rounded/>
                                <Button label="Cancelar"  rounded/>
                            </div>
                        </div>
                        <DataTable className="mt-5" >
                            <Column header="Descripciones Agregadas"
                                    headerStyle={{backgroundColor: '#0C3255', color:'white'}}></Column>
                            <Column header="Acciones"
                                    headerStyle={{backgroundColor: '#0C3255', color:'white'}}></Column>
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
    )
}

export default Habilidades;
