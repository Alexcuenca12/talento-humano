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
import { InstruccionFormalData } from "../../interfaces/Primary/IInstrucc_Formal";
import { Instruc_FormalService } from "../../services/Instru_FormalService";
import swal from "sweetalert";

function InstruccionFormalContext() {
  //Session Storage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [formal1, setinstruc1] = useState<InstruccionFormalData[]>([]);
  const [formData, setFormData] = useState<InstruccionFormalData>({
    id_instruccion: 0,
    nivelInstruccion: "",
    institucionEducativa: "",
    tituloObtenido: "",
    num_SenecytRegistro: "",
    tiempoEstudio: 0,
    anioGraduacion: 0,
    areaEstudios: "",
    titulo: "",
    persona: { id_persona: idPersona },
  });

  const fileUploadRef = useRef<FileUpload>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const instrucFormalService = new Instruc_FormalService();

  const loadData = () => {
    instrucFormalService
      .getAllByPersona(idPersona)
      .then((data) => {
        setinstruc1(data);
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
        setFormData({ ...formData, titulo: base64data });
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
      !formData.nivelInstruccion ||
      !formData.institucionEducativa ||
      !formData.tituloObtenido ||
      !formData.num_SenecytRegistro ||
      !formData.tiempoEstudio ||
      !formData.anioGraduacion ||
      !formData.areaEstudios ||
      !formData.titulo ||
      !formData.institucionEducativa
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    instrucFormalService
      .save(formData)
      .then((response) => {
        resetForm();
        swal("Publicacion", "Datos Guardados Correctamente", "success");

        instrucFormalService
          .getAll()
          .then((data) => {
            setinstruc1(data);
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
          instrucFormalService
            .delete(id)
            .then(() => {
              setinstruc1(
                formal1.filter((instruc) => instruc.id_instruccion !== id)
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
      const editItem = formal1.find((instruc) => instruc.id_instruccion === id);
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
      instrucFormalService
        .update(Number(editItemId), formData as InstruccionFormalData)
        .then((response) => {
          swal({
            title: "Publicaciones",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            nivelInstruccion: "",
            institucionEducativa: "",
            tituloObtenido: "",
            num_SenecytRegistro: "",
            tiempoEstudio: 0,
            anioGraduacion: 0,
            areaEstudios: "",
            titulo: "",
            persona: null
          });
          setinstruc1(
            formal1.map((instruc) =>
              instruc.id_instruccion === editItemId ? response : instruc
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
      nivelInstruccion: "",
      institucionEducativa: "",
      tituloObtenido: "",
      num_SenecytRegistro: "",
      tiempoEstudio: 0,
      anioGraduacion: 0,
      areaEstudios: "",
      titulo: "",
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
              Instrucción Formal
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
                      Nivel de Instrucción:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Nivel de Instrucción"
                      id="cargo"
                      name="cargo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nivelInstruccion: e.currentTarget.value,
                        })
                      }
                      value={formData.nivelInstruccion}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="cargo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Institución Educativa:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Institución"
                      id="cargo"
                      name="cargo"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institucionEducativa: e.currentTarget.value,
                        })
                      }
                      value={formData.institucionEducativa}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="cargo"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Titulo Obtenido:
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
                          tituloObtenido: e.currentTarget.value,
                        })
                      }
                      value={formData.tituloObtenido}
                    />
                  </div>
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-3px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="filiacion"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Nº de Registro de Senecyt:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Registro de Senecyt"
                      id="filiacion"
                      name="filiacion"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          num_SenecytRegistro: e.currentTarget.value,
                        })
                      }
                      value={formData.num_SenecytRegistro}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="tiempoEstudio"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Tiempo de Estudio:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Tiempo de Estudio"
                      id="tiempoEstudio"
                      name="tiempoEstudio"
                      style={{ width: "221px" }}
                      onChange={(e) => {
                        const tiempoEstudio = parseFloat(e.currentTarget.value); // Convertir a número
                        setFormData({
                          ...formData,
                          tiempoEstudio: isNaN(tiempoEstudio)
                            ? null
                            : tiempoEstudio,
                        });
                      }}
                      value={
                        formData.tiempoEstudio !== null
                          ? formData.tiempoEstudio.toString()
                          : ""
                      }
                    />
                  </div>

                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="anioGraduacion"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Año de Graduación:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Año de Graduación"
                      id="anioGraduacion"
                      name="anioGraduacion"
                      style={{ width: "221px" }}
                      onChange={(e) => {
                        const anioGraduacion = parseFloat(
                          e.currentTarget.value
                        ); // Convertir a número
                        setFormData({
                          ...formData,
                          anioGraduacion: isNaN(anioGraduacion)
                            ? null
                            : anioGraduacion, // Establecer como null si no es un número válido
                        });
                      }}
                      value={
                        formData.anioGraduacion !== null
                          ? formData.anioGraduacion.toString()
                          : ""
                      }
                    />
                  </div>
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-107px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="area"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Area de Estudios
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Area de Estudios"
                      id="area"
                      name="area"
                      style={{ width: "221px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          areaEstudios: e.currentTarget.value,
                        })
                      }
                      value={formData.areaEstudios}
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6"
                style={{ marginLeft: "-45px" }}
              >
                <div
                  className="flex align-items-center justify-content-center w-auto min-w-min"
                  style={{ marginTop: "25px" }}
                >
                  <Button
                    type="submit"
                    label={editMode ? "Actualizar" : "Guardar"}
                    className="w-full text-3xl min-w-min "
                    rounded
                    onClick={editMode ? handleUpdate : handleSubmit}
                  />
                </div>
                <div
                  className="flex align-items-center justify-content-center w-auto min-w-min"
                  style={{ marginTop: "25px" }}
                >
                  <Button
                    type="button"
                    label="Cancelar"
                    className="w-full text-3xl min-w-min"
                    rounded
                    onClick={resetForm}
                  />
                </div>
              </div>
              <div>
                {" "}
                <div className="flex flex-column align-items-center justify-content-center ml-4">
                  <div style={{ marginTop: "-105px", marginLeft: "630px" }}>
                    <label
                      htmlFor="pdf"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{
                        marginRight: "20px",
                        marginLeft: "267px",
                        marginTop: "5px",
                      }}
                    >
                      Subir Evidencia:
                    </label>
                    <FileUpload
                      name="pdf"
                      style={{ marginLeft: "270px", marginTop: "10px" }}
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
            </div>
          </form>
        </div>
        <table
          style={{ minWidth: "40rem" }}
          className="mt-4  w-full h-full text-3xl font-large"
        >
          <thead>
            <tr style={{ backgroundColor: "#0C3255", color: "white" }}>
              <th>Nivel de Instrucción</th>
              <th>Institución Educativa </th>
              <th>Titulo Obtenido </th>
              <th>Nº de Registro de Senecyt</th>
              <th>Tiempo de estudio</th>
              <th>Año de Graduación</th>
              <th>Area de Estudio </th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {formal1.map((instruc) => (
              <tr
                className="text-center"
                key={instruc.id_instruccion?.toString()}
              >
                <td>{instruc.nivelInstruccion}</td>
                <td>{instruc.institucionEducativa}</td>
                <td>{instruc.tituloObtenido}</td>
                <td>{instruc.num_SenecytRegistro}</td>
                <td>{instruc.tiempoEstudio + " años"}</td>
                <td>{instruc.anioGraduacion}</td>
                <td>{instruc.areaEstudios}</td>
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
                      handleEdit(instruc.id_instruccion?.valueOf())
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
                      handleDelete(instruc.id_instruccion?.valueOf())
                    }
                    // Agrega el evento onClick para la operación de eliminar
                  />
                </td>
                <td>
                  {instruc.titulo ? (
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
                      onClick={() => decodeBase64(instruc.titulo!)}
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

export default InstruccionFormalContext;
