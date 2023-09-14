import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import "../../styles/Contrato.css";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { ICapacitaciones } from "../../interfaces/Primary/ICapacitaciones";
import { CapacitacionesService } from "../../services/CapacitacionesService";
import swal from "sweetalert";

function PublicacionesContext() {
  //Session Storage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [contra1, setcontra1] = useState<ICapacitaciones[]>([]);
  const [formData, setFormData] = useState<ICapacitaciones>({
    id_capacitaciones: 0,
    institucion: "",
    tipo_evento: "",
    nombre_evento: "",
    area_estudios: "",
    tipo_certificado: "",
    fecha_inicio: "",
    fecha_fin: "",
    numero_dias: 0,
    cantidad_horas: 0,
    evidencia: "",
    persona: {
      id_persona: idPersona,
    },
  });
  const tipoCertificadoOptions = [
    { label: "Aprobación", value: "Aprobación" },
    { label: "Asistencia", value: "Asistencia" },
  ];
  const areaEstudioOptions = [
    { label: "Administración/oficina", value: "Administración/oficina" },
    {
      label: "Agricultura/Pesca/Ganadería",
      value: "Agricultura/Pesca/Ganadería",
    },
    { label: "Arte/Diseño/Medios", value: "Arte/Diseño/Medios" },
    { label: "Científico/Investigación", value: "Científico/Investigación" },
    { label: "Dirección/ Gerencia", value: "Dirección/ Gerencia" },
    { label: "Economía/Contabilidad", value: "Economía/Contabilidad" },
    { label: "Educación Básica/Cursos", value: "Educación Básica/Cursos" },
    { label: "Educación/Universidad", value: "Educación/Universidad" },
    { label: "Entretenimiento/Deportes", value: "Entretenimiento/Deportes" },
    { label: "Fabricación", value: "Fabricación" },
    { label: "Finanzas/ Banca", value: "Finanzas/ Banca" },
    { label: "Gobierno", value: "Gobierno" },
    { label: "Hotelería/Turismo", value: "Hotelería/Turismo" },
    { label: "Informática hardware", value: "Informática hardware" },
    { label: "Informática software", value: "Informática software" },
    {
      label: "Informática/Telecomunicaciones",
      value: "Informática/Telecomunicaciones",
    },
    { label: "Ingeniería/Técnico", value: "Ingeniería/Técnico" },
    { label: "Internet", value: "Internet" },
    { label: "Legal/ Asesoría", value: "Legal/ Asesoría" },
    { label: "Marketing/Ventas", value: "Marketing/Ventas" },
    { label: "Materia prima", value: "Materia prima" },
    { label: "Medicina/Salud", value: "Medicina/Salud" },
    { label: "Recursos Humanos/Personal", value: "Recursos Humanos/Personal" },
    { label: "Sin Área de Estudio", value: "Sin Área de Estudio" },
    { label: "Ventas al consumidor", value: "Ventas al consumidor" },
  ];

  const tipoEventoOptions = [
    { label: "CONFERENCIA", value: "CONFERENCIA" },
    { label: "CONGRESO", value: "CONGRESO" },
    { label: "CURSO", value: "CURSO" },
    { label: "DIPLOMADO", value: "DIPLOMADO" },
    { label: "JORNADA", value: "JORNADA" },
    { label: "PANEL", value: "PANEL" },
    { label: "PASANTIA", value: "PASANTIA" },
    { label: "SEMINARIO", value: "SEMINARIO" },
    { label: "TALLER", value: "TALLER" },
    { label: "VISITA DE OBSERVACION", value: "VISITA DE OBSERVACION" },
  ];
  const fileUploadRef = useRef<FileUpload>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const capaService = new CapacitacionesService();

  const loadData = () => {
    capaService
      .getAllByPersona(idPersona)
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
      link.download = "Evidencias Capacitaciones.pdf";
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
      !formData.institucion ||
      !formData.tipo_evento ||
      !formData.nombre_evento ||
      !formData.area_estudios ||
      !formData.tipo_certificado ||
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.numero_dias ||
      !formData.cantidad_horas ||
      !formData.evidencia
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    capaService
      .guardarCapacitaciones(formData)
      .then((response) => {
        resetForm();
        swal("Publicacion", "Datos Guardados Correctamente", "success");

        capaService
          .getAllByPersona(idPersona)
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
          capaService
            .deleteCapacitaciones(id)
            .then(() => {
              setcontra1(
                contra1.filter((contra) => contra.id_capacitaciones !== id)
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
        (contra) => contra.id_capacitaciones === id
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
      capaService
        .updateCapacitaciones(Number(editItemId), formData as ICapacitaciones)
        .then((response) => {
          swal({
            title: "Publicaciones",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            institucion: "",
            tipo_evento: "",
            nombre_evento: "",
            area_estudios: "",
            tipo_certificado: "",
            fecha_inicio: "",
            fecha_fin: "",
            numero_dias: 0,
            cantidad_horas: 0,
            evidencia: "",
            persona: null,
          });
          setcontra1(
            contra1.map((contra) =>
              contra.id_capacitaciones === editItemId ? response : contra
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
      institucion: "",
      tipo_evento: "",
      nombre_evento: "",
      area_estudios: "",
      tipo_certificado: "",
      fecha_inicio: "",
      fecha_fin: "",
      numero_dias: 0,
      cantidad_horas: 0,
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
              Capacitaciones
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
                <div className="flex flex-column flex-wrap gap-4" style={{ marginLeft: "20px" }}>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="institucion"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Institución:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Institución"
                      id="institucion"
                      name="institucion"
                      style={{ width: "250px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institucion: e.currentTarget.value,
                        })
                      }
                      value={formData.institucion}
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="tipo_evento"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Tipo de Evento:
                    </label>
                    <Dropdown
                      id="tipo_evento"
                      name="tipo_evento"
                      options={tipoEventoOptions}
                      onChange={(e) =>
                        setFormData({ ...formData, tipo_evento: e.value })
                      }
                      value={formData.tipo_evento}
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Seleccione el Tipo de Evento"
                      style={{ width: "250px" }} // Ajusta el ancho del Dropdown
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full  justify-content-between">
                    <label
                      htmlFor="nombre_evento"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Nombre del Evento:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Nombre del Evento"
                      id="nombre_evento"
                      name="nombre_evento"
                      style={{ width: "250px" }}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nombre_evento: e.currentTarget.value,
                        })
                      }
                      value={formData.nombre_evento}
                    />
                  </div>
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-2px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="area_estudios"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Área de Estudios:
                    </label>
                    <Dropdown
                      id="area_estudios"
                      name="area_estudios"
                      options={areaEstudioOptions}
                      onChange={(e) =>
                        setFormData({ ...formData, area_estudios: e.value })
                      }
                      value={formData.area_estudios}
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Seleccione el Área de Estudio"
                      style={{ width: "250px" }} // Ajusta el ancho del Dropdown
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="tiempo_dedicacion"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Tipo de Certificado:
                    </label>
                    <Dropdown
                      id="tiempo_dedicacion"
                      name="tiempo_dedicacion"
                      options={tipoCertificadoOptions}
                      onChange={(e) =>
                        setFormData({ ...formData, tipo_certificado: e.value })
                      }
                      value={formData.tipo_certificado}
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Seleccione el Tipo de Certificado"
                      style={{ width: "250px" }} // Ajusta el ancho del Dropdown
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="fecha_inicio"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Fecha de Inicio:
                    </label>
                    <Calendar
                      className="text-2xl"
                      id="fecha_inicio"
                      name="fecha_inicio"
                      required
                      dateFormat="yy-mm-dd" // Cambiar el formato a ISO 8601
                      showIcon
                      style={{ width: "250px" }}
                      maxDate={new Date()}
                      onChange={(e) => {
                        const selectedDate =
                          e.value instanceof Date ? e.value : null;
                        const formattedDate = selectedDate
                          ? selectedDate.toISOString().split("T")[0] // Formatear a ISO 8601
                          : "";
                        setFormData({
                          ...formData,
                          fecha_inicio: formattedDate,
                        });
                      }}
                      value={
                        formData.fecha_inicio
                          ? new Date(formData.fecha_inicio)
                          : null
                      }
                    />
                  </div>
                </div>
                <div
                  className="flex flex-column flex-wrap gap-4"
                  style={{ marginTop: "-2px", marginLeft: "25px" }}
                >
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="fecha_fin"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Fecha de Fin:
                    </label>
                    <Calendar
                      className="text-2xl"
                      id="fecha_fin"
                      name="fecha_fin"
                      required
                      dateFormat="yy-mm-dd" // Cambiar el formato a ISO 8601
                      showIcon
                      style={{ width: "250px" }}
                      maxDate={new Date()}
                      onChange={(e) => {
                        const selectedDate =
                          e.value instanceof Date ? e.value : null;
                        const formattedDate = selectedDate
                          ? selectedDate.toISOString().split("T")[0] // Formatear a ISO 8601
                          : "";
                        setFormData({
                          ...formData,
                          fecha_fin: formattedDate,
                        });
                      }}
                      value={
                        formData.fecha_fin ? new Date(formData.fecha_fin) : null
                      }
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="numero_dias"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Número de Días:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese el Número de Días"
                      id="numero_dias"
                      name="numero_dias"
                      style={{ width: "250px" }}
                      onChange={(e) => {
                        const numero_dias = parseFloat(e.currentTarget.value); // Convertir a número
                        setFormData({
                          ...formData,
                          numero_dias: isNaN(numero_dias) ? null : numero_dias,
                        });
                      }}
                      value={
                        formData.numero_dias !== null
                          ? formData.numero_dias.toString()
                          : ""
                      }
                    />
                  </div>
                  <div className="flex flex-wrap w-full h-full justify-content-between">
                    <label
                      htmlFor="cantidad_horas"
                      className="text-3xl font-medium w-auto min-w-min"
                      style={{ marginRight: "20px" }}
                    >
                      Cantidad de Horas:
                    </label>
                    <InputText
                      className="text-2xl"
                      placeholder="Ingrese la Cantidad de Horas"
                      id="cantidad_horas"
                      name="cantidad_horas"
                      style={{ width: "250px" }}
                      onChange={(e) => {
                        const cantidad_horas = parseFloat(
                          e.currentTarget.value
                        ); // Convertir a número
                        setFormData({
                          ...formData,
                          cantidad_horas: isNaN(cantidad_horas)
                            ? null
                            : cantidad_horas,
                        });
                      }}
                      value={
                        formData.cantidad_horas !== null
                          ? formData.cantidad_horas.toString()
                          : ""
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
                    style={{ marginTop: "55px" }}
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
                    style={{ marginTop: "55px" }}
                    className="w-full text-3xl min-w-min"
                    rounded
                    onClick={resetForm}
                  />
                </div>
              </div>
              <div style={{ marginLeft: "466px", marginTop: "-93px" }}>
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
                    Subir Certificado:
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
              <th>Institución</th>
              <th>Tipo de Evento</th>
              <th>Nombre del Evento </th>
              <th>Área de Estudios</th>
              <th>Tipo de Certificado</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Número de Días</th>
              <th>Cantidad de Horas</th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {contra1.map((contrato) => (
              <tr
                className="text-center"
                key={contrato.id_capacitaciones?.toString()}
              >
                <td>{contrato.institucion}</td>
                <td>{contrato.tipo_evento}</td>
                <td>{contrato.nombre_evento}</td>
                <td>{contrato.area_estudios}</td>
                <td>{contrato.tipo_certificado}</td>
                <td>
                  {contrato.fecha_inicio
                    ? new Date(contrato.fecha_inicio).toLocaleDateString(
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
                  {contrato.fecha_fin
                    ? new Date(contrato.fecha_fin).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : ""}
                </td>
                <td>{contrato.numero_dias + " días"}</td>
                <td>{contrato.cantidad_horas + " horas"}</td>
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
                      handleEdit(contrato.id_capacitaciones?.valueOf())
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
                      handleDelete(contrato.id_capacitaciones?.valueOf())
                    }
                    // Agrega el evento onClick para la operación de eliminar
                  />
                </td>
                <td>
                  {contrato.evidencia ? (
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
                      onClick={() => decodeBase64(contrato.evidencia!)}
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
