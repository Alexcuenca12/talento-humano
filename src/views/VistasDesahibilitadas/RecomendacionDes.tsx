import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "../../styles/Contrato.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { IRecomendaciones } from "../../interfaces/Primary/IRecomendaciones";
import { RecomendacionesService } from "../../services/RecomendacionesService";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

interface Params {
  codigoRecomendacion: string;
}

function RecomendacionContextDes() {
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [recom1, setrecom1] = useState<IRecomendaciones[]>([]);
  const { codigoRecomendacion } = useParams<Params>();
  const codigoRecomendacionNumber = Number(codigoRecomendacion);

  const [formDisabled, setFormDisabled] = useState(false);

  const [formData, setFormData] = useState<IRecomendaciones>({
    id_recomendaciones: 0,
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    correo: "",
    documentoRecomendacion: "",
    numeroContacto: "",
    persona: {
      id_persona: idPersona,
    },
  });
  const fileUploadRef = useRef<FileUpload>(null);

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const recomService = new RecomendacionesService();

  useEffect(() => {
    recomService
      .getAllByRecomendacion(codigoRecomendacionNumber)
      .then((data) => {
        if (data.length > 0) {
          const contratoData = data[0];
          setFormDisabled(true);
          // Actualiza el estado local aquí
          setFormData({
            ...formData,
            primer_nombre: contratoData.primer_nombre,
            segundo_nombre: contratoData.segundo_nombre,
            primer_apellido: contratoData.primer_apellido,
            segundo_apellido: contratoData.segundo_apellido,
            correo: contratoData.correo,
            numeroContacto: contratoData.numeroContacto,
          });
          setrecom1(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

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
        title: "Recomendacion",
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
            setrecom1(data);
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
            numeroContacto: "",
            persona: null,
          });
          setrecom1(
            recom1.map((contra) =>
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
      numeroContacto: "",
      persona: null,
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
              <div
                className="flex align-items-center justify-content-center"
              >
                <div className="flex flex-column flex-wrap gap-4">
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="primer_nombre"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Primer Nombre:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el 1er Nombre"
                      id="primer_nombre"
                      disabled={formDisabled}
                      name="primer_nombre"
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
                      htmlFor="segundo_nombre"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Segundo Nombre:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el 2do Nombre"
                      id="segundo_nombre"
                      disabled={formDisabled}
                      name="segundo_nombre"
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
                      htmlFor="primer_apellido"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Primer Apellido:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el 1er Apellido"
                      id="primer_apellido"
                      disabled={formDisabled}
                      name="primer_apellido"
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
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="segundo_apellido"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Segundo Apellido:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el 2do. Apellido"
                      id="segundo_apellido"
                      disabled={formDisabled}
                      name="segundo_apellido"
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
                      Filiación de la Publicacion:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Correo"
                      id="correo"
                      disabled={formDisabled}
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
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="numeroContacto"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Número de Contacto:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Número"
                      id="numeroContacto"
                      disabled={formDisabled}
                      name="numeroContacto"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numeroContacto: e.currentTarget.value,
                        })
                      }
                      value={formData.numeroContacto}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div style={{ marginTop: "50px" }}>
          <table
            style={{ minWidth: "40rem" }}
            className="mt-4  w-full h-full text-3xl font-large"
          >
            <thead>
              <tr style={{ backgroundColor: "#0C3255", color: "white" }}>
                <th>Nº</th>
                <th>Nombres</th>
                <th>Correo</th>
                <th>Número </th>
                <th>Evidencia</th>
              </tr>
            </thead>
            <tbody>
              {recom1.map((recomendaciones) => (
                <tr
                  className="text-center"
                  key={recomendaciones.id_recomendaciones?.toString()}
                >
                  <td>{recomendaciones.id_recomendaciones}</td>

                  <td>
                    {recomendaciones.primer_nombre +
                      " " +
                      recomendaciones.primer_apellido}
                  </td>
                  <td>{recomendaciones.correo}</td>
                  <td>{recomendaciones.numeroContacto}</td>

                  <td>
                    {recomendaciones.documentoRecomendacion ? (
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
                          decodeBase64(recomendaciones.documentoRecomendacion!)
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
        </div>
      </Card>
    </Fieldset>
  );
}
export default RecomendacionContextDes;