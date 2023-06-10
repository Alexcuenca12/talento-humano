import React, { createContext, useEffect, useState } from "react";
import { HorarioService } from "../../services/HorarioService";
import { IHorario } from "../../interfaces/Primary/IHorario";
import '../../styles/Horario.css'
//Exportaciones
interface IHorarioContext {
  hor: IHorario[];
  editHorario: IHorario | null;
  createHorario: (horario: IHorario) => void;
  deleteHorario: (horario: IHorario) => void;
  findHorario: (id: number) => void;
  updateHorario: (horario: IHorario) => void;
  setEditHorario: React.Dispatch<React.SetStateAction<IHorario | null>>;
}
//Contexto exportable con las operaciones vacias
export const HorarioContext = createContext<IHorarioContext>({
  hor: [],
  editHorario: null,
  createHorario: (horario: IHorario) => { },
  deleteHorario: (horario: IHorario) => { },
  findHorario: (id: number) => { },
  updateHorario: (horario: IHorario) => { },
  setEditHorario: () => { },
});

const HorarioContextProvider = (props: any) => {
  //Objeto para usar los servicios
  const horarioService = new HorarioService();
  //Lista para almacenar los horarios
  const [hor, setHorario] = useState<IHorario[]>([]);
  //Variable para almacenar un Horario transitorio
  const [editHorario, setEditHorario] = useState<IHorario | null>(null);
  //LLena el array de Horarios cada que se refresca la pagina
  useEffect(() => {
    horarioService.getAll().then((data) => {
      setHorario(data);
    });
  }, []);

  //Operacion de creacion
  const createHorario = (horario: any) => {
    horarioService.save(horario).then((data) => {
      setHorario([...hor, data]);
    });
  };
  //Operacion de eliminacion
  const deleteHorario = (id: any) => {
    horarioService
      .delete(id)
      .then(() => setHorario(hor.filter((p) => p.id_horario !== id)));
    setEditHorario(null);
  };
  //Operacion de busqueda
  const findHorario = (id: number) => {
    const horario = hor.find((p) => p.id_horario === id);
    setEditHorario(horario || null);
  };
  //Operacion de actualizacion
  const updateHorario = (horario: any) => {
    horarioService
      .update(horario)
      .then((data) =>
        setHorario(
          hor.map((e) => (e.id_horario === horario.id_horario ? data : e))
        )
      );

    setEditHorario(null);
  };
  //Se envia los metodos dentro de la etiqueta de contexto
  return (
    <HorarioContext.Provider
      value={{
        createHorario,
        deleteHorario,
        findHorario,
        updateHorario,
        editHorario,
        hor,
        setEditHorario,
      }}
    >
      {props.children}
    </HorarioContext.Provider>
  );
  
  
};
export default HorarioContextProvider;