import "../../styles/CargaFamiliar.css";
import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../styles/CargaFamiliar.css";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import { CargaFamiliarService } from "../../services/CargaFamiliarService";
import { ICargaFamiliar } from "../../interfaces/Primary/ICargaFamiliar";
import { fileConverter } from "../../services/functions/fileConverter";
import ToastMessage from "../../shared/ToastMessage";
import { IMessage } from "../../interfaces/Secondary/IMessage";
import { useFormik } from "formik";
import { ICapacitaciones } from "../../interfaces/Primary/ICapacitaciones";

const apiService = new CargaFamiliarService();

const Persona = () => {
  const [items, setItems] = useState<ICargaFamiliar[]>([]);
  const [selectedItem, setSelectedItem] = useState<ICargaFamiliar | null>(null);
  const [message, setMessage] = useState<IMessage | null>(null);

  const fileUploadRef = useRef<FileUpload>(null);

  useEffect(() => {
    fetchCargaFamiliar();
  }, []);

  const fetchCargaFamiliar = () => {
    new CargaFamiliarService()
      .getAll()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          severity: "error",
          summary: "Error",
          detail: error.message,
        });
      });
  };
  const cargaBodyTemplate = (cargaFamiliarObj: ICargaFamiliar) => {
    return (
      <div className="flex">
        <div className="mr-4">
          <h2 className="text-3xl">Cedula: </h2>
          <p className="text-2xl">{cargaFamiliarObj.cedula}</p>
        </div>
        <div className="mr-4">
          <h2 className="text-3xl">Nombre: </h2>
          <p className="text-2xl">{cargaFamiliarObj.nombre_pariente}</p>
        </div>
        <div className="mr-4 ">
          <h2 className="text-3xl">Apellido: </h2>
          <p className="text-2xl">{cargaFamiliarObj.apellido_pariente}</p>
        </div>
        <div className=" ">
          <h2 className="text-3xl">Fecha de Nacimiento: </h2>
          <p className="text-2xl">
            {String(cargaFamiliarObj.fecha_nacimiento)}
          </p>
        </div>
      </div>
    );
  };

  // * formik implementation
  const formik = useFormik<ICargaFamiliar>({
    initialValues: {
      cedula: "",
      nombre_pariente: "",
      apellido_pariente: "",
      fecha_nacimiento: null,
      evidencia: null,
      persona: null,
    },
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
      formik.resetForm();
    },
    validate: (values) => {
      let errors: any = {};

      if (!values.cedula) {
        errors.cedula = "Cedula es requerida";
      }
      if (!values.nombre_pariente) {
        errors.nombre_pariente = "Nombre del pareinte es requerido";
      }
      if (!values.apellido_pariente) {
        errors.apellido_pariente = "Apellido del pariente es requerida";
      }
      if (!values.fecha_nacimiento) {
        errors.fecha_nacimiento = "Fecha de nacimiento es requerida";
      }
      if (!values.evidencia) {
        errors.evidencia = "Evidencia es requerida";
      }

      return errors;
    },
  });

  const handleSelectedRow = (rowData: ICargaFamiliar | null) => {
    setSelectedItem(rowData);
    if (rowData) {
      const fechaNacimiento = rowData.fecha_nacimiento
        ? new Date(rowData.fecha_nacimiento)
        : null;
      formik.setValues({
        ...rowData,
        fecha_nacimiento: fechaNacimiento,
      });
    } else {
      formik.resetForm(); // Restablecer el formulario cuando no hay una fila seleccionada
    }
  };

  const handleSubmit = async (data: ICargaFamiliar) => {
    if (selectedItem) {
      // update an existing item
      await apiService
        .updateCarga(selectedItem.id_cargaFamiliar!, data)
        .then((response) => {
          console.log(response);
          setMessage({ severity: "success", detail: "Registro actualizado" });
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
        });
      setSelectedItem(null);
    } else {
      // create new item
      await apiService
        .saveCarga(data)
        .then((response) => {
          console.log(response);
          setMessage({ severity: "success", detail: "Registro creado" });
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
        });
    }
    fetchCargaFamiliar();
  };

  const handleDeleteItem = (rowData: ICargaFamiliar) => {
    apiService
      .deleteCarga(rowData.id_cargaFamiliar!)
      .then(() => {
        console.log("Eliminado");
        setMessage({
          severity: "info",
          detail: "Registro Eliminado",
        });
        fetchCargaFamiliar();
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          severity: "error",
          summary: "Error",
          detail: error.message,
        });
      });
  };

  //Carga PDF
  const customBytesUploader = async (event: FileUploadHandlerEvent) => {
    // convert file to base64 encoded
    fileConverter(event.files[0])
      .then((data) => {
        formik.setFieldValue("evidencia", data);
        setMessage({ severity: "info", detail: "Archivo Cargado" });
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          severity: "error",
          summary: "Error",
          detail: error.message,
        });
      });

    if (fileUploadRef.current) {
      // clean the file uploaded
      fileUploadRef.current.clear();
    }
  };

  const handleDownloadPDF = (rowData: ICargaFamiliar) => {
    // Obtiene la URL del PDF asociado a la fila actual
    const pdfURL = rowData.evidencia ?? "";

    const downloadLink = document.createElement("a");
    downloadLink.href = pdfURL;
    downloadLink.target = "_blank"; // Abre el enlace en una nueva pestaña
    downloadLink.download = "evidencia.pdf";

    // Simula un clic en el enlace para descargar el archivo
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3"
      >
        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2">Carga Familiar</h1>
          </Divider>
        </div>
        <div className="flex justify-content-between flex-wrap">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap flex-row ">
              <div className="flex align-items-center justify-content-center">
                <div className="flex flex-column">
                  <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        className="text-3xl font-medium w-full min-w-min"
                        htmlFor="cedula"
                      >
                        Cedula:
                      </label>
                      <InputText
                        type="string"
                        placeholder="Ingrese su Cedula"
                        id="cedula"
                        name="cedula"
                        className="w-auto min-w-min text-2xl"
                        value={formik.values.cedula}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <small className="p-error">
                        {" "}
                        {formik.touched.cedula && formik.errors.cedula}{" "}
                      </small>
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto pr-2">
                      <label
                        className="text-3xl font-medium w-full min-w-min"
                        htmlFor="nombre_pariente"
                      >
                        Nombres:
                      </label>
                      <InputText
                        type="text"
                        placeholder="Ingrese sus Nombres"
                        id="nombre_pariente"
                        name="nombre_pariente"
                        className="w-auto min-w-min text-2xl"
                        value={formik.values.nombre_pariente}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <small className="p-error">
                        {" "}
                        {formik.touched.nombre_pariente &&
                          formik.errors.nombre_pariente}{" "}
                      </small>
                    </div>

                    <div className="flex align-items-center justify-content-center w-auto pr-2 ">
                      <label
                        className="text-3xl font-medium w-full min-w-min"
                        htmlFor="apellido_pariente"
                      >
                        Apellidos:
                      </label>
                      <InputText
                        type="text"
                        placeholder="Ingrese sus Apellidos"
                        id="apellido_pariente"
                        name="apellido_pariente"
                        className="w-auto min-w-min text-2xl"
                        value={formik.values.apellido_pariente}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <small className="p-error">
                        {" "}
                        {formik.touched.apellido_pariente &&
                          formik.errors.apellido_pariente}{" "}
                      </small>
                    </div>
                  </div>
                  <div className="flex flex-row  w-full h-full  justify-content-around  flex-grow-1 ">
                    <div className="flex align-items-center justify-content-center w-auto h-6rem">
                      <label
                        className="text-3xl font-medium w-auto min-w-min"
                        htmlFor="fecha_nacimiento"
                      >
                        Fecha de nacimiento:
                      </label>
                      <Calendar
                        placeholder="Ingrese su Fecha de Nacimiento"
                        className="w-full min-w-min text-4xl"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        dateFormat="dd/mm/yy"
                        showIcon
                        value={formik.values.fecha_nacimiento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <small className="p-error">
                        {" "}
                        {formik.touched.fecha_nacimiento &&
                          formik.errors.fecha_nacimiento}{" "}
                      </small>
                    </div>
                  </div>
                  <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        label={selectedItem ? "Actualizar" : "Guardar"}
                        severity={selectedItem ? "warning" : "success"}
                        type="submit"
                        className="w-full text-3xl min-w-min "
                        rounded
                      />
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        type="button"
                        label="Cancel"
                        className="w-full text-3xl min-w-min"
                        rounded
                        onClick={() => {
                          formik.resetForm();
                          setSelectedItem(null);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-column align-items-center justify-content-between ml-4">
                <label
                  className="flex text-3xl font-medium"
                  htmlFor="evidencia"
                >
                  Subir PDF:
                </label>
                <ToastMessage message={message} />
                <FileUpload
                  name="evidencia"
                  id="evidencia"
                  ref={fileUploadRef}
                  chooseLabel="Escoger"
                  uploadLabel="Cargar"
                  cancelLabel="Cancelar"
                  accept=".pdf"
                  customUpload
                  uploadHandler={customBytesUploader}
                  emptyTemplate={
                    <p className="m-0 p-button-rounded">
                      Arrastre y suelte los archivos aquí para cargarlos.
                    </p>
                  }
                />
                <small className="p-error w-full text-center">
                  {formik.touched.evidencia && formik.errors.evidencia}
                </small>
              </div>
            </div>
          </form>
        </div>

        <DataTable
          tableStyle={{ minWidth: "50rem" }}
          className="mt-5  w-full h-full text-3xl font-medium "
          value={items}
        >
          <Column
            key="carga"
            field="Carga Familiar"
            header="Carga Familiar"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            body={cargaBodyTemplate}
          ></Column>

          <Column
            key="pdf"
            field="PDF"
            header="PDF"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            body={(rowData: ICargaFamiliar) => (
              <>
                <Button
                  icon="pi pi-download p-clickable"
                  className="p-button-rounded p-button-text mr-4"
                  onClick={() => handleDownloadPDF(rowData)}
                ></Button>
              </>
            )}
          ></Column>

          <Column
            key="acciones"
            field="Acciones"
            header="Acciones"
            headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            body={(rowData: ICargaFamiliar) => (
              <>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-text mr-4"
                  onClick={() => handleSelectedRow(rowData)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger"
                  onClick={() => handleDeleteItem(rowData)}
                />
              </>
            )}
          ></Column>
        </DataTable>
      </Card>
    </Fieldset>
  );
};

export default Persona;
