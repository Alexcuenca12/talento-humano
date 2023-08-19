import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "../../styles/Contrato.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { IPublicaciones } from "../../interfaces/Primary/IPublicaciones";
import { PublicacionesService } from "../../services/PublicacionesService";
import swal from "sweetalert";

function PublicacionesContext() {
    //Session Storage
    const userData = sessionStorage.getItem("user");
    const userObj = JSON.parse(userData || "{}");
    const idPersona = userObj.id;

  const [contra1, setcontra1] = useState<IPublicaciones[]>([]);
  const [formData, setFormData] = useState<IPublicaciones>({
    id_publi: 0,
    titulo_publi: "",
    autores_publi: "",
    filiacion_publi: "",
    lugar_publi: "",
    fecha_publi: "",
    fecha_evento: "",
    editorial_publi: "",
    isbn_publi: "",
    issn_publi: "",
    doi_publi: "",
    publicacion: "",
    persona:{id_persona:idPersona},
  });

  const fileUploadRef = useRef<FileUpload>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const publiService = new PublicacionesService();

  const loadData = () => {
    publiService
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
        setFormData({ ...formData, publicacion: base64data });
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
      !formData.fecha_publi ||
      !formData.titulo_publi ||
      !formData.publicacion
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    publiService
      .save(formData)
      .then((response) => {
        resetForm();
        swal("Publicacion", "Datos Guardados Correctamente", "success");

        publiService
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
          publiService
            .delete(id)
            .then(() => {
              setcontra1(contra1.filter((contra) => contra.id_publi !== id));
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
      const editItem = contra1.find((contra) => contra.id_publi === id);
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
      publiService
        .update(Number(editItemId), formData as IPublicaciones)
        .then((response) => {
          swal({
            title: "Publicaciones",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            titulo_publi: "",
            autores_publi: "",
            filiacion_publi: "",
            lugar_publi: "",
            fecha_publi: "",
            fecha_evento: "",
            editorial_publi: "",
            isbn_publi: "",
            issn_publi: "",
            doi_publi: "",
            publicacion: "",
            persona: null
          });
          setcontra1(
            contra1.map((contra) =>
              contra.id_publi === editItemId ? response : contra
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
      titulo_publi: "",
      autores_publi: "",
      filiacion_publi: "",
      lugar_publi: "",
      fecha_publi: "",
      fecha_evento: "",
      editorial_publi: "",
      isbn_publi: "",
      issn_publi: "",
      doi_publi: "",
      publicacion: "",
      persona: null
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
              Publicaciones
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
                      htmlFor="cargo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Titulo de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Titulo"
                      id="cargo"
                      name="cargo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          titulo_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.titulo_publi}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="inicio"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Fecha de Publicación:
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
                          fecha_publi: formattedDate,
                        });
                      }}
                      value={
                        formData.fecha_publi
                          ? new Date(formData.fecha_publi)
                          : null
                      }
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="cargo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Autores de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese los Autores"
                      id="cargo"
                      name="cargo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          autores_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.autores_publi}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="doi"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      DOI de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el DOI"
                      id="doi"
                      name="doi"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          doi_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.doi_publi}
                    />
                  </div>
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-52px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="filiacion"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Filiación de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Filiación"
                      id="filiacion"
                      name="filiacion"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          filiacion_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.filiacion_publi}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="lugar"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Lugar de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Lugar de la Publicacion"
                      id="lugar"
                      name="lugar"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lugar_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.lugar_publi}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="evento"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Fecha de Evento:
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
                          fecha_evento: formattedDate,
                        });
                      }}
                      value={
                        formData.fecha_evento
                          ? new Date(formData.fecha_evento)
                          : null
                      }
                    />
                  </div>
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-52px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="filiacion"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Editorial de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Editorial"
                      id="filiacion"
                      name="filiacion"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          editorial_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.editorial_publi}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="isbn"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      ISBN de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el ISBN"
                      id="isbn"
                      name="isbn"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isbn_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.isbn_publi}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="issn"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      ISSN de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el ISSN"
                      id="issn"
                      name="issn"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          issn_publi: e.currentTarget.value,
                        })
                      }
                      value={formData.issn_publi}
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
                    className="w-full text-3xl min-w-min"
                    rounded
                    onClick={resetForm}
                  />
                </div>
              </div>
              <div style={{ marginLeft: "556px", marginTop: "-103px" }}>
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
                    Subir Evidencia:
                  </label>
                  <FileUpload
                    name="pdf"
                    style={{ marginLeft: "380px", marginTop: "10px" }}
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
              <th>Nº de Publicacion</th>
              <th>Fecha de Publicación</th>
              <th>Titulo de Publicación </th>
              <th>Autores de Publicación </th>
              <th>Filiación de Publicación </th>
              <th>Lugar de Publicación </th>
              <th>Fecha de Evento</th>
              <th>Editorial de Publicación </th>
              <th>ISBN de Publicación </th>
              <th>ISSN de Publicación </th>
              <th>DOI de Publicación </th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {contra1.map((contrato) => (
              <tr className="text-center" key={contrato.id_publi?.toString()}>
                <td>{contrato.id_publi}</td>
                <td>
                  {contrato.fecha_publi
                    ? new Date(contrato.fecha_publi).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </td>
                <td>{contrato.titulo_publi}</td>
                <td>{contrato.autores_publi}</td>
                <td>{contrato.filiacion_publi}</td>
                <td>{contrato.lugar_publi}</td>
                <td>
                  {contrato.fecha_evento
                    ? new Date(contrato.fecha_evento).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </td>
                <td>{contrato.editorial_publi}</td>
                <td>{contrato.isbn_publi}</td>
                <td>{contrato.issn_publi}</td>
                <td>{contrato.doi_publi}</td>
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
                    onClick={() => handleEdit(contrato.id_publi?.valueOf())}
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
                    onClick={() => handleDelete(contrato.id_publi?.valueOf())}
                    // Agrega el evento onClick para la operación de eliminar
                  />
                </td>
                <td>
                  {contrato.publicacion ? (
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
                      onClick={() => decodeBase64(contrato.publicacion!)}
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

export default PublicacionesContext;
