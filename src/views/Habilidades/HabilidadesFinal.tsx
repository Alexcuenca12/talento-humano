import React, { useState, useEffect, ChangeEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/Habilidades.css';
import swal from 'sweetalert';

interface Habilidad {
    id_habilidades: number;
    descripcion: string;
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

const HabilidadesContext = () => {

    const [descripcion, setDescripcion] = useState('');
    const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
    const [idPersona, setIdPersona] = useState<number>(1); // Variable de estado para el id_persona

    const [HabilidadSeleccionado, setHabilidadSeleccionado] = useState<Habilidad | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [habilidadEditar, setHabilidadEditar] = useState<Habilidad | null>(null);
    const [isEditing, setIsEditing] = useState(false);



    const handleDescripcionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
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

    const handleEditarClickHa = (habilidad: Habilidad) => {
        setIsEditing(true);
        setEditMode(true);
        setHabilidadEditar(habilidad);
        setDescripcion(habilidad.descripcion);
    };


    const handleGuardarClickHa = async () => {
        setIsEditing(false);
        if (editMode && habilidadEditar) {

            try {

                if (!descripcion) {

                    return swal({
                        title: "Contrato",
                        text: "Falta completar el dato de la habilidad",
                        icon: "warning"
                    });
                }

                const nuevaHabilidad = {

                    descripcion: descripcion,


                };

                const response = await fetch(`http://localhost:8080/api/habilidades/update/${habilidadEditar.id_habilidades}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevaHabilidad),
                });

                if (response.ok) {
                    // Actualizar la lista de habilidades después de guardar en la base de datos
                    swal({
                        title: "Habilidad",
                        text: "Datos actualizados correctamente",
                        icon: "success"
                    });
                    obtenerHabilidades();
                    setEditMode(false);
                    setHabilidadEditar(null);
                    setDescripcion('');

                } else {
                    console.log('Error al actualizar la habilidad');
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



            const nuevaHabilidad: Habilidad = {
                id_habilidades: habilidades.length + 1,
                descripcion: descripcion,
                id_persona: persona.id_persona,
            };

            console.log('Persona con ID: ' + persona.id_persona);

            if (!descripcion) {

                return swal({
                    title: "Habilidad",
                    text: "Falta completar el dato de habilidad",
                    icon: "warning"
                });
            }

            try {
                const response = await fetch('http://localhost:8080/api/habilidades/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevaHabilidad),
                });

                if (response.ok) {
                    // Actualizar la lista de habilidades después de guardar en la base de datos
                    swal({
                        title: "Habilidad",
                        text: "Datos Guardados Correctamente",
                        icon: "success"
                    });
                    obtenerHabilidades();
                    setDescripcion('');
                } else {
                    console.log('Error al guardar la habilidad');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }
        }
    }

    const obtenerHabilidades = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/habilidades/read');
            if (response.ok) {
                const data = await response.json();
                setHabilidades(data);
            } else {
                console.log('Error al obtener las habilidades');
            }
        } catch (error) {
            console.log('Error al realizar la llamada a la API', error);
        }
    };

    const handleEliminarClickHa = async (idHabilidad: number) => {
        // Eliminar el contrato de la base de datos
        const confirmed = await swal({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la habilidad de forma permanente.',
            icon: 'warning',
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
        });

        if (confirmed) {
            // Aquí puedes colocar la lógica para eliminar la habilidad
            try {
                const response = await fetch(`http://localhost:8080/api/habilidades/delete/${idHabilidad}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Actualizar la lista de habilidades después de eliminar en la base de datos
                    swal('Eliminado', 'La habilidad ha sido eliminada correctamente.', 'success');
                    obtenerHabilidades();
                } else {
                    console.log('Error al eliminar la habilidad');
                }
            } catch (error) {
                console.log('Error al realizar la llamada a la API', error);
            }

        }


    };

    useEffect(() => {
        obtenerHabilidades();
        obtenerPersonas();
    }, []);


    return (
        <div className='div-page-habilidad'>
            <div className='div-contenedor-habilidad div-general-habilidad'>
                <div className="title-container-habilidad">
                    <div className="title-line-habilidad"></div>
                    <h1 className="page-title-habilidad">HABILIDADES</h1>
                    <div className="title-line-habilidad"></div>
                </div>
                <div className='contenedor-habilidad'>

                    <div className="">
                        <label htmlFor="descripcion">Descripcion de Habilidad:</label>
                        <InputText className="" id="descripcion" name="descripcion"
                            value={descripcion}
                            onChange={handleDescripcionChange}
                            style={{
                                width: '400px',
                                height: 'auto',
                                resize: 'vertical',
                                overflow: 'hidden',
                                wordWrap: 'break-word',
                                fontSize: '16px'
                                
                            }}
                        />
                    </div>
                    <br />
                    <div className='div-botons-habilidad'>
                        <Button type="button" label="CANCELAR" className="small-button-habilidad  " style={{ background: 'black' }} />

                        <Button type="button" className='small-button-habilidad' label={isEditing ? 'ACTUALIZAR' : 'GUARDAR'} style={{
                            background: '#ff9800',
                            borderRadius: '10%',
                            fontSize: '10px',
                            justifyContent: 'center'
                        }}
                            onClick={handleGuardarClickHa}
                        />
                    </div>

                </div>
                <div className=''>
                    <div className="table-container-habilidad">
                        <table className="data-table-habilidad">
                            <thead>
                                <tr>
                                    <th>Descripciones Agregadas</th>
                                    <th>Acciones</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {habilidades.map((habilidad) => (
                                    <tr key={habilidad.id_habilidades}>

                                        <td>{habilidad.descripcion}</td>
                                        <td></td>
                                        <td>
                                            <Button
                                                type="button"
                                                className="button-habilidad"
                                                label="✎"

                                                style={{
                                                    background: '#ff9800',
                                                    borderRadius: '10%',
                                                    fontSize: '30px',
                                                    width: '55px',
                                                    height: '40px',
                                                    color: "black",
                                                    justifyContent: 'center',
                                                    marginRight: '5px' // Espacio entre los botones
                                                }}
                                                onClick={() => handleEditarClickHa(habilidad)}
                                            // Agrega el evento onClick para la operación de editar

                                            />
                                            <Button
                                                type="button"
                                                className="button-habilidad"
                                                label="✘"
                                                style={{
                                                    background: '#ff0000',
                                                    borderRadius: '10%',
                                                    fontSize: '30px',
                                                    width: '55px',
                                                    height: '40px',
                                                    color: "black",
                                                    justifyContent: 'center'
                                                }}
                                                onClick={() => handleEliminarClickHa(habilidad.id_habilidades)}
                                            // Agrega el evento onClick para la operación de eliminar

                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                <br />
                <div className="div-button-habilidad">
                    <Button type="button" label="CONTINUAR ➠" className="button-habilidad" style={{ background: 'black' }} />
                </div>

            </div>


        </div>
    );

};

export default HabilidadesContext;