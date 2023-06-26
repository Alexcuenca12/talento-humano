
import React, {useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Fieldset} from "primereact/fieldset";
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";

export  function ListadoDocentes({} ) {

    return (
        <Fieldset className="fgrid col-fixed ">
        <Card  header={cardHeader}
               className="border-solid border-blue-800 border-3">
            <div className="h1-rem">
                <Divider align='center'  >
                    <h1 className="text-7xl font-smibold lg:md-2">Listado Docente</h1>
                </Divider>
            </div>

            <div className="center-table ">
                <div className="field p-col-10 md:col-auto inline-flex ">
                    <InputText  placeholder="Buscar"/>
                </div>
                <div className="field p-col-2 inline-flex ">
                    <Button label="Search" icon="pi pi-search" rounded />
                </div>
            </div>



                    <DataTable  tableStyle={{ minWidth: '50rem' }} className="mt-5">
                        <Column field="Id Perfil" header="Id Perfil"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Cedula" header="Cedula"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Nombres" header="Nombres"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Apellidos" header="Apellidos"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Id Contacto" header="Id Contacto"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                        <Column field="Acciones" header="Acciones"
                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>

                    </DataTable>

        </Card>
        </Fieldset>
    )
}

