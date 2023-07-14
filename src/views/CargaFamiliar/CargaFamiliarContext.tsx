import React, {useState, useEffect} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from "primereact/calendar";
import {FileUpload} from "primereact/fileupload";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import '../../styles/CargaFamiliar.css'
import {Card} from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import {Fieldset} from "primereact/fieldset";
import {Divider} from "primereact/divider";
import {CargaFamiliarService} from "../../services/CargaFamiliarService";
import {ICargaFamiliar} from "../../interfaces/Primary/ICargaFamiliar";
import {IPersona} from "../../interfaces/Primary/IPersona";


const Persona = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');

    const [fechaNacimiento, setFechaNacimiento] = useState<string | Date | Date[] | null>(null);

    const [cargaFamiliar, setCargaFamiliar] = useState<ICargaFamiliar[]>([]);

    const [selectedCargaFamiliar, setSelectedCargaFamiliar] = useState<ICargaFamiliar | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const [editingCargaFamiliar, setEditingCargaFamiliar] = useState<ICargaFamiliar | null>(null);
    useEffect(() => {
        fetchCargaFamiliar();
    }, []);

    const fetchCargaFamiliar = () => {
        new CargaFamiliarService().getAll().then((data) => {
            setCargaFamiliar(data);
        });
    };


    const cargaBodyTemplate = (cargaFamiliarObj: ICargaFamiliar) => {
        return <div className="flex">
            <div className="mr-4">
                <h2 className="text-3xl">Cedula: </h2>
                <p className="text-2xl">{cargaFamiliarObj.cedula}</p>
            </div>
            <div className="mr-4">
                <h2 className="text-3xl">Nombre: </h2>
                <p className="text-2xl">{cargaFamiliarObj.nombre_pariente}</p>
            </div>
            <div className="mr-4 ">
                <h2 className="text-3xl">Apellido: </h2>
                <p className="text-2xl">{cargaFamiliarObj.apellido_pariente}</p>
            </div>
            <div className=" ">
                <h2 className="text-3xl">Fecha de Nacimiento: </h2>
                <p className="text-2xl">{String (cargaFamiliarObj.fecha_nacimiento) }</p>
            </div>
        </div>;
    };

    const persona: IPersona = {
        apellidos: "",
        calle_principal: "",
        calle_secundaria: "",
        carnet_conadis: "",
        celular: "",
        ci_pasaporte: "",
        correo: "",
        correo_institucional: "",
        discapacidad: false,
        edad: "",
        estado_civil: "",
        etnia: "",
        foto: "",
        foto_carnet: "",
        genero: "",
        idioma_raiz: "",
        idioma_secundario: "",
        nombres: "",
        numero_casa: "",
        pais_nacimiento: "",
        pais_residencia: "",
        parroquia_recidencial: "",
        porcentaje_discapacidad: "",
        referencia: "",
        sector: "",
        sexo: "",
        telefono: "",
        tipo_discapacidad: "",
        tipo_sangre: ""
        // Propiedades de la persona
    };

    const editCargaFamiliar = (rowData: ICargaFamiliar) => {
        setNombre(rowData.nombre_pariente.toString());
        setApellido(rowData.apellido_pariente.toString());
        setCedula(rowData.cedula.toString());
        setFechaNacimiento(rowData.fecha_nacimiento ? new Date(rowData.fecha_nacimiento.toString()) : null);

        setIsEditMode(true);
        setEditingCargaFamiliar(rowData);
    };


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (selectedCargaFamiliar) {
            const updatedCargaFamiliar: ICargaFamiliar = {
                ...selectedCargaFamiliar,
                nombre_pariente: nombre,
                apellido_pariente: apellido,
                cedula: cedula,
                fecha_nacimiento: Array.isArray(fechaNacimiento) && fechaNacimiento.length > 0 ? new Date(fechaNacimiento[0]) : null
            };
            const id: number = selectedCargaFamiliar.id_cargaFamiliar || 0;

            new CargaFamiliarService()
                .updateCarga(id, updatedCargaFamiliar)
                .then((response) => {
                    console.log(response);
                    fetchCargaFamiliar();
                    resetForm();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            const newCargaFamiliar: ICargaFamiliar = {
                nombre_pariente: nombre,
                apellido_pariente: apellido,
                cedula: cedula,
                fecha_nacimiento: Array.isArray(fechaNacimiento) && fechaNacimiento.length > 0 ? new Date(fechaNacimiento[0]) : null,
                persona: persona
            };

            new CargaFamiliarService()
                .saveCarga(newCargaFamiliar)
                .then((response) => {
                    console.log(response);
                    fetchCargaFamiliar();
                    resetForm();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    const resetForm = () => {
        setSelectedCargaFamiliar(null);
        setNombre('');
        setApellido('');
        setCedula('');
        setFechaNacimiento(null);
    };

    const cancelarEdicion = () => {
        resetForm();
        setIsEditMode(false);
    };



    const eliminarCargaFamiliar = (id: number | undefined) => {
        if (id !== undefined) {
            new CargaFamiliarService()
                .deleteCarga(Number(id))
                .then(() => {
                    fetchCargaFamiliar();
                    window.alert('Carga familiar eliminada correctamente.');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    return (
        <Fieldset className="fgrid col-fixed">

            <Card
                header={cardHeader}
                className="border-solid border-blue-800 border-3">
                <div className="h1-rem">
                    <Divider align='center'>
                        <h1 className="text-7xl font-smibold lg:md-2">Carga Familiar</h1>
                    </Divider>
                </div>
                <div className="flex justify-content-between flex-wrap">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap flex-row ">
                            <div className="flex align-items-center justify-content-center">
                                <div className="flex flex-column">
                                    <div
                                        className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label className="text-3xl font-medium w-full min-w-min">Cedula: </label>
                                            <InputText type="number" placeholder="Ingrese su Cedula" value={cedula}
                                                       className="w-auto min-w-min text-2xl" onChange={({target})=> setCedula(target.value)} />
                                        </div>
                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2">
                                            <label className="text-3xl font-medium w-full min-w-min">Nombres:</label>
                                            <InputText type="text" placeholder="Ingrese sus Nombres" value={nombre}
                                                       className="w-auto min-w-min text-2xl" onChange={({target})=> setNombre(target.value)}/>
                                        </div>

                                        <div
                                            className="flex align-items-center justify-content-center w-auto pr-2 ">
                                            <label className="text-3xl font-medium w-full min-w-min">Apellidos:</label>
                                            <InputText type="text" placeholder="Ingrese sus Apellidos" value={apellido}
                                                       className="w-auto min-w-min text-2xl" onChange={({target})=> setApellido(target.value)}/>

                                        </div>

                                    </div>
                                    <div
                                        className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1 ">

                                        <div
                                            className="flex align-items-center justify-content-center w-auto h-6rem">
                                            <label className="text-3xl font-medium w-auto min-w-min">Fecha de
                                                nacimiento:</label>
                                            <Calendar placeholder="Ingrese su Fecha de Nacimiento"
                                                      className="w-full min-w-min text-4xl"
                                                      id="institution"
                                                      name="institution"
                                                      dateFormat="dd/mm/yy"
                                                      value={fechaNacimiento}
                                                      showIcon />

                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                                        <div
                                            className="flex align-items-center justify-content-center w-auto min-w-min">
                                            <Button type="submit"
                                                    className="w-full text-3xl min-w-min " label={isEditMode ? 'Actualizar' : 'Agregar'}
                                                    rounded/>
                                        </div>
                                        <div
                                            className="flex align-items-center justify-content-center w-auto min-w-min">
                                            <Button type="button" label="Cancel"
                                                    className="w-full text-3xl min-w-min"
                                                    rounded onClick={cancelarEdicion}/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-column align-items-center justify-content-between ml-4">
                                <label className="flex text-3xl font-medium">Subir PDF:</label>
                                <FileUpload name="pdf"
                                            chooseLabel="Escoger"
                                            uploadLabel="Cargar"
                                            cancelLabel="Cancelar"
                                            emptyTemplate={<p className="m-0 p-button-rounded">Arrastre y suelte los
                                                archivos aquí para
                                                cargarlos.</p>}/>

                            </div>

                        </div>
                    </form>
                </div>


                <DataTable tableStyle={{minWidth: '50rem'}} className="mt-5  w-full h-full text-3xl font-medium "
                           value={cargaFamiliar}>
                    <Column header="Carga Familiar"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}
                            body={cargaBodyTemplate}></Column>
                    <Column field="PDF" header="PDF"
                            headerStyle={{backgroundColor: '#0C3255', color: 'white'}}></Column>
                    <Column
                        field="Acciones"
                        header="Acciones"
                        headerStyle={{ backgroundColor: '#0C3255', color: 'white' }}
                        body={(rowData: ICargaFamiliar) => (
                            <>
                                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text mr-4" onClick={() => editCargaFamiliar(rowData)} />
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => eliminarCargaFamiliar(rowData.id_cargaFamiliar)} />
                            </>
                        )}
                    />

                </DataTable>
            </Card>


        </Fieldset>
    );
};

export default Persona;
