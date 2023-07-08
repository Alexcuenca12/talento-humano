import React, { useEffect, useState, ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Horario.css';
import swal from 'sweetalert';


interface Horario {
    id_horario: number;
    periodo: string;
    horario: string;
    dias: string;
    distributivo: string;
    id_persona?: number | null;
    id_periodoacademico: number;
}

interface IPersona {
    id_persona?: number | null;
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

interface IPeriodo_Aca {
    id_periodoacademico: number;
    nombre: string;
    fecha_inicio: Date;
    fecha_fin: Date;
}


const HorarioContext = () => {

    const [periodo, setperiodo] = useState('');
    const [horario, sethorario] = useState('');
    const [dias, setdias] = useState('');
    const [distributivo, setdistributivo] = useState('');
    const [idPersona, setIdPersona] = useState<number | null>(null);
    const [idPeriodoAca, setIdPeriodoAca] = useState<number | null>(null);
    const [Horarios, setHorarios] = useState<Horario[]>([]);

    const [HorarioSeleccionado, setHorarioSeleccionado] = useState<Horario | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [horarioEditar, setHorarioEditar] = useState<Horario | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IPersona | null>(null);






    const handleperiodoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setperiodo(inputValue);
    };

    const handlehorarioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        sethorario(inputValue);
    };

    const handlediasChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setdias(inputValue);
    };

    const handledistributivoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setdistributivo(inputValue);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        const selectedPersona = personas.find((persona) => persona.id_persona === selectedId);
        setSelectedOption(selectedPersona || null);
      };
      




    const [personas, setPersonas] = useState<IPersona[]>([]);
    const [periodosaca, setPeriodoAca] = useState<IPeriodo_Aca[]>([]);

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

    const obtenerPeriodo = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/periodoacademico/read');
            if (response.ok) {
                const data = await response.json();
                setPeriodoAca(data);


            } else {
                console.log('Error al obtener el periodo academico');
            }
        } catch (error) {
            console.log('Error al realizar la llamada a la API', error);
        }
    };

    const handleEditarClickH = (horario: Horario) => {
        setIsEditing(true);
        setEditMode(true);
        setHorarioEditar(horario);
        setperiodo(horario.periodo);
        sethorario(horario.horario);
        setdias(horario.dias);
        setdistributivo(horario.distributivo);
    };

    const handleGuardarClickH = async () => {

        setIsEditing(false);
        if (editMode && horarioEditar) {

            if (!selectedOption) {
                return swal({
                    title: "Horario",
                    text: "Debe seleccionar una persona",
                    icon: "warning"
                });
            }

            try {

                if (!periodo || !horario || !dias || !distributivo) {

                    return swal({
                        title: "Contrato",
                        text: "Falta completar los datos requeridos del Horario",
                        icon: "warning"
                    });
                }

                const nuevoHorario = {

                    periodo: periodo,
                    horario: horario,
                    dias: dias,
                    distributivo: distributivo,

                };

                const response = await fetch(`http://localhost:8080/api/horario/update/${horarioEditar.id_horario}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoHorario),
                });

                if (response.ok) {
                    // Actualizar la lista de horarios después de guardar en la base de datos
                    swal({
                        title: "Horario",
                        text: "Datos actualizados correctamente",
                        icon: "success"
                    });
                    obtenerHorarios();
                    setEditMode(false);
                    setHorarioEditar(null);
                    setperiodo('');
                    sethorario('');
                    setdias('');
                    setdistributivo('');
                } else {
                    console.log('Error al actualizar el horario');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }
        } else {
            setIsEditing(false);
            if (!selectedOption) {
                return swal({
                    title: "Horario",
                    text: "Debe seleccionar una persona",
                    icon: "warning"
                });
            }
            
           

            const periodoAca = periodosaca.find((p) => p.id_periodoacademico === idPeriodoAca);
            if (!periodoAca) {
                console.log('No se encontró el periodo con el ID especificado');
                return;
            }


            const nuevoHorario: Horario = {
                id_horario: Horarios.length + 1,
                periodo: periodo,
                horario: horario,
                dias: dias,
                distributivo: distributivo,
                id_persona: selectedOption.id_persona !== null ? selectedOption.id_persona : undefined,
                id_periodoacademico: periodoAca.id_periodoacademico,



            };

         

            if (!periodo || !horario || !dias || !distributivo) {

                return swal({
                    title: "Horario",
                    text: "Falta completar los datos requeridos del Horario",
                    icon: "warning"
                });
            }

            try {
                const response = await fetch('http://localhost:8080/api/horario/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoHorario),
                });

                if (response.ok) {
                    // Actualizar la lista de horarios después de guardar en la base de datos
                    swal({
                        title: "Horario",
                        text: "Datos Guardados Correctamente",
                        icon: "success"
                    });
                    obtenerHorarios();

                    setperiodo('');
                    setdias('');
                    sethorario('');
                    setdistributivo('');
                } else {
                    console.log('Error al guardar el horario');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }
        }

    };

    const obtenerHorarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/horario/read');
            if (response.ok) {
                const data = await response.json();
                setHorarios(data);
            } else {
                console.log('Error al obtener los horarios');
            }
        } catch (error) {
            console.log('Error al realizar la llamada a la API', error);
        }
    };

    const handleEliminarClickH = async (idHorario: number) => {
        // Eliminar el contrato de la base de datos
        const confirmed = await swal({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el horario de forma permanente.',
            icon: 'warning',
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
        });

        if (confirmed) {
            // Aquí puedes colocar la lógica para eliminar el horario
            try {
                const response = await fetch(`http://localhost:8080/api/horario/delete/${idHorario}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Actualizar la lista de horarios después de eliminar en la base de datos
                    swal('Eliminado', 'El horario ha sido eliminado correctamente.', 'success');
                    obtenerHorarios();
                } else {
                    console.log('Error al eliminar el horario');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }

        }


    };

    useEffect(() => {
        obtenerHorarios();
        obtenerPersonas();
        obtenerPeriodo();


    }, []);







    return (
        <div className='div-page-horario'>
            <div className='div-contenedor-horario div-general-horario'>
                <div>
                    <h1 className="page-title-horario">INSTITULO SUPERIOR TECNOLOGICO DEL AZUAY</h1>

                </div>
                <div className="title-container-horario ">
                    <br />
                    <div className="title-line-horario"></div>
                    <h1 className="page-title-horario">HORARIO</h1>
                    <div className="title-line-horario"></div>
                </div>

                <div className=''>


                    <div className="form-rows-horario">

                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="materia"
                                        name="materia"
                                    />
                                    <label htmlFor="materia">Materia</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="horario"
                                        name="horario"
                                        value={horario}
                                        onChange={handlehorarioChange}
                                        required
                                    />
                                    <label htmlFor="horas">Horario</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="ciclo"
                                        name="ciclo"
                                    />
                                    <label htmlFor="ciclo">Ciclo</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="curso"
                                        name="curso"
                                    />
                                    <label htmlFor="curso">Curso</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="carrera"
                                        name="carrera"
                                    />
                                    <label htmlFor="carrera">Carrera</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="periodo"
                                        name="periodo"
                                        value={periodo}
                                        onChange={handleperiodoChange}
                                        required
                                    />
                                    <label htmlFor="horas">Periodo</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="dias"
                                        name="dias"
                                        value={dias}
                                        onChange={handlediasChange}
                                        required
                                    />
                                    <label htmlFor="horas">Dias</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        id="distributivo"
                                        name="distributivo"
                                        value={distributivo}
                                        onChange={handledistributivoChange}
                                        required
                                    />
                                    <label htmlFor="horas">Distributivo</label>
                                </span>
                            </div>
                        </div>
                        <div className="input-container-horario">
                            <div className="p-inputgroup fieldH">
                                <span className="p-float-label card flex justify-content-center">
                                    <select value={selectedOption ? String(selectedOption.id_persona) : ''} onChange={handleSelectChange}>
                                        <option value="">Seleccionar opción</option>
                                        {personas.map((persona) => (
                                            <option key={persona.id_persona} value={String(persona.id_persona)}>
                                                {persona.apellidos}
                                            </option>
                                        ))}
                                    </select>
                                    
                                </span>
                            </div>
                        </div>





                    </div>
                    <div className=''>
                        <div className="table-container-horario">
                            <table className="data-table-horario">
                                <thead>
                                    <tr>
                                        <th>Periodo</th>
                                        <th>Horario</th>
                                        <th>Dias</th>
                                        <th>Operaciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Horarios.map((horario) => (
                                        <tr key={horario.id_horario}>

                                            <td>{horario.periodo}</td>
                                            <td>{horario.horario}</td>
                                            <td>{horario.dias}</td>

                                            <td>
                                                <Button
                                                    type="button"
                                                    className="button-horario"
                                                    label="✎"

                                                    style={{
                                                        background: '#ff9800',
                                                        borderRadius: '10%',
                                                        fontSize: '30px',
                                                        color: "black",
                                                        justifyContent: 'center',
                                                        marginRight: '5px' // Espacio entre los botones
                                                    }}
                                                    onClick={() => handleEditarClickH(horario)}
                                                // Agrega el evento onClick para la operación de editar

                                                />
                                                <Button
                                                    type="button"
                                                    className="button-horario"
                                                    label="✘"
                                                    style={{
                                                        background: '#ff0000',
                                                        borderRadius: '10%',
                                                        fontSize: '30px',
                                                        color: "black",
                                                        justifyContent: 'center'
                                                    }}
                                                    onClick={() => handleEliminarClickH(horario.id_horario)}
                                                // Agrega el evento onClick para la operación de eliminar

                                                />
                                            </td>



                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div className='dividir-botons-final-horario'>
                            <div className="">
                                <Button type="button" className='button-horario' label={isEditing ? 'ACTUALIZAR' : 'GUARDAR'} style={{
                                    background: '#ff9800',
                                    borderRadius: '10%',
                                    fontSize: '10px',
                                    justifyContent: 'center'
                                }}
                                    onClick={handleGuardarClickH}
                                />

                            </div>
                            <div className=''>
                                <Button type="button" label="AGREGAR" className='button-horario' style={{
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
        </div>
    );

}

export default HorarioContext;