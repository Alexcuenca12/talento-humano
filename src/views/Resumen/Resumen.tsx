import React, {useEffect, useState} from 'react';
import cardHeader from "../../shared/CardHeader";
import {Divider} from "primereact/divider";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {IHabilidades} from "../../interfaces/Primary/IHabilidades";
import personaService from "../../services/PersonaService";
import {IPersona} from "../../interfaces/Primary/IPersona";
import {ICapacitaciones} from "../../interfaces/Primary/ICapacitaciones";
import {ICargaFamiliar} from "../../interfaces/Primary/ICargaFamiliar";
import {IContrato} from "../../interfaces/Primary/IContrato";
import {IEva_Docente} from "../../interfaces/Primary/IEva_Docente";
import {IHorario, IHorarioData} from "../../interfaces/Primary/IHorario";
import {IRecomendaciones} from "../../interfaces/Primary/Recomendaciones";
import {IExperiencia} from "../../interfaces/Primary/IExperiencia";
import {InstruccionFormalData} from "../../interfaces/Primary/IInstrucc_Formal";

const Resumen = () => {
    const userData = sessionStorage.getItem("user");
    const userObj = JSON.parse(userData || "{}");
    const userId = userObj.id as number;

    const [persona, setPersona] = useState<IPersona | null>(null);
    const [capacitaciones, setCapacitaciones] = useState<ICapacitaciones[]>([]);
    const [cargaFamiliar, setCargaFamiliar] = useState<ICargaFamiliar[]>([]);
    const [contratos, setContratos] = useState<IContrato[]>([]);
    const [evaluaciones, setEvaluaciones] = useState<IEva_Docente[]>([]);
    const [habilidades, setHabilidades] = useState<IHabilidades[]>([]);
    const [horarios, setHorarios] = useState<IHorario[]>([]);
    const [recomendaciones, setRecomendaciones] = useState<IRecomendaciones[]>([]);
    const [experiencias, setExperiencias] = useState<IExperiencia[]>([]);
    const [instrucciones, setInstrucciones] = useState<InstruccionFormalData[]>([]);

    useEffect(() => {
        fetchSummary();
    }, [])
    // SERVICE METHOD
    const fetchSummary = () => {
        personaService.getSummary(userId)
            .then(response => {
                console.log(response)
                const {
                    persona,
                    capacitaciones,
                    cargaFamiliar,
                    contratos,
                    evaluaciones,
                    habilidades,
                    horarios,
                    recomendaciones,
                    experiencias,
                    instrucciones

                } = response;
                setPersona(persona);
                setCapacitaciones(capacitaciones);
                setCargaFamiliar(cargaFamiliar);
                setContratos(contratos);
                setEvaluaciones(evaluaciones);
                setHabilidades(habilidades);
                setHorarios(horarios);
                setRecomendaciones(recomendaciones);
                setExperiencias(experiencias);
                setInstrucciones(instrucciones);
            }).catch(error => {
            console.error(error);
        })
    }


    const contratoBody = (rowData: IContrato) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Fecha Inicio: </h2>
                    <p className="text-2xl">{String(rowData.fecha_inicio)}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Fecha Fin: </h2>
                    <p className="text-2xl">{String(rowData.fecha_fin)}</p>
                </div>
                <div className="mr-4 ">
                    <h2 className="text-3xl">Cargo: </h2>
                    <p className="text-2xl">{rowData.cargo}</p>
                </div>
                <div className=" ">
                    <h2 className="text-3xl">Salario: </h2>
                    <p className="text-2xl">{rowData.salario}</p>
                </div>
            </div>
        );
    };

    const horarioBody = (rowData: IHorarioData) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Distributivo: </h2>
                    <p className="text-2xl">{rowData.distributivo}</p>
                </div>
                <div className="mr-4 ">
                    <h2 className="text-3xl">Periodo: </h2>
                    <p className="text-2xl">{rowData.periodo}</p>
                </div>
                <div className=" ">
                    <h2 className="text-3xl">Horario: </h2>
                    <p className="text-2xl">{rowData.horario}</p>
                </div>
            </div>
        );
    };

    const capacitacionesBody = (rowData: ICapacitaciones) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Institucion: </h2>
                    <p className="text-2xl">{rowData.institucion}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Tipo Evento: </h2>
                    <p className="text-2xl">{rowData.tipo_evento}</p>
                </div>
                <div className="mr-4 ">
                    <h2 className="text-3xl">Area de Estudio: </h2>
                    <p className="text-2xl">{rowData.area_estudios}</p>
                </div>
                <div className=" ">
                    <h2 className="text-3xl">Nombre de Evento: </h2>
                    <p className="text-2xl">{rowData.nombre_evento}</p>
                </div>
                <div className=" ">
                    <h2 className="text-3xl">Tipo certificado: </h2>
                    <p className="text-2xl">{rowData.tipo_certificado}</p>
                </div>
            </div>
        );
    };

    const evaluacionBody = (rowData: IEva_Docente) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Carrera: </h2>
                    <p className="text-2xl">{rowData.cod_carrera}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Periodo Academico: </h2>
                    <p className="text-2xl">{String(rowData.periodo)}</p>
                </div>
            </div>
        );
    };

    const recomendacionesBody = (rowData: IRecomendaciones) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Nombres: </h2>
                    <p className="text-2xl">{rowData.primer_nombre || rowData.primer_apellido}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Email: </h2>
                    <p className="text-2xl">{rowData.correo}</p>
                </div>

            </div>
        );
    };

    const instruccionFBody = (rowData: InstruccionFormalData) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Nivel de institucion: </h2>
                    <p className="text-2xl">{rowData.nivelInstruccion}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Titulo Obtenido: </h2>
                    <p className="text-2xl">{rowData.tituloObtenido}</p>
                </div>
                <div className="mr-4 ">
                    <h2 className="text-3xl">Institucion Educativa: </h2>
                    <p className="text-2xl">{rowData.institucionEducativa}</p>
                </div>
            </div>
        );
    };

    const cargaFBody = (rowData: ICargaFamiliar) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Cedula: </h2>
                    <p className="text-2xl">{rowData.cedula}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Nombres: </h2>
                    <p className="text-2xl">{rowData.nombre_pariente || rowData.apellido_pariente}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Fecha de nacimiento: </h2>
                    <p className="text-2xl">{String(rowData.fecha_nacimiento)}</p>
                </div>
            </div>
        );
    };

    const experienciaBody = (rowData: IExperiencia) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Institucion: </h2>
                    <p className="text-2xl">{rowData.institucion}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Area de trabajo: </h2>
                    <p className="text-2xl">{rowData.area_trabajo}</p>
                </div>
                <div className="mr-4">
                    <h2 className="text-3xl">Puesto: </h2>
                    <p className="text-2xl">{rowData.puesto}</p>
                </div>
            </div>
        );
    };

    const habilidadesBody = (rowData: IHabilidades) => {
        return (
            <div className="flex">
                <div className="mr-4">
                    <h2 className="text-3xl">Descripcion: </h2>
                    <p className="text-2xl">{rowData.descripcion}</p>
                </div>

            </div>
        );
    };

    return (
        <Card className="fgrid col-fixed">
            <Card header={cardHeader}
                  className="border-solid border-blue-800 border-3 align-items-center align-content-center">
                <Divider align="center">
                    <h1 className="text-7xl font-smibold lg:md-2">Resumen de Perfil Profesional</h1>
                </Divider>

                <Card className="flex justify-content-center flex-wrap">


                    <div className="flex flex-wrap flex-row">


                        <div className="flex align-items-center justify-content-center">
                            <div className="flex flex-column align-content-center">
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable
                                        value={contratos}
                                        dataKey="id_contrato"
                                        tableStyle={{minWidth: '50rem'}}
                                        className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Contrato' header="Contrato"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}
                                                body={contratoBody}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>


                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable
                                        value={horarios}
                                        dataKey="id_horarios"
                                        tableStyle={{minWidth: '50rem'}}
                                        className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Horario' header="Horario" body={horarioBody}
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>


                                </Card>
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable
                                        value={capacitaciones}
                                        dataKey="id_capacitaciones"
                                        tableStyle={{minWidth: '50rem'}}
                                        className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Capacitaciones' header="Capacitaciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}
                                                body={capacitacionesBody}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 row-gap-8 gap-8  mt-6">
                                    <DataTable
                                        value={evaluaciones}
                                        dataKey="id_evaluacion"
                                        tableStyle={{minWidth: '50rem'}}
                                        className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Evaluacion' header="Evaluacion" body={evaluacionBody}
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                        <Column field='Acciones' header="Acciones"
                                                headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    </DataTable>
                                </Card>
                                <Card
                                    className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                    <DataTable
                                        value={recomendaciones}
                                        dataKey="id_recomendaciones"
                                        tableStyle={{minWidth: '50rem'}}
                                        className="mt-5  w-full h-full text-3xl font-medium">
                                        <Column field='Recomendaciones' header="Recomendaciones"
                                                body={recomendacionesBody}
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
                                <DataTable
                                    tableStyle={{minWidth: '50rem'}}
                                    className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Instruccion Formal' header="Instruccion Formal"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}
                                            body={instruccionFBody}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable
                                    value={cargaFamiliar}
                                    dataKey="id_cargaFamiliar"
                                    tableStyle={{minWidth: '50rem'}}
                                    className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Carga Familiar' header="Carga Familiar" body={cargaFBody}
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable
                                    value={experiencias}
                                    dataKey="id_experiencia"
                                    tableStyle={{minWidth: '50rem'}}
                                    className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column field='Experiencia' header="Experiencia" body={experienciaBody}
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                    <Column field='Acciones' header="Acciones"
                                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                                </DataTable>
                            </Card>
                            <Card
                                className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1  row-gap-8 gap-8  mt-6">
                                <DataTable
                                    value={habilidades}
                                    dataKey="id_habilidades"
                                    tableStyle={{minWidth: '50rem'}}
                                    className="mt-5  w-full h-full text-3xl font-medium">
                                    <Column
                                        field='descripcion' header="Habilidades" body={habilidadesBody}
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