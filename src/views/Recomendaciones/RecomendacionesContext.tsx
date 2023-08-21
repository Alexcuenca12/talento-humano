import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "../../styles/Recomendaciones.css";
import { IRecomendaciones } from "../../interfaces/Primary/Recomendaciones";
import { RecomendacionesService } from "../../services/RecomendacionesService";
import { log } from "console";
import { useFormik } from "formik";

import "../../styles/Recomendaciones.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import swal from "sweetalert";

function Recomendaciones() {
  const recoService = new RecomendacionesService();
  const [evidencia, setevidencia] = useState<Uint8Array | null>(null);
  const [reco1, setReco1] = useState<IRecomendaciones[]>([]);
  const formik = useFormik<IRecomendaciones>({
    initialValues: {
      id_recomendaciones: 0,
      primer_nombre: "",
      primer_apellido: "",
      segundo_nombre: "",
      segundo_apellido: "",
      correo: "",
      documentoRecomendacion: "",
    },
    onSubmit: (values) => {
      if (editMode) {
        recoService
          .update(Number(editItemId), values)
          .then((response) => {
            setReco1((prevData) =>
              prevData.map((reco) =>
                reco.id_recomendaciones === values.id_recomendaciones
                  ? response
                  : reco
              )
            );

            formik.resetForm();
            setEditMode(false);
            swal('RECOMENDACIONES', 'Datos Actualizados Correctamente', 'success');
          })
          .catch((error) => {
            console.error("Error al actualizar el formulario:", error);
          });
      } else {
        recoService
          .save(values)
          .then((response) => {
            setReco1((prevData) => [...prevData, response]);
            formik.resetForm();
            swal('RECOMENDACIONES', 'Datos Guardados Correctamente', 'success');
          })
          .catch((error) => {
            console.error("Error al enviar el formulario:", error);
          });
      }
    },
    validate: (values) => {
      let errors: any = {};

      if (!values.primer_nombre) {
        errors.primer_nombre = "Obligatorio";
      }
      if (!values.primer_apellido) {
        errors.primer_apellido = "Obligatorio";
      }
      if (!values.correo) {
        errors.correo = "Obligatorio";
      }

      if (!values.documentoRecomendacion) {
        errors.documentoRecomendacion = "Obligatorio";
      }

      return errors;
    },
  });
  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = reco1.find(
        (reco) => reco.id_recomendaciones === id
      );
      if (editItem) {
        formik.setValues(editItem); // Establece los valores en el formulario
        setEditMode(true);
        setEditItemId(id);
      }
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const fileUploadRef = useRef<FileUpload>(null);
  const [pdfFile, setPdfFile] = useState<{ documentoRecomendacion: string } | null>(null);
  const recomendacionesService = new RecomendacionesService();
  useEffect(() => {
    recoService
      .getAll()
      .then((data) => {
        setReco1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);
  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      recomendacionesService
        .delete(id)
        .then(() => {
          setReco1(reco1.filter((reco) => reco.id_recomendaciones !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };
  const customBytesUploader = (event: FileUploadSelectEvent) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64data = reader.result as string;
        formik.setFieldValue("documentoRecomendacion", base64data); // Update the 'titulo' field value in Formik state
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
  const handleCancel = () => {
    formik.resetForm({ values: formik.initialValues });
    setEditMode(false);
    setEditItemId(undefined);
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
    <div>
      <Fieldset className="fgrid col-fixed">
        <Card
          header={cardHeader}
          className="border-solid border-blue-800 border-3"
        >
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2">
              Recomendaciones Personales
            </h1>
          </Divider>

          <div className="flex justify-content-between flex-wrap">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap flex-row justify-content-center">
                <div className="flex align-items-center justify-content-center">
                  <div className="flex flex-column justify-content-center ml-6 ">
                    <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label
                          htmlFor="nombres"
                          className="text-3xl font-medium w-auto min-w-min"
                        >
                          Nombres:
                        </label>
                        <InputText
                          id="nombres"
                          className="w-full min-w-min text-2xl"
                          name="primer_nombre"
                        value={formik.values.primer_nombre}
                        onChange={formik.handleChange}
                        />
                        {formik.touched.primer_nombre &&
                        formik.errors.primer_nombre && (
                          <small className="p-error">
                            {formik.errors.primer_nombre}
                          </small>
                        )}
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label
                          htmlFor="apellidos"
                          className="text-3xl font-medium w-auto min-w-min"

                        >
                          Apellidos:
                        </label>
                        <InputText
                          id="apellidos"
                          className="w-full min-w-min text-2xl"
                          name="primer_apellido"
                        value={formik.values.primer_apellido}
                        onChange={formik.handleChange}
                        />
                        {formik.touched.primer_apellido &&
                        formik.errors.primer_apellido && (
                          <small className="p-error">
                            {formik.errors.primer_apellido}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap w-full h-full  justify-content-center  flex-grow-1 mt-5">
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label
                          htmlFor="job"
                          className="text-3xl font-medium w-full  min-w-min"
                        >
                          Email:
                        </label>
                        <InputText
                          id="job"
                          className="w-auto min-w-min text-2xl"
                          type="email"
                          name="correo"
                        value={formik.values.correo}
                        onChange={formik.handleChange}

                        />
                        {formik.touched.correo &&
                        formik.errors.correo && (
                          <small className="p-error">
                            {formik.errors.correo}
                          </small>
                        )}
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label
                          htmlFor="telefono"
                          className="text-3xl font-medium w-auto min-w-min"
                        >
                          Telefono:
                        </label>
                        <InputNumber
                          id="telefono"
                          className="w-full min-w-min text-2xl"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                      <div className="flex align-items-center justify-content-center w-auto min-w-min">
                        <Button
                          type="submit"                          
                          className="w-full text-3xl min-w-min "
                          rounded
                          label={editMode ? "Actualizar" : "Agregar"}
                          disabled={formik.isSubmitting}
                        />
                        
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto min-w-min">
                        <Button
                          type="button"
                          label="Cancel"
                          className="w-full text-3xl min-w-min"
                          rounded
                          onClick={handleCancel}
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
                    <p>{pdfFile.documentoRecomendacion}</p>
                  </div>
                )}
                {formik.touched.documentoRecomendacion && formik.errors.documentoRecomendacion && (
                  <small className="p-error">{formik.errors.documentoRecomendacion}</small>
                )}
              </div>
              </div>
            </form>
          </div>

          <DataTable
            tableStyle={{ minWidth: "50rem" }}
            className="mt-5  w-full h-full text-3xl font-medium"
            value={reco1}          >
            <Column
              field="primer_nombre"
              header="Recomendaciones Personales"
              headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            ></Column>
            <Column
              field="Acciones"
              header="Acciones"
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
                  onClick={() => handleEdit(rowData.id_recomendaciones?.valueOf())}
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    handleDelete(rowData.id_recomendaciones?.valueOf())
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
                {rowData.documentoRecomendacion ? (
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
                    onClick={() => decodeBase64(rowData.documentoRecomendacion)}
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
    </div>
  );
}

export default Recomendaciones;
