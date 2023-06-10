
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import ContratoForm from "./ContratoForm";
import { ContratoContext } from "./ContratoContext";

export const ContratoList = () => {
  //Codigo para llenar la tabla segun un array
  const { findContrato, contrat } = useContext(ContratoContext);

  const [seleccion, setSeleccion] = useState();

  //Para el dialog de la creacion de contratos
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);

  const saveContrato = (id: any) => {
    findContrato(id);
    setIsVisible(true);
  };
  const newContrato = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">CONTRATO</span>
      <Divider />
      <div
        id="busqueda"
        style={{
          alignItems: "center",
          paddingLeft: "75px",
          paddingRight: "75px",
        }}
      >
        <Button
          style={{
            margin: "0 auto",
            textAlign: "center",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            background: "black",
          }}
          onClick={newContrato}
        >
          New Contrato
        </Button>
      </div>
    </div>
  );

  //HTML
  return (
    <>
      <div>
        <Toast ref={toast} />
        {/* table de contratos de cada persona*/}
        <div className="linea">
          <Card className="table">
            {/* tabla contratos */}
            <DataTable
              header={header}
              value={contrat}
              responsiveLayout="scroll"
              style={{
                textAlign: "center",
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
              selectionMode="single"
              onSelectionChange={(e: any) => saveContrato(e.value.id_contrato)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_contrato" header="ID"></Column>
              <Column field="fecha_inicio" header="fecha inicio"></Column>
              <Column field="fecha_fin" header="fecha fin"></Column>
              <Column field="anio_duracion" header="años de duracion"></Column>
              <Column field="horas_diarias" header="horas diarias"></Column>
              <Column field="cargo" header="cargo"></Column>
              <Column field="salario" header="Salario"></Column>
            </DataTable>
            <br />
            <Divider />
          </Card>
        </div>
      </div>
      <ContratoForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
      />
    </>
  );
};
export default ContratoList;