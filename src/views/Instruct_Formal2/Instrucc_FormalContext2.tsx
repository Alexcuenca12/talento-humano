import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

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
import { Calendar } from "primereact/calendar";

import "../../styles/Instruc_Formal.css";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";

function Instruc_Formal() {
  const [instruc2, setInstruc2] = useState<InstruccionFormalData[]>([]);
 

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
            setInstruc2((prevData) =>
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
            setInstruc2((prevData) => [...prevData, response]);
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
      if (!values.num_SenecytRegistro) {
        errors.num_SenecytRegistro = "Obligatorio";
      }
      if (!values.tiempoEstudio || values.tiempoEstudio < 0) {
        errors.tiempoEstudio = "Obligatorio";
      }
      if (!values.anioGraduacion || values.anioGraduacion < 0) {
        errors.anioGraduacion = "Obligatorio";
      }
      if (!values.areaEstudios) {
        errors.areaEstudios = "Obligatorio";
      }

      if (!values.titulo) {
        errors.titulo = "Obligatorio";
      }

      return errors;
    },
  });

  const fileUploadRef = useRef<FileUpload>(null);
  const [pdfFile, setPdfFile] = useState<{ titulo: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const instrucService = new Instruc_FormalService();

  useEffect(() => {
    instrucService
      .getAll()
      .then((data) => {
        setInstruc2(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      instrucService
        .delete(id)
        .then(() => {
          setInstruc2(
            instruc2.filter((instruc2) => instruc2.id_instruccion !== id)
          );
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };
  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = instruc2.find(
        (instruc) => instruc.id_instruccion === id
      );
      if (editItem) {
        formik.setValues(editItem); // Establece los valores en el formulario
        setEditMode(true);
        setEditItemId(id);
      }
    }
  };

  const customBytesUploader = (event: FileUploadSelectEvent) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64data = reader.result as string;
        formik.setFieldValue("titulo", base64data); // Update the 'titulo' field value in Formik state
        console.log("pdf guardado....");
      };

      reader.onerror = (error) => {
        console.error("Error al leer el archivo:", error);
      };

      reader.readAsDataURL(file);

      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
    }
  };
  const decodeBase64 = (base64Data: string) => {
    try {
      // Eliminar encabezados o metadatos de la cadena base64
      const base64WithoutHeader = base64Data.replace(/^data:.*,/, "");

      const decodedData = atob(base64WithoutHeader); // Decodificar la cadena base64
      const byteCharacters = new Uint8Array(decodedData.length);

      for (let i = 0; i < decodedData.length; i++) {
        byteCharacters[i] = decodedData.charCodeAt(i);
      }

      const byteArray = new Blob([byteCharacters], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(byteArray);

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "archivo.pdf";
      link.click();
      console.log("pdf descargado...");

      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error al decodificar la cadena base64:", error);
    }
  };

  return (
    <Fieldset className="flex flex-wrap align-items-center justify-content-center flex-colum flex-row max-w-full max-h-full">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap"
      >
        <div className="h1-rem">
          <Divider align="center" className="flex flex-wrap">
            <h1 className="text-7xl font-smibold lg:md-2  w-full h-full max-w-full max-h-full min-w-min">
              Instrucción Formal
            </h1>
          </Divider>
        </div>

        <div className="flex justify-content-between flex-wrap">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap flex-row">
              <div className="flex align-items-center justify-content-center">
                <div className="flex flex-column">
                  <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        htmlFor="firstName"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Nivel de Institución:
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

                    <div className="flex align-items-center justify-content-center w-auto pr-2 ">
                      <label
                        htmlFor="tEstudio"
                        className="text-3xl font-medium w-full  min-w-min"
                      >
                        Tiempo de Estudio:
                      </label>
                      <InputText
                      type="number"
                        className="w-auto min-w-min text-2xl"
                        id="lastName"
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

                  <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1 ">
                    <div className="flex align-items-center justify-content-center w-auto h-5rem ">
                      <label
                        htmlFor="institucionEducativa"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Institucion Educativa:
                      </label>
                      <InputText
                        className="w-full text-2xl"
                        id="phone"
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
                    <div className="flex align-items-center justify-content-center w-auto h-6rem">
                      <label
                        htmlFor="Registro"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Registro Senecyt:
                      </label>
                      <InputText
                        className="w-full text-2xl"
                        id="Registro"
                        name="num_SenecytRegistro"
                        type="text"
                        value={formik.values.num_SenecytRegistro}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.num_SenecytRegistro &&
                        formik.errors.num_SenecytRegistro && (
                          <small className="p-error">
                            {formik.errors.num_SenecytRegistro}
                          </small>
                        )}
                    </div>

                    <div className="flex align-items-center justify-content-center w-auto h-6rem">
                      <label
                        htmlFor="anioEg"
                        className="text-3xl font-medium w-full min-w-min"
                      >
                        Año de Egreso:
                      </label>
                      <InputText
                        className="w-auto min-w-min text-2xl"
                        id="lastName"
                        type="number"
                        name="anioGraduacion"
                        value={formik.values.anioGraduacion + ""}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.anioGraduacion &&
                        formik.errors.anioGraduacion && (
                          <small className="p-error">
                            {formik.errors.anioGraduacion + ""}
                          </small>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1  row-gap-8 gap-10 flex-wrap">
                    <div className="flex align-items-center justify-content-center w-auto">
                      <label
                        htmlFor="phone"
                        className="text-3xl font-medium w-auto min-w-min"
                      >
                        Area de Estudio:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="phone"
                        name="areaEstudios"
                        value={formik.values.areaEstudios}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.areaEstudios &&
                        formik.errors.areaEstudios && (
                          <small className="p-error">
                            {formik.errors.areaEstudios}
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
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex align-items-center justify-content-center w-auto pr-2">
                  <label
                    htmlFor="pdf"
                    className="text-3xl font-medium w-full min-w-min"
                  >
                    Titulo:
                  </label>
                  <FileUpload
                    ref={fileUploadRef}
                    name="pdf"
                    chooseLabel="Escoger"
                    uploadLabel="Cargar"
                    cancelLabel="Cancelar"
                    emptyTemplate={
                      <p className="m-0 p-button-rounded">
                        Arrastre y suelte los archivos aquí para cargarlos.
                      </p>
                    }
                    customUpload
                    onSelect={customBytesUploader}
                    accept="application/pdf"
                  />
                </div>
                {pdfFile && (
                  <div className="mt-2">
                    <p className="text-3xl font-medium">
                      Archivo seleccionado:
                    </p>
                    <p>{pdfFile.titulo}</p>
                  </div>
                )}
                {formik.touched.titulo && formik.errors.titulo && (
                  <small className="p-error">{formik.errors.titulo}</small>
                )}
              </div>
            </div>
          </form>
        </div>

        <DataTable
          tableStyle={{ minWidth: "50rem" }}
          className="mt-5  w-full h-full text-3xl font-medium"
          value={instruc2}
        >
          <Column
            field="nivelInstruccion"
            header="Nivel de Instruccion"
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
            field="num_SenecytRegistro"
            header="Registro Senecyt"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
          ></Column>
          <Column
            field="Acciones"
            header="Acciones"
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

          <Column
            field="titulo"
            header="titulo"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            body={(rowData) => (
              <div>
                {rowData.titulo ? (
                  <Button
                    type="button"
                    className="button-contrato"
                    label="Descargar PDF"
                    style={{
                      background: "#009688",
                      borderRadius: "10%",
                      fontSize: "12px",
                      color: "black",
                      justifyContent: "center",
                    }}
                    onClick={() => decodeBase64(rowData.titulo)}
                  />
                ) : (
                  <span>Archivo no econtrado</span>
                )}
              </div>
            )}
          ></Column>
        </DataTable>
      </Card>
    </Fieldset>
  );
}

export default Instruc_Formal;
