import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Fieldset} from "primereact/fieldset";
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";

const Resumen = () => {


    return (
        <Card className="fgrid col-fixed">
            <Card header={cardHeader}
                  className="border-solid border-blue-800 border-3 align-items-center align-content-center">
                <Divider align="center">
                    <h1 className="text-7xl font-smibold lg:md-2">Resumen de Perfil Profesional</h1>
                </Divider>

                <Card className="flex justify-content-center flex-wrap">

                    <div className="flex flex-column align-content-center align-items-center">
                        <Card
                            className="flex flex-row flex-wrap w-full h-full  justify-content-center ">
                            <DataTable tableStyle={{minWidth: '50rem'}}
                                       className="mt-5  w-full h-full text-3xl font-medium">
                                <Column field='Experiencia Agregada' header="Ficha Personal"
                                        headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                <Column field='Acciones' header="Acciones"
                                        headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                            </DataTable>
                        </Card>
                    </div>
                    <div className="flex flex-wrap flex-row">


                        <div className="flex align-items-center justify-content-center">
                            <div className="flex flex-column align-content-center">
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable tableStyle={{minWidth: '50rem'}}
                                               className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Experiencia Agregada' header="Contrato"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>


                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable tableStyle={{minWidth: '50rem'}}
                                               className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Experiencia Agregada' header="Horario"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>


                                </Card>
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable tableStyle={{minWidth: '50rem'}}
                                               className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Experiencia Agregada' header="Capacitaciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable tableStyle={{minWidth: '50rem'}}
                                               className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Experiencia Agregada' header="Evaluacion"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                    <DataTable tableStyle={{minWidth: '50rem'}}
                                               className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Experiencia Agregada' header="Recomendaciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>

                            </div>
                        </div>

                        <div className="flex flex-column align-items-center justify-content-center ml-4">
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable tableStyle={{minWidth: '50rem'}}
                                           className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Experiencia Agregada' header="Instruccion Formal"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable tableStyle={{minWidth: '50rem'}}
                                           className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Experiencia Agregada' header="Carga Familiar"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable tableStyle={{minWidth: '50rem'}}
                                           className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Experiencia Agregada' header="Experiencia "
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable tableStyle={{minWidth: '50rem'}}
                                           className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Experiencia Agregada' header="Habilidades"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable tableStyle={{minWidth: '50rem'}}
                                           className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Experiencia Agregada' header="Vacio"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                        </div>
                    </div>
                </Card>

            </Card>
        </Card>

    );
};

export default Resumen;
