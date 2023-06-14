import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { HorarioContext } from "./HorarioContext";
import { InputText } from "primereact/inputtext";
import { IHorario } from "../../interfaces/Primary/IHorario";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import swal from 'sweetalert';
const HorarioForm = (props: any) => {

    const toast = useRef(null);
    const { findHorario, hor } = useContext(HorarioContext);
    const saveHorari = (id: any) => {
        findHorario(id);
        setIsVisible(true);
    };
    const [seleccion, setSeleccion] = useState();


    const { setIsVisible, isVisible } = props;
    const [confirm, setConfirm] = useState(false);
    const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
    //For the register of a contract
    const initialHorarioState = {
        id_horario: 0,
        periodo: "",
        horario: "",
        dias: "",
        distributivo: "",
        //periodoAc: [],
        //persona: []
    };
    const [horarioData, setHorarioData] = useState<IHorario>(initialHorarioState);
    const {
        createHorario,
        deleteHorario,
        updateHorario,
        editHorario,
        setEditHorario,
    } = useContext(HorarioContext);

    useEffect(() => {
        if (editHorario)
            setHorarioData({
                id_horario: editHorario.id_horario,
                periodo: editHorario.periodo,
                horario: editHorario.horario,
                dias: editHorario.dias,
                distributivo: editHorario.distributivo
            });
    }, [editHorario]);

    useEffect(() => {
        setHorarioData({
            ...horarioData,
        });
    }, []);



    const saveHorario = () => {
        //console.log(HorarioData);
        if (validateInputs()) {

            createHorario(horarioData);
            setHorarioData(initialHorarioState);
            swal({
                title: "Horario",
                text: "Datos Guardados Correctamente",
                icon: "success"
            });


        } else {
            return swal({
                title: "Horario",
                text: "Falta completar los datos requeridos del Horario",
                icon: "warning"
            });

        }
    };
    const _deleteHorario = () => {
        if (editHorario) {
            deleteHorario(horarioData);
            setHorarioData(initialHorarioState);
            setIsVisible(false);
            setConfirm(false);
            swal({
                title: "Horario",
                text: "Error al Eliminar",
                icon: "error"
            });

        }
    };
    //If the input in the form change
    const onInputChange = (data: any, field: any) => {
        setHorarioData({ ...horarioData, [field]: data });

        //console.log(HorarioData);
    };
    const validateInputs = () => {
        if (
            !horarioData.periodo ||
            !horarioData.horario ||
            !horarioData.dias ||
            !horarioData.distributivo
        ) {
            setRequiredFieldsEmpty(true);
            return false;
        }
        return true;
    };

    return (
        <>
            {/* Dialogo para la creacion de una Horario*/}
            <div>
                <h1 className="font-bold text-xl text-center" style={{marginTop:"5px"}} >Horario</h1>
                <Divider />
            </div >
            <div className="div">
                <div className="div2">
                    <div className="contenedor">
                        <div className="escrito">
                            <div className="input-container">
                                <div className="p-inputgroup">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText

                                            id="periodo"
                                            name="periodo"
                                            value={horarioData.periodo}
                                            onChange={(e) => onInputChange(e.target.value, "periodo")}
                                        />
                                        <label htmlFor="periodo">PERIODO</label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="p-inputgroup">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText

                                            id="horario"
                                            name="horario"
                                            value={horarioData.horario}
                                            onChange={(e) => onInputChange(e.target.value, "horario")}
                                        />
                                        <label htmlFor="horario">HORARIO</label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="p-inputgroup">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText

                                            id="dias"
                                            name="dias"
                                            value={horarioData.dias}
                                            onChange={(e) => onInputChange(e.target.value, "dias")}
                                        />
                                        <label htmlFor="dias">DIAS</label>
                                    </span>
                                </div>
                            </div>

                            <div className="input-container">
                                <div className="p-inputgroup">
                                    <span className="p-float-label card flex justify-content-center">
                                        <InputText

                                            id="distributivo"
                                            name="distributivo"
                                            value={horarioData.distributivo}
                                            onChange={(e) => onInputChange(e.target.value, "distributivo")}
                                        />
                                        <label htmlFor="distributivo">DISTRIBUTIVO</label>
                                    </span>
                                </div>
                            </div>

                        </div>


                        <div className="tabla">
                            <Toast ref={toast} />
                            {/* table de contratos de cada persona*/}
                            <div className="linea">
                                <Card className="table">
                                    {/* tabla contratos */}
                                    <DataTable
                                        value={hor}
                                        responsiveLayout="scroll"
                                        style={{
                                            textAlign: "center",
                                            fontFamily:
                                                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                        }}
                                        selectionMode="single"
                                        onSelectionChange={(e: any) => saveHorari(e.value.id_horario)}
                                        paginator
                                        rows={5}
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                    >
                                        <Column field="id_horario" header="ID"></Column>
                                        <Column field="periodo" header="periodo"></Column>
                                        <Column field="horario" header="horario"></Column>
                                        <Column field="dias" header="dias"></Column>
                                        <Column field="distributivo" header="distributivo"></Column>

                                    </DataTable>
                                    <br />
                                </Card>
                            </div>
                            <br />

                        </div>


                    </div>
                    <Button
                        className="boton"
                        label="Guardar"
                        icon="pi pi-check"
                        onClick={saveHorario}
                        autoFocus
                        style={{
                            fontFamily:
                                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                            background: "black ",
                        }}
                    />

                </div>




                <div>

                </div>
                <div className="input-container2">
                    <Button
                        label="Continuar ➠"
                        icon="pi pi-check"
                        onClick={saveHorario}
                        autoFocus
                        style={{
                            fontFamily:
                                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                            background: "black ",
                        }}
                    />
                </div>
            </div>




        </>
    );
};

export default HorarioForm;