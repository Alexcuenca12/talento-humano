import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Instruc_FormalService } from "../../services/Instru_FormalService";
import { InstruccionFormalData } from "../../interfaces/Primary/IInstrucc_Formal";
import { Fieldset } from "primereact/fieldset";
import cardHeader from "../../shared/CardHeader";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFormik } from 'formik';
import { Calendar } from "primereact/calendar";

import "../../styles/Instruc_Formal.css";

function Instruc_Formal() {
  const [editMode, setEditMode] = useState(false);
  const [instruc1, setInstruc1] = useState<InstruccionFormalData[]>([]);
  const formik = useFormik<InstruccionFormalData>({
    initialValues: {
      id_instruccion: 0,
      nivelInstruccion: "",
      institucionEducativa: "",
      tituloObtenido: "",
      num_SenecytRegistro: "",
      tiempoEstudio: 0,
      anioGraduacion: 0,
      areaEstudios: "",
      titulo: "",
    },
    onSubmit: (values) => {
      if (editMode) {
        instrucService
          .update(Number(editItemId), values)
          .then((response) => {
            setInstruc1((prevData) =>
              prevData.map((instruc) =>
                instruc.id_instruccion === values.id_instruccion
                  ? response
                  : instruc
              )
            );
            formik.resetForm();
            setEditMode(false);
          })
          .catch((error) => {
            console.error("Error al actualizar el formulario:", error);
          });
      } else {
        instrucService
          .save(values)
          .then((response) => {
            setInstruc1((prevData) => [...prevData, response]);
            formik.resetForm();
          })
          .catch((error) => {
            console.error("Error al enviar el formulario:", error);
          });
      }
    },
    validate: (values) => {
      let errors: any = {};

      if (!values.nivelInstruccion) {
        errors.nivelInstruccion = "Obligatorio";
      }
      if (!values.institucionEducativa) {
        errors.institucionEducativa = "Obligatorio";
      }
      if (!values.tituloObtenido) {
        errors.tituloObtenido = "Obligatorio";
      }
      
      if (!values.tiempoEstudio || values.tiempoEstudio < 0) {
        errors.tiempoEstudio = "Obligatorio";
      }
     
     

    

      return errors;
    },
  });

  
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const instrucService = new Instruc_FormalService();

  useEffect(() => {
    instrucService
      .getAll()
      .then((data) => {
        setInstruc1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = instruc1.find(
        (instruc) => instruc.id_instruccion === id
      );
      if (editItem) {
        formik.setValues(editItem); // Establece los valores en el formulario
        setEditMode(true);
        setEditItemId(id);
      }
    }
  };
  

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      instrucService
        .delete(id)
        .then(() => {
          setInstruc1(
            instruc1.filter((instruc) => instruc.id_instruccion !== id)
          );
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };

  
  const handleCancel = () => {
    formik.resetForm({ values: formik.initialValues });
    setEditMode(false);
    setEditItemId(undefined);
  };
 



  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3"
      >
        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2">
              Instrucción Formal
            </h1>
          </Divider>
        </div>

        <div className="flex justify-content-center flex-wrap">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap flex-row align-content-center">
              <div className="flex align-items-center justify-content-center">
                <div className="flex flex-column">
                  <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        htmlFor="firstName"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Nivel de Instruccion:
                      </label>
                      <InputText
                        className="w-full min-w-min text-2xl"
                        id="firstName"
                        name="nivelInstruccion"
                        value={formik.values.nivelInstruccion}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.nivelInstruccion &&
                        formik.errors.nivelInstruccion && (
                          <small className="p-error">
                            {formik.errors.nivelInstruccion}
                          </small>
                        )}
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        htmlFor="lastName"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Titulo Obtenido:
                      </label>
                      <InputText
                        className="w-auto min-w-min text-2xl"
                        id="lastName"
                        name="tituloObtenido"
                        value={formik.values.tituloObtenido}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.tituloObtenido &&
                        formik.errors.tituloObtenido && (
                          <small className="p-error">
                            {formik.errors.tituloObtenido}
                          </small>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap w-full h-full  justify-content-between pt-5">
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        htmlFor="firstName"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Institucion Educativa:
                      </label>
                      <InputText
                        className="w-full min-w-min text-2xl"
                        id="firstName"
                        
                        name="institucionEducativa"
                        type="text"
                        value={formik.values.institucionEducativa}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.institucionEducativa &&
                        formik.errors.institucionEducativa && (
                          <small className="p-error">
                            {formik.errors.institucionEducativa}
                          </small>
                        )}
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        htmlFor="lastName"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Tiempo de estudio:
                      </label>
                      <InputText
                        className="w-auto min-w-min text-2xl"
                        id="lastName"
                        type="number"
                        name="tiempoEstudio"
                        value={formik.values.tiempoEstudio + ""}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.tiempoEstudio &&
                        formik.errors.tiempoEstudio && (
                          <small className="p-error">
                            {formik.errors.tiempoEstudio + ""}
                          </small>
                        )}
                      
                    </div>
                  </div>
                  <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        className="w-full text-3xl min-w-min "
                        rounded
                        type="submit"
                        label={editMode ? "Actualizar" : "Submit"}
                        disabled={formik.isSubmitting}
                      />
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        className="w-full text-3xl min-w-min"
                        rounded
                        type="button"
                        label="Cancel"
                        onClick={handleCancel}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <DataTable
          tableStyle={{ minWidth: "50rem" }}
          className="mt-5 w-full h-full text-3xl font-medium"
          value={instruc1}
        >
          <Column
            field="nivelInstruccion"
            header="Nivel de Institución"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
          ></Column>
          <Column
            field="institucionEducativa"
            header="Institución Educativa"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
          ></Column>
          <Column
            field="tituloObtenido"
            header="Título Obtenido"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
          ></Column>
          <Column
            field="tiempoEstudio"
            header="Tiempo de Estudio"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
          ></Column>
          <Column
            field="Valores"
            header="ACIONES"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            body={(rowData) => (
              <div>
                <button
                  className="mr-3"
                  onClick={() => handleEdit(rowData.id_instruccion?.valueOf())}
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    handleDelete(rowData.id_instruccion?.valueOf())
                  }
                >
                  Eliminar
                </button>
              </div>
            )}
          ></Column>
        </DataTable>
      </Card>
    </Fieldset>
  );
}

export default Instruc_Formal;
