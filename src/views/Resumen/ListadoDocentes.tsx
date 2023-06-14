import React, {useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export  function ListadoDocentes({} ) {

    return (
        <div className="fgrid col-fixed p-8 ">
            <h1 className="text-center ">Listado Docente</h1>

            <div className="center-table ">
                <div className="field p-col-10 md:col-auto inline-flex ">
                    <InputText  placeholder="Buscar"/>
                </div>
                <div className="field p-col-2 inline-flex ">
                    <Button label="Search" icon="pi pi-search"  />
                </div>
            </div>


            <div className=" center-table">
                <div className="card p-col-12">
                    <DataTable  tableStyle={{ minWidth: '50rem' }}>
                        <Column field="Id Perfil" header="Id Perfil"></Column>
                        <Column field="Cedula" header="Cedula"></Column>
                        <Column field="Nombres" header="Nombres"></Column>
                        <Column field="Apellidos" header="Apellidos"></Column>
                        <Column field="Id Contacto" header="Id Contacto"></Column>
                        <Column field="Acciones" header="Acciones"></Column>

                    </DataTable>
                </div>
            </div>
        </div>
    )
}
