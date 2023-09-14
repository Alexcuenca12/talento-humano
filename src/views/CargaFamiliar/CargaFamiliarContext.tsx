import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "../../styles/Contrato.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { ICargaFamiliar } from "../../interfaces/Primary/ICargaFamiliar";
import { CargaFamiliarService } from "../../services/CargaFamiliarService";
import swal from "sweetalert";

function CargaFamiliarContext() {
  //Session Storage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [contra1, setcontra1] = useState<ICargaFamiliar[]>([]);
  const [formData, setFormData] = useState<ICargaFamiliar>({
    id_cargaFamiliar: 0,
    cedula: "",
    nombre_pariente: "",
    apellido_pariente: "",
    fecha_nacimiento: "",
    evidencia: "",
    persona: { id_persona: idPersona },
  });


  //Datos normales


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
      link.download = "Cédula.pdf";
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
      !formData.cedula ||
      !formData.nombre_pariente ||
      !formData.apellido_pariente ||
      !formData.fecha_nacimiento ||
      !formData.evidencia
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    cargaService
      .saveCarga(formData)
      .then((response) => {
        resetForm();
        swal("Publicacion", "Datos Guardados Correctamente", "success");

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
                contra1.filter((contra) => contra.id_cargaFamiliar !== id)
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
      const editItem = contra1.find((contra) => contra.id_cargaFamiliar === id);
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
            contra1.map((contra) =>
              contra.id_cargaFamiliar === editItemId ? response : contra
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
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginLeft: "20px" }}
                >
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="cargo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Cédula:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Cédula"
                      id="cargo"
                      name="cargo"
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
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="nombresP"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Nombre Completo:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese los Nombres"
                      id="nombresP"
                      name="nombresP"
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
                      htmlFor="apellidoP"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Apellido Completo:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese los Apellidos"
                      id="apellidoP"
                      name="apellidoP"
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
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-105px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="nacimiento"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Fecha de Nacimiento:
                    </label>
                    <Calendar
                      className="text-2xl"
                      id="inicio"
                      name="inicio"
                      required
                      dateFormat="yy-mm-dd" // Cambiar el formato a ISO 8601
                      showIcon
                      maxDate={new Date()}
                      onChange={(e) => {
                        const selectedDate =
                          e.value instanceof Date ? e.value : null;
                        const formattedDate = selectedDate
                          ? selectedDate.toISOString().split("T")[0] // Formatear a ISO 8601
                          : "";
                        setFormData({
                          ...formData,
                          fecha_nacimiento: formattedDate,
                        });
                      }}
                      value={
                        formData.fecha_nacimiento
                          ? new Date(formData.fecha_nacimiento)
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6"
                style={{ marginLeft: "-45px" }}
              >
                <div className="flex align-items-center justify-content-center w-auto min-w-min">
                  <Button
                    type="submit"
                    style={{ marginTop: "25px" }}
                    label={editMode ? "Actualizar" : "Guardar"}
                    className="w-full text-3xl min-w-min "
                    rounded
                    onClick={editMode ? handleUpdate : handleSubmit}
                  />
                </div>
                <div className="flex align-items-center justify-content-center w-auto min-w-min">
                  <Button
                    type="button"
                    label="Cancelar"
                    style={{ marginTop: "25px" }}
                    className="w-full text-3xl min-w-min"
                    rounded
                    onClick={resetForm}
                  />
                </div>
              </div>
              <div style={{ marginLeft: "600px", marginTop: "-285px" }}>
                <div className="flex flex-column align-items-center justify-content-center ml-4">
                  <label
                    htmlFor="pdf"
                    className="text-3xl font-medium w-auto min-w-min"
                    style={{
                      marginRight: "20px",
                      marginLeft: "169px",
                      marginTop: "-5px",
                    }}
                  >
                    Subir Cédula de Identidad:
                  </label>
                  <FileUpload
                    name="pdf"
                    style={{ marginLeft: "285px", marginTop: "10px" }}
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
            </div>
          </form>
        </div>
        <table
          style={{ minWidth: "40rem" }}
          className="mt-4  w-full h-full text-3xl font-large"
        >
          <thead>
            <tr style={{ backgroundColor: "#0C3255", color: "white" }}>
              <th>Cédula </th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {contra1.map((cargaF) => (
              <tr
                className="text-center"
                key={cargaF.id_cargaFamiliar?.toString()}
              >
                <td>{cargaF.cedula}</td>
                <td>
                  {cargaF.nombre_pariente + " " + cargaF.apellido_pariente}
                </td>
                <td>
                  {cargaF.fecha_nacimiento
                    ? new Date(cargaF.fecha_nacimiento).toLocaleDateString(
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
                    }}
                    onClick={() =>
                      handleEdit(cargaF.id_cargaFamiliar?.valueOf())
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
                      handleDelete(cargaF.id_cargaFamiliar?.valueOf())
                    }
                    // Agrega el evento onClick para la operación de eliminar
                  />
                </td>
                <td>
                  {cargaF.evidencia ? (
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
                      onClick={() => decodeBase64(cargaF.evidencia!)}
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
