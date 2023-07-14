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
            <Fieldset className="fgrid col-fixed" >
                <Card
                    header={cardHeader}
                    className="border-solid border-blue-800 border-3">

                        <div className="h1-rem">
                            <Divider align="center">
                                <h1 className="text-7xl font-smibold lg:md-2">Habilidades</h1>
                            </Divider>
                        </div>
                    <div className="flex justify-content-center ">
                        <form >
                            <div className="flex align-content-center w-auto max-w-full">
                                <InputTextarea autoResize rows={5} cols={30}
                                               placeholder="Describa su habilidad"
                                               className="w-max text-2xl "/>

                            </div>

                            <div
                                className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                                <div
                                    className="flex align-items-center justify-content-center w-auto min-w-min">
                                    <Button type="submit" label="Agregar"
                                            className="w-full text-3xl min-w-min "
                                            rounded/>
                                </div>
                                <div
                                    className="flex align-items-center justify-content-center w-auto min-w-min">
                                    <Button type="button" label="Cancel"
                                            className="w-full text-3xl min-w-min"
                                            rounded/>
                                </div>
                            </div>

                        </form>
                    </div>

                    <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5  w-full h-full text-3xl font-medium">
                        <Column field="Descripciones Agregadas" header="Descripciones Agregadas"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                        <Column field="Horas Semanales" header="Acciones"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                    </DataTable>

                </Card>
            </Fieldset>
    )
}

export default Habilidades;
