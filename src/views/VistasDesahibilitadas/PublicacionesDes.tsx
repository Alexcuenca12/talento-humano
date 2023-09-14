import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { IPublicaciones } from "../../interfaces/Primary/IPublicaciones";
import { PublicacionesService } from "../../services/PublicacionesService";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

interface Params {
  codigoPublicacion: string;
}

function PublicacionesContextDes() {
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [publi1, setPubli1] = useState<IPublicaciones[]>([]);
  const { codigoPublicacion } = useParams<Params>();
  const codigoPublicacionNumber = Number(codigoPublicacion);

  const [formDisabled, setFormDisabled] = useState(false);

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
    persona: { id_persona: idPersona },
  });

  const fileUploadRef = useRef<FileUpload>(null);

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const publiService = new PublicacionesService();
  

  useEffect(() => {
    publiService
      .getAllByPublicacion(codigoPublicacionNumber)
      .then((data) => {
        if (data.length > 0) {
          const publicacionData = data[0];
          setFormDisabled(true);
          // Actualiza el estado local aquí
          setFormData({
            ...formData,
            titulo_publi: publicacionData.titulo_publi,
            autores_publi: publicacionData.autores_publi,
            filiacion_publi: publicacionData.filiacion_publi,
            lugar_publi: publicacionData.lugar_publi,
            fecha_publi: publicacionData.fecha_publi.toString(),
            fecha_evento: publicacionData.fecha_evento.toString(),
            editorial_publi: publicacionData.editorial_publi,
            isbn_publi: publicacionData.isbn_publi,
            issn_publi: publicacionData.issn_publi,
            doi_publi: publicacionData.doi_publi,
          });
          setPubli1(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  interface FileUploadSelectEvent {
    originalEvent?: ChangeEvent<HTMLInputElement> | DragEvent | undefined;
    files: File[];
  }

  const customBytesUploader = (eventData: { files: File[] }) => {
    const event: FileUploadSelectEvent = {
      originalEvent: undefined, // Cambia null a undefined
      files: eventData.files,
    };

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
        title: "publicacion",
        text: "Descargando pdf....",
        icon: "success",
        timer: 1000,
      });
      link.remove();
    } catch (error) {
      console.error("Error al decodificar la cadena base64:", error);
    }
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.titulo_publi ||
      !formData.autores_publi ||
      !formData.filiacion_publi ||
      !formData.lugar_publi ||
      !formData.fecha_publi ||
      !formData.fecha_evento ||
      !formData.editorial_publi ||
      !formData.isbn_publi ||
      !formData.issn_publi ||
      !formData.doi_publi
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }


    publiService
      .save(formData)
      .then((response) => {
        resetForm();
        swal("publicacion", "Datos Guardados Correctamente", "success");

        publiService
          .getAllByPublicacion(codigoPublicacionNumber)
          .then((data) => {
            setPubli1(data);
            console.log(data);
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

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = publi1.find((contra) => contra.id_publi === id);
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
      // Validating "Fecha Inicio" and "Fecha Fin"
      
      publiService
        .update(Number(editItemId), formData as IPublicaciones )
        .then((response) => {
          swal({
            title: "publicacion",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
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
            persona: null,
          });
          setPubli1(
            publi1.map((contra) =>
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
    persona: { id_persona: idPersona },
    });
    setEditMode(false);
    setEditItemId(undefined);
    if (fileUploadRef.current) {
      fileUploadRef.current.clear(); // Limpiar el campo FileUpload
    }
  };
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
                      disabled={formDisabled}
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
                      disabled={formDisabled}
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
                      disabled={formDisabled}
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
                      disabled={formDisabled}
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
                      disabled={formDisabled}
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
                      disabled={formDisabled}
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
                      disabled={formDisabled}
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
                      htmlFor="editorial"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Editorial de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Editorial"
                      id="editorial"
                      disabled={formDisabled}
                      name="editorial"
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
                      disabled={formDisabled}
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
                      disabled={formDisabled }
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
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {publi1.map((publicacion) => (
              <tr className="text-center" key={publicacion.id_publi?.toString()}>
                <td>{publicacion.id_publi}</td>
                <td>
                  {publicacion.fecha_publi
                    ? new Date(publicacion.fecha_publi).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </td>
                <td>{publicacion.titulo_publi}</td>
                <td>{publicacion.autores_publi}</td>
                <td>{publicacion.filiacion_publi}</td>
                <td>{publicacion.lugar_publi}</td>
                <td>
                  {publicacion.fecha_evento
                    ? new Date(publicacion.fecha_evento).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : ""}
                </td>
                <td>{publicacion.editorial_publi}</td>
                <td>{publicacion.isbn_publi}</td>
                <td>{publicacion.issn_publi}</td>
                <td>{publicacion.doi_publi}</td>
                <td>
                  {publicacion.publicacion ? (
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
                      onClick={() => decodeBase64(publicacion.publicacion!)}
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

export default PublicacionesContextDes;
