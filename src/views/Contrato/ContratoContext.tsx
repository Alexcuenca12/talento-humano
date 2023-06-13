
import React, { createContext, useEffect, useState } from "react";
import { ContratoService } from "../../services/ContratoService";
import { IContrato } from "../../interfaces/Primary/IContrato";
import '../../styles/Contrato.css'
//Exportaciones
interface IContratoContext {
  contrat: IContrato[];
  editContrato: IContrato | null;
  createContrato: (contrato: IContrato) => void;
  deleteContrato: (contrato: IContrato) => void;
  findContrato: (id: number) => void;
  updateContrato: (contrato: IContrato) => void;
  setEditContrato: React.Dispatch<React.SetStateAction<IContrato | null>>;
}
//Contexto exportable con las operaciones vacias
export const ContratoContext = createContext<IContratoContext>({
  contrat: [],
  editContrato: null,
  createContrato: (contrato: IContrato) => { },
  deleteContrato: (contrato: IContrato) => { },
  findContrato: (id: number) => { },
  updateContrato: (contrato: IContrato) => { },
  setEditContrato: () => { },
});

const ContratoContextProvider = (props: any) => {
  //Objeto para usar los servicios
  const contratoService = new ContratoService();
  //Lista para almacenar lao contratos
  const [contrat, setContrato] = useState<IContrato[]>([]);
  //Variable para almacenar un contrato transitorio
  const [editContrato, setEditContrato] = useState<IContrato | null>(null);
  //LLena el array de contratos cada que se refresca la pagina
  useEffect(() => {
    contratoService.getAll().then((data) => {
      setContrato(data);
    });
  }, []);

  //Operacion de creacion
  const createContrato = (contrato: any) => {
    contratoService.save(contrato).then((data) => {
      setContrato([...contrat, data]);
    });
  };
  //Operacion de eliminacion
  const deleteContrato = (id: any) => {
    contratoService
      .delete(id)
      .then(() => setContrato(contrat.filter((p) => p.id_contrato !== id)));
    setEditContrato(null);
  };
  //Operacion de busqueda
  const findContrato = (id: number) => {
    const contrato = contrat.find((p) => p.id_contrato === id);
    setEditContrato(contrato || null);
  };
  //Operacion de actualizacion
  const updateContrato = (contrato: any) => {
    contratoService
      .update(contrato)
      .then((data) =>
        setContrato(
          contrat.map((e) => (e.id_contrato === contrato.id_contrato ? data : e))
        )
      );

    setEditContrato(null);
  };
  //Se envia los metodos dentro de la etiqueta de contexto
  return (
    <ContratoContext.Provider
      value={{
        createContrato,
        deleteContrato,
        findContrato,
        updateContrato,
        editContrato,
        contrat,
        setEditContrato,
      }}
    >
      {props.children}
    </ContratoContext.Provider>
  );
  
  
};
export default ContratoContextProvider;

