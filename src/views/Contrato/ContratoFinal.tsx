import React, { useEffect, useState, ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import swal from 'sweetalert';
import { Dropdown } from 'primereact/dropdown'
import '../../styles/Contrato.css';



interface Contrato {
    id_contrato: number;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    anio_duracion: string;
    horas_diarias: string;
    cargo: string;
    salario: string;
    evidencia: Uint8Array | null;
    id_persona: number;
}

interface IPersona {
    id_persona: number;
    ci_pasaporte: string;
    apellidos: string;
    nombres: string;
    pais_nacimiento: string;
    edad: string;
    genero: string;
    sexo: string;
    estado_civil: string;
    etnia: string;
    tipo_sangre: string;
    celular: string;
    correo: string;
    correo_institucional: string;
    pais_residencia: string;
    parroquia_recidencial: string;
    calle_principal: string;
    calle_secundaria: string;
    numero_casa: string;
    sector: string;
    referencia: string;
    telefono: string;
    idioma_raiz: string;
    idioma_secundario: string;
    foto: string;
    discapacidad: boolean;
    tipo_discapacidad: string;
    porcentaje_discapacidad: string;
    carnet_conadis: string;
    foto_carnet: string;
}





const ContratoContext = () => {
    const [fecha_inicio, setfecha_inicio] = useState<Date | null>(null);
    const [fecha_fin, setfecha_fin] = useState<Date | null>(null);
    const [anio_duracion, setanio_duracion] = useState('');
    const [horas_diarias, sethoras_diarias] = useState('');
    const [cargo, setcargo] = useState('');
    const [salario, setsalario] = useState('');
    const [evidencia, setevidencia] = useState<Uint8Array | null>(null);
    const [Contratos, setContratos] = useState<Contrato[]>([]);
    const [idPersona, setIdPersona] = useState<number>(1); // Variable de estado para el id_persona
    const [contratoSeleccionado, setContratoSeleccionado] = useState<Contrato | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [contratoEditar, setContratoEditar] = useState<Contrato | null>(null);
    const [isEditing, setIsEditing] = useState(false);





    const handlefecha_inicioChange = (event: CalendarChangeEvent) => {
        if (event.value instanceof Date) {
            setfecha_inicio(event.value);
        } else {
            setfecha_inicio(null);
        }
    };

    const handlefecha_finChange = (event: CalendarChangeEvent) => {
        if (event.value instanceof Date) {
            setfecha_fin(event.value);
        } else {
            setfecha_fin(null);
        }
    };

    const handleanio_duracionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (/^\d{0,2}$/.test(inputValue)) {
            setanio_duracion(inputValue);
        } else {
            return swal({
                title: "Contrato",
                text: "Por favor, ingrese un rango de 2 números",
                icon: "warning"
            });
        }
    };

    const handlehoras_diariasChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValuee = event.target.value;

        if (/^\d{0,4}$/.test(inputValuee)) {
            sethoras_diarias(inputValuee);
        } else {
            return swal({
                title: "Contrato",
                text: "Por favor, ingrese solo un rango de 4 números",
                icon: "warning"
            });
        }
    };

    const handlecargoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setcargo(event.target.value);
    };

    const handlesalarioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value;

        if (/^\d{0,4}$/.test(inputVal)) {
            setsalario(inputVal);
        } else {
            return swal({
                title: "Contrato",
                text: "Por favor, ingrese solo un rango de 4 números",
                icon: "warning"
            });
        }
    };

    const handleevidenciaChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file);
            const reader = new FileReader();

            reader.onload = () => {
                const buffer = reader.result as ArrayBuffer;
                const byteArray = new Uint8Array(buffer);
                setevidencia(byteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const [personas, setPersonas] = useState<IPersona[]>([]);

    const obtenerPersonas = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/persona/read');
            if (response.ok) {
                const data = await response.json();
                setPersonas(data);


            } else {
                console.log('Error al obtener las personas');
            }
        } catch (error) {
            console.log('Error al realizar la llamada a la API', error);
        }
    };

    const handleEditarClick = (contrato: Contrato) => {
        setIsEditing(true);
        setEditMode(true);
        setContratoEditar(contrato);
        setfecha_fin(contrato.fecha_fin || null);
        setfecha_inicio(contrato.fecha_inicio || null);
        setanio_duracion(contrato.anio_duracion);
        setcargo(contrato.cargo);
        setevidencia(contrato.evidencia || null);
        setsalario(contrato.salario);
        sethoras_diarias(contrato.horas_diarias);

        console.log(setfecha_fin(contrato.fecha_fin || null));
        console.log(setcargo(contrato.cargo));
    };

    const handleGuardarClick = async () => {
        let evidenciaString: string | null = null;
        setIsEditing(false);
        if (editMode && contratoEditar) {

            try {

                if (fecha_inicio === null || fecha_fin === null || !anio_duracion || !cargo || !salario || !horas_diarias) {

                    return swal({
                        title: "Contrato",
                        text: "Falta completar los datos requeridos del Contrato",
                        icon: "warning"
                    });
                }

                const nuevoContrato = {
                    fecha_fin: fecha_fin,
                    fecha_inicio: fecha_inicio,
                    anio_duracion: anio_duracion,
                    cargo: cargo,
                    evidencia: evidencia,
                    salario: salario,
                    horas_diarias: horas_diarias,
                };

                const response = await fetch(`http://localhost:8080/api/contrato/update/${contratoEditar.id_contrato}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoContrato),
                });

                if (response.ok) {
                    // Actualizar la lista de contratos después de guardar en la base de datos
                    swal({
                        title: "Contrato",
                        text: "Datos actualizados correctamente",
                        icon: "success"
                    });
                    obtenerContratos();
                    setEditMode(false);
                    setContratoEditar(null);
                    setfecha_fin(null);
                    setfecha_inicio(null);
                    setanio_duracion('');
                    setcargo('');
                    setevidencia(null);
                    setsalario('');
                    sethoras_diarias('');
                } else {
                    console.log('Error al actualizar el contrato');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }
        } else {
            setIsEditing(false);
            const persona = personas.find((p) => p.id_persona === idPersona);
            if (!persona) {
                console.log('No se encontró la persona con el ID especificado');
                return;
            }


            const nuevoContrato: Contrato = {
                id_contrato: Contratos.length + 1,
                anio_duracion: anio_duracion,
                fecha_fin: fecha_fin,
                fecha_inicio: fecha_inicio,
                horas_diarias: horas_diarias,
                cargo: cargo,
                salario: salario,
                evidencia: evidenciaString,
                id_persona: persona.id_persona // Utilizar el valor de idPersona

            };

            console.log('Persona con ID: ' + persona.id_persona);

            if (fecha_inicio === null || fecha_fin === null || !anio_duracion || !cargo || !salario || !horas_diarias) {

                return swal({
                    title: "Contrato",
                    text: "Falta completar los datos requeridos del Contrato",
                    icon: "warning"
                });
            }

            if (evidencia) {
                const blob = new Blob([evidencia], { type: 'application/pdf' });
                evidenciaString = URL.createObjectURL(blob);
            }

            // Validar que fecha_fin no sea menor que fecha_inicio
            if (fecha_fin < fecha_inicio) {
                return swal({
                    title: "Contrato",
                    text: "La fecha de fin no puede ser menor que la fecha de inicio",
                    icon: "warning"
                });
            }




            try {
                const response = await fetch('http://localhost:8080/api/contrato/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoContrato),
                });

                if (response.ok) {
                    // Actualizar la lista de habilidades después de guardar en la base de datos
                    swal({
                        title: "Contrato",
                        text: "Datos Guardados Correctamente",
                        icon: "success"
                    });
                    obtenerContratos();
                    setfecha_fin(null);
                    setfecha_inicio(null);
                    setanio_duracion('');
                    setcargo('');
                    setevidencia(null);
                    setsalario('');
                    sethoras_diarias('');


                } else {
                    console.log('Error al guardar el contrato');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }
        }




    };

    const obtenerContratos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/contrato/read');
            if (response.ok) {
                const data = await response.json();
                setContratos(data);
            } else {
                console.log('Error al obtener los contratos');
            }
        } catch (error) {
            console.log('Error al realizar la llamada a la API', error);
        }
    };

    const handleEliminarClick = async (idContrato: number) => {
        // Eliminar el contrato de la base de datos
        const confirmed = await swal({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el contrato de forma permanente.',
            icon: 'warning',
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
        });

        if (confirmed) {
            // Aquí puedes colocar la lógica para eliminar el contrato
            try {
                const response = await fetch(`http://localhost:8080/api/contrato/delete/${idContrato}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Actualizar la lista de contratos después de eliminar en la base de datos
                    swal('Eliminado', 'El contrato ha sido eliminado correctamente.', 'success');
                    obtenerContratos();
                } else {
                    console.log('Error al eliminar el contrato');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }
            
        }


    };

    useEffect(() => {
        obtenerContratos();
        obtenerPersonas();


    }, []);

    const fechaCortai = fecha_inicio ? new Date(fecha_inicio).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }) : '';

    const fechaCortaf = fecha_fin ? new Date(fecha_fin).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }) : '';






    return (
        <div className='div-page-contrato'>
            <div className='div-contenedor-contrato div-general-contrato'>
                <div>
                    <h1 className="page-title-contrato">INSTITULO SUPERIOR TECNOLOGICO DEL AZUAY</h1>

                </div>
                <div className="title-container-contrato">

                    <br />
                    <div className="title-line-contrato"></div>
                    <br />
                    <h1 className="page-title-contrato">CONTRATO</h1>
                    <div className="title-line-contrato"></div>
                </div>

                <div className=' '>



                    <div className="form-rows-contrato">
                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <Calendar

                                        onChange={handlefecha_inicioChange}
                                        value={fecha_inicio}
                                        required

                                    />
                                    <label htmlFor="inicio">Fecha Inicio </label>
                                </span>
                            </div>
                        </div>

                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <Calendar
                                        onChange={handlefecha_finChange}
                                        value={fecha_fin}
                                        required
                                    />
                                    <label htmlFor="fin">Fecha Fin </label>
                                </span>
                            </div>
                        </div>

                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="anios"
                                        name="anios"
                                        value={anio_duracion}
                                        onChange={handleanio_duracionChange}
                                        required
                                    />
                                    <label htmlFor="anios">Años de Duracion</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="hora"
                                        name="hora"
                                        value={horas_diarias}
                                        onChange={handlehoras_diariasChange}
                                        required
                                    />
                                    <label htmlFor="hora">Horas</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="cargo"
                                        name="cargo"
                                        value={cargo}
                                        onChange={handlecargoChange}
                                        required
                                    />
                                    <label htmlFor="cargo">Cargo</label>
                                </span>
                            </div>
                        </div>

                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="salario"
                                        name="salario"
                                        pattern='[0-9,]*'
                                        value={salario}
                                        onChange={handlesalarioChange}
                                        required
                                    />
                                    <label htmlFor="salario">Salario</label>
                                </span>
                            </div>
                        </div>

                        <div className="input-container-contrato">
                            <div className="p-inputgroup field">
                                <span className="p-float-label card flex justify-content-center">
                                    <p>
                                        SUBIR PDF:
                                        <br />
                                        <input type="file" accept="application/pdf"
                                            onChange={handleevidenciaChange}
                                            required
                                        />
                                    </p>
                                </span>
                            </div>
                        </div>

                        <div className="">
                            <Button type="button" className='button-contrato' label={isEditing ? 'ACTUALIZAR' : 'GUARDAR'} style={{
                                background: '#ff9800',
                                borderRadius: '10%',
                                fontSize: '10px',
                                justifyContent: 'center'
                            }}
                                onClick={handleGuardarClick}
                            />

                        </div>
                    </div>

                    <div className=''>
                        <div className="table-container-contrato">
                            <table className="data-table-contrato">
                                <thead>
                                    <tr>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Fin </th>
                                        <th>Años de Duración</th>
                                        <th>Horas</th>
                                        <th>Cargo</th>
                                        <th>Salario</th>
                                        <th>Operaciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Contratos.map((contrato) => (
                                        <tr key={contrato.id_contrato}>
                                            <td>{contrato.fecha_inicio ? new Date(contrato.fecha_inicio).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            }) : ''}</td>
                                            <td>{contrato.fecha_fin ? new Date(contrato.fecha_fin).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            }) : ''}</td>
                                            <td>{contrato.anio_duracion}</td>
                                            <td>{contrato.horas_diarias}</td>
                                            <td>{contrato.cargo}</td>
                                            <td>{contrato.salario}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    className="button-contrato"
                                                    label="✎"

                                                    style={{
                                                        background: '#ff9800',
                                                        borderRadius: '10%',
                                                        fontSize: '30px',
                                                        color: "black",
                                                        justifyContent: 'center',
                                                        marginRight: '5px' // Espacio entre los botones
                                                    }}
                                                    onClick={() => handleEditarClick(contrato)}
                                                // Agrega el evento onClick para la operación de editar

                                                />
                                                <Button
                                                    type="button"
                                                    className="button-contrato"
                                                    label="✘"
                                                    style={{
                                                        background: '#ff0000',
                                                        borderRadius: '10%',
                                                        fontSize: '30px',
                                                        color: "black",
                                                        justifyContent: 'center'
                                                    }}
                                                    onClick={() => handleEliminarClick(contrato.id_contrato)}
                                                // Agrega el evento onClick para la operación de eliminar

                                                />
                                            </td>



                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div className='dividir-botons-final-contrato'>
                            <div className="">
                                <Button className='button-circular-contrato' label="AGREGAR" style={{
                                    background: '#ff9800',
                                    borderRadius: '10%',
                                    fontSize: '10px',
                                    justifyContent: 'center'
                                }} />
                            </div>
                            <br />
                            <div className="">
                                <Button className='button-circular-contrato' label="GUARDAR" style={{
                                    background: '#ff9800',
                                    borderRadius: '10%',
                                    fontSize: '10px',
                                    justifyContent: 'center'
                                }} />
                            </div>
                        </div>

                    </div>


                </div>

            </div>


        </div >

    );



}

export default ContratoContext;