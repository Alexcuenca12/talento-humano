
// http://localhost:8080/api/habilidades/read');
//http://localhost:8080/api/habilidades/create
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Habilidad {
  id_habilidad: number;
  descripcion: string;
  id_persona: number;
}

const VentanaHabilidades = () => {
  const [descripcion, setDescripcion] = useState('');
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [idPersona, setIdPersona] = useState<number>(1); // Variable de estado para el id_persona

  const handleDescripcionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescripcion(event.target.value);
  };

  const handleGuardarClick = async () => {
    const nuevaHabilidad: Habilidad = {
      id_habilidad: habilidades.length + 1,
      descripcion: descripcion,
      id_persona: idPersona, // Utilizar el valor de idPersona
    };

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
        obtenerHabilidades();
        setDescripcion('');
      } else {
        console.log('Error al guardar la habilidad');
      }
    } catch (error) {
      console.log('Error al realizar la llamada a la API', error);
    }
  };

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

  useEffect(() => {
    obtenerHabilidades();
  }, []);

  return (
    <div>
      <h2>Administración de habilidades</h2>

      <form>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={handleDescripcionChange}
          />
        </label>
        <button type="button" onClick={handleGuardarClick}>
          Guardar
        </button>
      </form>

      <h3>Habilidades guardadas:</h3>

      <table>
        <thead>
          <tr>
            <th>ID Habilidad</th>
            <th>Descripción</th>
            <th>ID Persona</th>
          </tr>
        </thead>
        <tbody>
          {habilidades.map((habilidad) => (
            <tr key={habilidad.id_habilidad}>
              <td>{habilidad.id_habilidad}</td>
              <td>{habilidad.descripcion}</td>
              <td>{habilidad.id_persona}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentanaHabilidades;


