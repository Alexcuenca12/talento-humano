import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import "../../styles/CargaFamiliar.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { ICargaFamiliar } from "../../interfaces/Primary/ICargaFamiliar";
import { CargaFamiliarService } from "../../services/CargaFamiliarService";
import swal from "sweetalert";

function CargaFamiliarContext() {
  const [carga1, setcontra1] = useState<ICargaFamiliar[]>([]);
  const [formData, setFormData] = useState<ICargaFamiliar>({
    id_cargaFamiliar: 0,
    cedula: "",
    nombre_pariente: "",
    apellido_pariente: "",
    fecha_nacimiento: "",
    evidencia: "",
    persona: null,
  });

  const fileUploadRef = useRef<FileUpload>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const cargaService = new CargaFamiliarService();

  const loadData = () => {
    cargaService
      .getAll()
      .then((data) => {
        setcontra1(data);
        setDataLoaded(true); // Marcar los datos como cargados
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  const customBytesUploader = (event: FileUploadSelectEvent) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64data = reader.result as string;
        setFormData({ ...formData, evidencia: base64data });
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
      link.download = "archivoCon.pdf";
      link.click();
      swal({
        title: "Publicación",
        text: "Descargando pdf....",
        icon: "success",
        timer: 1000,
      });
      console.log("pdf descargado...");

      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error al decodificar la cadena base64:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.apellido_pariente ||
      !formData.cedula ||
      !formData.fecha_nacimiento ||
      !formData.nombre_pariente
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    cargaService
      .saveCarga(formData)
      .then((response) => {
        resetForm();
        swal("Carga Familiar", "Datos Guardados Correctamente", "success");

        cargaService
          .getAll()
          .then((data) => {
            setcontra1(data);
            resetForm();
            if (fileUploadRef.current) {
              fileUploadRef.current.clear();
            }
          })
          .catch((error) => {
            console.error("Error al obtener los datos:", error);
          });
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      swal({
        title: "Confirmar Eliminación",
        text: "¿Estás seguro de eliminar este registro?",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancelar",
            visible: true,
            className: "cancel-button",
          },
          confirm: {
            text: "Sí, eliminar",
            className: "confirm-button",
          },
        },
      }).then((confirmed) => {
        if (confirmed) {
          cargaService
            .deleteCarga(id)
            .then(() => {
              setcontra1(
                carga1.filter((carga) => carga.id_cargaFamiliar !== id)
              );
              swal(
                "Eliminado",
                "El registro ha sido eliminado correctamente",
                "error"
              );
            })
            .catch((error) => {
              console.error("Error al eliminar el registro:", error);
              swal(
                "Error",
                "Ha ocurrido un error al eliminar el registro",
                "error"
              );
            });
        }
      });
    }
  };

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = carga1.find((carga) => carga.id_cargaFamiliar === id);
      if (editItem) {
        setFormData(editItem);

        setEditMode(true);
        setEditItemId(id);
      }
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItemId !== undefined) {
      cargaService
        .updateCarga(Number(editItemId), formData as ICargaFamiliar)
        .then((response) => {
          swal({
            title: "Publicaciones",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            cedula: "",
            nombre_pariente: "",
            apellido_pariente: "",
            fecha_nacimiento: "",
            evidencia: "",
            persona: null,
          });
          setcontra1(
            carga1.map((carga) =>
              carga.id_cargaFamiliar === editItemId ? response : carga
            )
          );
          setEditMode(false);
          setEditItemId(undefined);
        })
        .catch((error) => {
          console.error("Error al actualizar el formulario:", error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      cedula: "",
      nombre_pariente: "",
      apellido_pariente: "",
      fecha_nacimiento: "",
      evidencia: "",
      persona: null,
    });
    setEditMode(false);
    setEditItemId(undefined);
    if (fileUploadRef.current) {
      fileUploadRef.current.clear(); // Limpiar el campo FileUpload
    }
  };
  if (!dataLoaded) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Fieldset className="fgrid col-fixed ">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap"
      >
        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2  w-full h-full max-w-full max-h-full min-w-min">
              Carga Familiar
            </h1>
          </Divider>
        </div>

        <div className="flex justify-content-center flex-wrap">
          <form
            onSubmit={editMode ? handleUpdate : handleSubmit}
            encType="multipart/form-data"
          >
            <div className="flex flex-wrap flex-row">
              <div className="flex align-items-center justify-content-center">
                <div className="flex flex-column flex-wrap gap-4">
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="nombre"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Nombres:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese los Nombres"
                      id="nombre"
                      name="nombre"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nombre_pariente: e.currentTarget.value,
                        })
                      }
                      value={formData.nombre_pariente}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="segundo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Apellidos:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese los Apellidos"
                      id="segundo"
                      name="segundo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          apellido_pariente: e.currentTarget.value,
                        })
                      }
                      value={formData.apellido_pariente}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="cedula"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Cédula:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Cédula"
                      id="cedula"
                      name="cedula"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cedula: e.currentTarget.value,
                        })
                      }
                      value={formData.cedula}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="fin"
                      className="text-3xl font-medium w-auto min-w-min"
                    >
                      Fecha de Nacimiento:
                    </label>
                    <Calendar
                      className="text-2xl"
                      id="fin"
                      name="fin"
                      required
                      dateFormat="dd/mm/yy"
                      showIcon
                      yearNavigator={true}
                      maxDate={new Date()} // Establecer la fecha máxima permitida como la fecha actual
                      onChange={(e) => {
                        const selectedDate =
                          e.value instanceof Date ? e.value : null;
                        if (selectedDate && selectedDate > new Date()) {
                          swal(
                            "Advertencia",
                            "No se permiten fechas futuras",
                            "warning"
                          );
                        } else {
                          const formattedDate = selectedDate
                            ? `${selectedDate.getDate()}/${
                                selectedDate.getMonth() + 1
                              }/${selectedDate.getFullYear()}`
                            : "";
                          setFormData({
                            ...formData,
                            fecha_nacimiento: formattedDate,
                          });
                        }
                      }}
                      value={
                        formData.fecha_nacimiento
                          ? new Date(
                              formData.fecha_nacimiento
                                .split("/")
                                .reverse()
                                .join("-")
                            )
                          : null
                      }
                      yearRange="1900:2030" // Agregamos un rango personalizado de años
                    />
                  </div>
                  <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        type="submit"
                        label={editMode ? "Actualizar" : "Guardar"}
                        className="w-full text-3xl min-w-min "
                        rounded
                        onClick={editMode ? handleUpdate : handleSubmit}
                      />
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        type="button"
                        label="Cancel"
                        className="w-full text-3xl min-w-min"
                        rounded
                        onClick={resetForm}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-column align-items-center justify-content-center ml-4">
                <FileUpload
                  name="pdf"
                  style={{ marginLeft: "480px" }}
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
            </div>
          </form>
        </div>
        <table
          style={{ minWidth: "50rem" }}
          className="mt-5  w-full h-full text-3xl font-medium"
        >
          <thead>
            <tr style={{ backgroundColor: "#0C3255", color: "white" }}>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {carga1.map((carga) => (
              <tr
                className="text-center"
                key={carga.id_cargaFamiliar?.toString()}
              >
                <td>{carga.cedula}</td>
                <td>{carga.nombre_pariente + " " + carga.apellido_pariente}</td>
                <td>
                  {carga.fecha_nacimiento
                    ? new Date(carga.fecha_nacimiento).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </td>
                <td>
                  <Button
                    type="button"
                    className=""
                    label="✎"
                    style={{
                      background: "#ff9800",
                      borderRadius: "5%",
                      fontSize: "25px",
                      width: "50px",
                      color: "black",
                      justifyContent: "center",
                      marginRight: "8px", // Espacio entre los botones
                    }}
                    onClick={() =>
                      handleEdit(carga.id_cargaFamiliar?.valueOf())
                    }
                    // Agrega el evento onClick para la operación de editar
                  />
                  <Button
                    type="button"
                    className=""
                    label="✘"
                    style={{
                      background: "#ff0000",
                      borderRadius: "10%",
                      fontSize: "25px",
                      width: "50px",
                      color: "black",
                      justifyContent: "center",
                    }}
                    onClick={() =>
                      handleDelete(carga.id_cargaFamiliar?.valueOf())
                    }
                    // Agrega el evento onClick para la operación de eliminar
                  />
                </td>
                <td>
                  {carga.evidencia ? (
                    <Button
                      type="button"
                      className=""
                      label="Descargar PDF"
                      style={{
                        background: "#009688",
                        borderRadius: "10%",
                        fontSize: "12px",
                        color: "black",
                        justifyContent: "center",
                      }}
                      onClick={() => decodeBase64(carga.evidencia!)}
                    />
                  ) : (
                    <span>Sin evidencia</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Fieldset>
  );
}

export default CargaFamiliarContext;
