import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ContratoContext } from "./ContratoContext";
import { InputText } from "primereact/inputtext";
import { IContrato } from "../../interfaces/Primary/IContrato";

const ContratoForm = (props: any) => {

  const { isVisible, setIsVisible, toast } = props;
  const [confirm, setConfirm] = useState(false);
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
  //For the register of a contract
  const initialContratoState = {
    id_contrato: 0,
    fecha_inicio:"",
    fecha_fin: "",
    anio_duracion: "",
    horas_diarias:"",
    cargo: "",
    salario: "",
    evidencia: "ning",
    persona: [1],
  };
  const [contratoData, setContratoData] = useState<IContrato>(initialContratoState);
  const {
    createContrato,
    deleteContrato,
    updateContrato,
    editContrato,
    setEditContrato,
  } = useContext(ContratoContext);

  useEffect(() => {
    if (editContrato)
      setContratoData({
        id_contrato: editContrato.id_contrato,
        fecha_inicio: editContrato.fecha_inicio,
        fecha_fin:editContrato.fecha_fin,
        anio_duracion: editContrato.anio_duracion,
        horas_diarias:editContrato.horas_diarias,
        cargo: editContrato.cargo,
        salario: editContrato.salario,
        evidencia:editContrato.evidencia,
        persona: editContrato.persona
      });
  }, [editContrato]);

  useEffect(() => {
    setContratoData({
      ...contratoData,
    });
  }, []);

  const saveContrato = () => {
    console.log(contratoData);
    if (validateInputs()) {
      if (!editContrato) {
        createContrato(contratoData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      } else {
        updateContrato(contratoData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      }
      setContratoData(initialContratoState);
      setIsVisible(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Form error",
        detail: "Complete all fields",
      });
    }
  };
  const _deleteContrato = () => {
    if (editContrato) {
      deleteContrato(contratoData);
      setContratoData(initialContratoState);
      setIsVisible(false);
      setConfirm(false);
      toast.current.show({
        severity: "error",
        summary: "Deleted",
        detail: "Deleted data",
      });
    }
  };
  //If the input in the form change
  const onInputChange = (data: any, field: any) => {
    setContratoData({ ...contratoData, [field]: data });

    console.log(contratoData);
  };
  const validateInputs = () => {
    if (
      !contratoData.fecha_inicio ||
      !contratoData.fecha_fin||
      !contratoData.anio_duracion ||
      !contratoData.horas_diarias ||
      !contratoData.cargo||
      !contratoData.salario
      //!contratoData.evidencia ||
      //!contratoData.persona
    ) {
      setRequiredFieldsEmpty(true);
      return false;
    }
    return true;
  };

  return (
    <>
      {/* Dialogo para la creacion de una contrato*/}
      <Dialog
        className="DialogoCentrado"
        header="NEW CONTRATO"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setEditContrato(null);
          setContratoData(initialContratoState);
        }}
        style={{
          width: "800px",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="fecha_inicio"
                  name="fecha_inicio"
                  value={contratoData.fecha_inicio}
                  onChange={(e) => onInputChange(e.target.value, "fecha_inicio")}
                />
                <label htmlFor="fecha_inicio">FECHA INICIO</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="fecha_fin"
                  name="fecha_fin"
                  value={contratoData.fecha_fin}
                  onChange={(e) => onInputChange(e.target.value, "fecha_fin")}
                />
                <label htmlFor="fecha_fin">FECHA FIN</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="anio_duracion"
                  name="anio_duracion"
                  value={contratoData.anio_duracion}
                  onChange={(e) => onInputChange(e.target.value, "anio_duracion")}
                />
                <label htmlFor="anio_duracion">AÑOS DE DURACION</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="horas_diarias"
                  name="horas_diarias"
                  value={contratoData.horas_diarias}
                  onChange={(e) => onInputChange(e.target.value, "horas_diarias")}
                />
                <label htmlFor="horas_diarias">HORAS DIARIAS</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="cargo"
                  name="cargo"
                  value={contratoData.cargo}
                  onChange={(e) => onInputChange(e.target.value, "cargo")}
                />
                <label htmlFor="cargo">CARGO</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="salario"
                  name="salario"
                  value={contratoData.salario}
                  onChange={(e) => onInputChange(e.target.value, "salario")}
                />
                <label htmlFor="salario">SALARIO</label>
              </span>
            </div>
          </div>

        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={saveContrato}
            autoFocus
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "black ",
            }}
          />
          <Button
            label="Delete"
            icon="pi pi-times"
            onClick={() => {
              if (editContrato) setConfirm(true);
            }}
            className="p-button-text"
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "#8C0F29",
              color: "white",
              marginLeft: "5px",
              borderColor: "black",
            }}
          />
        </div>
      </Dialog>

      {/* Dialogo de eliminacion */}
      <Dialog
        header="Do you want to delete this record?"
        visible={confirm}
        style={{ width: "30vw" }}
        onHide={() => setConfirm(false)}
      >
        <div className="input-container2">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => {
              setConfirm(false);
            }}
            className="p-button-text"
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            onClick={_deleteContrato}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};

export default ContratoForm;