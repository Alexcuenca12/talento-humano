import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ContratoContext } from "./ContratoContext";
import { InputText } from "primereact/inputtext";
import { IContrato } from "../../interfaces/Primary/IContrato";
import { Divider } from "primereact/divider";
import swal from 'sweetalert';

const ContratoForm = (props: any) => {

    const { setIsVisible } = props;
    const [confirm, setConfirm] = useState(false);
    const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
    //For the register of a contract
    const initialContratoState = {
        id_contrato: 0,
        fecha_inicio: '',
        fecha_fin: '',
        anio_duracion: "",
        horas_diarias: "",
        cargo: "",
        salario: "",
        evidencia: "nin",
        persona: {
            id_persona: 1,
            ci_pasaporte: 23423543,
            apellidos: "sfdsf",
            nombres: "sdfsdf",
            pais_nacimiento: "fgdfbc",
            edad: 22,
            genero: "sdfsdf",
            sexo: "cbvcb",
            estado_civil: "svxvxcvc",
            etnia: "xvxvc",
            tipo_sangre: "cvbcvb",
            celular: "sdfsdfsdf",
            correo: "dgdfdfg",
            correo_institucional: "dgdfgdgdfg",
            pais_residencia: "bcvbvcb",
            parroquia_recidencial: "cvbcvbvb",
            calle_principal: "sdfsf",
            calle_secundaria: "sfdsd",
            numero_casa: 452,
            sector: "cbcvb",
            referencia: "cvbcvb",
            telefono: "cbcbvcvb",
            idioma_raiz: "sfsff",
            idioma_secundario: "fsdfs",
            foto: "xcvxcv",
            discapasidad: "fgdgdfg",
            tipo_discapacidad: "cvbcvbcb",
            porcentaje_discapacidad: "cvbcvb",
            carnet_conadis: "fsdfs",
            foto_carnet: "xvxcvcx"
        }
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
                fecha_fin: editContrato.fecha_fin,
                anio_duracion: editContrato.anio_duracion,
                horas_diarias: editContrato.horas_diarias,
                cargo: editContrato.cargo,
                salario: editContrato.salario,
                evidencia: editContrato.evidencia,
                persona: editContrato.persona
            });
    }, [editContrato]);

    useEffect(() => {
        setContratoData({
            ...contratoData,
        });
    }, []);



    const saveContrato = () => {
        //console.log(contratoData);
        if (validateInputs()) {

            createContrato(contratoData);
            setContratoData(initialContratoState);
            swal({
                title: "Contrato",
                text: "Datos Guardados Correctamente",
                icon: "success"
            });
            console.log(contratoData);


        } else {
            return swal({
                title: "Contrato",
                text: "Falta completar los datos requeridos del Contrato",
                icon: "warning"
            });

        }
    };
    const _deleteContrato = () => {
        if (editContrato) {
            deleteContrato(contratoData);
            setContratoData(initialContratoState);
            setIsVisible(false);
            setConfirm(false);
            swal({
                title: "Contrato",
                text: "Error al Eliminar",
                icon: "error"
            });

        }
    };
    //If the input in the form change
    const onInputChange = (data: any, field: any) => {
        setContratoData({ ...contratoData, [field]: data });

        //console.log(contratoData);
    };
    const validateInputs = () => {
        if (
            !contratoData.fecha_inicio ||
            !contratoData.fecha_fin ||
            !contratoData.anio_duracion ||
            !contratoData.horas_diarias ||
            !contratoData.cargo ||
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
            <div>
                <h1 className="font-bold text-xl text-center" >CONTRATO</h1>
                <Divider />
            </div >
            <div className="div">
                <div className="divisor">
                    <div className="bg-slate-300 max-w-2xl rounded-e-lg selection:p-1  mx-50 mt-10">
                        <div className="input-container">
                            <div className="p-inputgroup">
                                <span className="p-float-label card flex justify-content-center">
                                    <InputText
                                        className="ingreso"
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

                    </div>
                    <div className="pdf">
                        <p>
                            Sube un archivo:
                            <br />
                            <input type="file" name="evidencia" accept="application/pdf, .doc, .docx, .odf" 
                            required/>
                            
    
                        </p>
                    </div>
                </div>
                <br/>


                <div className="input-container2">
                    <Button
                        label="Continuar ➠"
                        icon="pi pi-check"
                        onClick={saveContrato}
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

export default ContratoForm;