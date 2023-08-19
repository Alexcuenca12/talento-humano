import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import "../../styles/Recomendaciones.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { IRecomendaciones } from "../../interfaces/Primary/IRecomendaciones";
import { RecomendacionesService } from "../../services/RecomendacionesService";
import swal from "sweetalert";

function PublicacionesContext() {
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [contra1, setcontra1] = useState<IRecomendaciones[]>([]);
  const [formData, setFormData] = useState<IRecomendaciones>({
    id_recomendaciones: 0,
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    correo: "",
    documentoRecomendacion: "",
    persona: {
      id_persona: idPersona,
    },
  });

  const fileUploadRef = useRef<FileUpload>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const recomService = new RecomendacionesService();

  const loadData = () => {
    recomService
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
        setFormData({ ...formData, documentoRecomendacion: base64data });
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
      !formData.correo ||
      !formData.primer_apellido ||
      !formData.primer_nombre ||
      !formData.segundo_apellido ||
      !formData.segundo_nombre ||
      !formData.documentoRecomendacion
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    recomService
      .save(formData)
      .then((response) => {
        resetForm();
        swal("Publicacion", "Datos Guardados Correctamente", "success");

        recomService
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
          recomService
            .delete(id)
            .then(() => {
              setcontra1(
                contra1.filter((contra) => contra.id_recomendaciones !== id)
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
      const editItem = contra1.find(
        (contra) => contra.id_recomendaciones === id
      );
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
      recomService
        .update(Number(editItemId), formData as IRecomendaciones)
        .then((response) => {
          swal({
            title: "Publicaciones",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            correo: "",
            documentoRecomendacion: "",
            persona: null,
          });
          setcontra1(
            contra1.map((contra) =>
              contra.id_recomendaciones === editItemId ? response : contra
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
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      correo: "",
      documentoRecomendacion: "",
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
              Recomendaciones
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
                      Primer Nombre:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Primer Nombre"
                      id="nombre"
                      name="nombre"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primer_nombre: e.currentTarget.value,
                        })
                      }
                      value={formData.primer_nombre}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="segundo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Segundo Nombre:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Segundo Nombre"
                      id="segundo"
                      name="segundo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          segundo_nombre: e.currentTarget.value,
                        })
                      }
                      value={formData.segundo_nombre}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="apellido"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Primer Apellido:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Primer Apellido"
                      id="apellido"
                      name="apellido"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primer_apellido: e.currentTarget.value,
                        })
                      }
                      value={formData.primer_apellido}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="apellido2"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Segundo Apellido:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Segundo Apellido"
                      id="apellido2"
                      name="apellido2"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          segundo_apellido: e.currentTarget.value,
                        })
                      }
                      value={formData.segundo_apellido}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="correo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Correo Electrónico:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Correo Electrónico"
                      id="correo"
                      name="correo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          correo: e.currentTarget.value,
                        })
                      }
                      value={formData.correo}
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
              <th>Nº</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {contra1.map((recomendacion) => (
              <tr
                className="text-center"
                key={recomendacion.id_recomendaciones?.toString()}
              >
                <td>{recomendacion.id_recomendaciones}</td>
                <td>
                  {recomendacion.primer_nombre +
                    " " +
                    recomendacion.segundo_nombre +
                    " " +
                    recomendacion.primer_apellido +
                    " " +
                    recomendacion.segundo_apellido}
                </td>
                <td>{recomendacion.correo}</td>
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
                      handleEdit(recomendacion.id_recomendaciones?.valueOf())
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
                      handleDelete(recomendacion.id_recomendaciones?.valueOf())
                    }
                    // Agrega el evento onClick para la operación de eliminar
                  />
                </td>
                <td>
                  {recomendacion.documentoRecomendacion ? (
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
                      onClick={() =>
                        decodeBase64(recomendacion.documentoRecomendacion!)
                      }
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
