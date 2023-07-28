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
import { IContratoData } from "../../interfaces/Primary/IContrato";
import { ContratoService } from "../../services/ContratoService";
import swal from "sweetalert";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

function ContratoContext() {
  const [contra1, setcontra1] = useState<IContratoData[]>([]);
  const [formData, setFormData] = useState<IContratoData>({
    id_contrato: 0,
    fecha_inicio: "",
    fecha_fin: "",
    anio_duracion: "",
    horas_diarias: "",
    cargo: "",
    salario: "",
    evidencia: "",
    tiempo_dedicacion: "",
    salario_publico: "",
    contrato_vigente: false,
    persona: null,
  });

  const fileUploadRef = useRef<FileUpload>(null);

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const contratService = new ContratoService();
  const tiempoDedicacionOptions = [
    { label: "Tiempo completo", value: "Tiempo Completo" },
    { label: "Medio tiempo", value: "Medio Tiempo" },
    { label: "Por horas", value: "Por Horas" },
  ];
  const salariopublicoOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ];
  const [contratoVigente, setContratoVigente] = useState<boolean>(false);

  const handleContratoVigenteToggle = () => {
    setContratoVigente((prevValue) => !prevValue);
    setFormData({ ...formData, contrato_vigente: !contratoVigente });
  };
  const getContratoVigenteText = (contrato_vigente: boolean) => {
    return contrato_vigente ? "Por terminar" : "Finalizado";
  };

  useEffect(() => {
    contratService
      .getAll()
      .then((data) => {
        setcontra1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
    if (!formData.contrato_vigente) {
      setFormData((prevFormData) => ({ ...prevFormData, fecha_fin: "" }));
    }
  }, [formData.contrato_vigente]);

  const customBytesUploader = (event: FileUploadSelectEvent) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64data = reader.result as string;
        setFormData({ ...formData, evidencia: base64data });

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
        title: "Contrato",
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
      !formData.fecha_inicio ||
      !formData.anio_duracion ||
      !formData.tiempo_dedicacion ||
      !formData.cargo ||
      !formData.horas_diarias ||
      !formData.salario ||
      !formData.salario_publico
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    // Validar solo números en anio_duracion
    const anioDuracionRegex = /^\d+$/;
    if (!anioDuracionRegex.test(formData.anio_duracion)) {
      swal(
        "Advertencia",
        "Por favor, ingrese solo números en el campo Años de Duracion",
        "warning"
      );
      return;
    }

    const salarioRegex = /^\d+$/;
    if (!salarioRegex.test(formData.salario)) {
      swal(
        "Advertencia",
        "Por favor, ingrese solo números en el campo Salario",
        "warning"
      );
      return;
    }

    const horasRegex = /^\d+$/;
    if (!horasRegex.test(formData.horas_diarias)) {
      swal(
        "Advertencia",
        "Por favor, ingrese solo números en el campo Horas Diarias",
        "warning"
      );
      return;
    }

    const fechaInicio = new Date(formData.fecha_inicio);
    const fechaFin = new Date(formData.fecha_fin);

    // Validar fecha de inicio y fecha de fin
    if (fechaInicio > fechaFin) {
      swal(
        "Advertencia",
        "La fecha de inicio debe ser menor que la fecha de fin",
        "warning"
      );
      return;
    }

    contratService
      .save(formData)
      .then((response) => {
        resetForm();
        swal("Contrato", "Datos Guardados Correctamente", "success");

        contratService
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
          contratService
            .delete(id)
            .then(() => {
              setcontra1(contra1.filter((contra) => contra.id_contrato !== id));
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
      const editItem = contra1.find((contra) => contra.id_contrato === id);
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
      const fechaInicio = new Date(formData.fecha_inicio);
      const fechaFin = new Date(formData.fecha_fin);
      if (fechaInicio > fechaFin) {
        swal(
          "Advertencia",
          "La fecha de inicio debe ser menor que la fecha de fin",
          "warning"
        );
        return;
      }

      contratService
        .update(Number(editItemId), formData as IContratoData)
        .then((response) => {
          swal({
            title: "Contrato",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            fecha_inicio: "",
            fecha_fin: "",
            anio_duracion: "",
            horas_diarias: "",
            salario: "",
            cargo: "",
            evidencia: "",
            tiempo_dedicacion: "",
            salario_publico: "",
            contrato_vigente: false,
            persona: null,
          });
          setcontra1(
            contra1.map((contra) =>
              contra.id_contrato === editItemId ? response : contra
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
      id_contrato: 0,
      fecha_inicio: "",
      fecha_fin: "",
      anio_duracion: "",
      horas_diarias: "",
      salario: "",
      cargo: "",
      evidencia: "",
      tiempo_dedicacion: "",
      salario_publico: "",
      contrato_vigente: false,
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
              Contrato
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
                  <div style={{ marginRight: "600px" }}>
                    <div className="flex flex-wrap w-full h-full justify-content-between">
                      <label
                        htmlFor="inicio"
                        className="text-3xl font-medium w-auto min-w-min"
                      >
                        Fecha Inicio:
                      </label>
                      <Calendar
                        className=" text-2xl"
                        id="inicio"
                        name="inicio"
                        required
                        dateFormat="dd/mm/yy"
                        showIcon
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fecha_inicio:
                              e.value instanceof Date
                                ? e.value.toISOString()
                                : "",
                          })
                        }
                        value={
                          typeof formData.fecha_inicio === "string"
                            ? new Date(formData.fecha_inicio)
                            : null
                        }
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full justify-content-between">
                      <label
                        htmlFor="fin"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginTop: "15px" }}
                      >
                        Fecha Fin:
                      </label>
                      <Calendar
                        className="text-2xl"
                        id="fin"
                        name="fin"
                        style={{ marginTop: "15px" }}
                        required
                        dateFormat="dd/mm/yy"
                        showIcon
                        disabled={!formData.contrato_vigente} // Disable the calendar when contrato_vigente is false
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fecha_fin:
                              e.value instanceof Date
                                ? e.value.toISOString()
                                : "",
                          })
                        }
                        value={
                          typeof formData.fecha_fin === "string"
                            ? new Date(formData.fecha_fin)
                            : null
                        }
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full  justify-content-between  ">
                      <label
                        htmlFor="anios"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginTop: "15px" }}
                      >
                        Años Duracion:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="anios"
                        required
                        name="anios"
                        style={{
                          marginTop: "15px",
                          width: "220px",
                          marginLeft: "15px",
                        }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            anio_duracion: e.currentTarget.value,
                          })
                        }
                        value={formData.anio_duracion}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "-155px", marginLeft: "65px" }}>
                    <div className="flex flex-wrap w-full h-full  justify-content-between">
                      <label
                        htmlFor="horas"
                        className="text-3xl font-medium w-auto min-w-min"
                      >
                        Horas:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="horas"
                        name="horas"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            horas_diarias: e.currentTarget.value,
                          })
                        }
                        value={formData.horas_diarias}
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full  justify-content-between  ">
                      <label
                        htmlFor="cargo"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginTop: "15px" }}
                      >
                        Cargo:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="cargo"
                        name="cargo"
                        style={{ marginTop: "15px" }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cargo: e.currentTarget.value,
                          })
                        }
                        value={formData.cargo}
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full  justify-content-between  ">
                      <label
                        htmlFor="salario"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginTop: "15px" }}
                      >
                        Salario:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="salario"
                        name="salario"
                        style={{ marginTop: "15px", marginLeft: "15px" }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salario: e.currentTarget.value,
                          })
                        }
                        value={formData.salario}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "-158px", marginLeft: "675px" }}>
                    <div className="flex flex-wrap w-full h-full justify-content-between">
                      <label
                        htmlFor="tiempo_dedicacion"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginRight: "15px" }}
                      >
                        Tiempo Dedicación:
                      </label>
                      <Dropdown
                        className="text-2xl"
                        id="tiempo_dedicacion"
                        name="tiempo_dedicacion"
                        options={tiempoDedicacionOptions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tiempo_dedicacion: e.value,
                          })
                        }
                        value={formData.tiempo_dedicacion}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Seleccionar....."
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full justify-content-between">
                      <label
                        htmlFor="salario_publico"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginTop: "5px" }}
                      >
                        Salario Público:
                      </label>
                      <Dropdown
                        className="text-2xl"
                        id="salario_publico"
                        name="salario_publico"
                        style={{ marginTop: "15px" }}
                        options={salariopublicoOptions}
                        onChange={(e) =>
                          setFormData({ ...formData, salario_publico: e.value })
                        }
                        value={formData.salario_publico}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Seleccionar....."
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full justify-content-between">
                      <label
                        htmlFor="contratoVigente"
                        className="text-3xl font-medium w-auto min-w-min"
                        style={{ marginTop: "15px" }}
                      >
                        Contrato Vigente:
                      </label>
                      <label className="switch" style={{ marginTop: "15px" }}>
                        <input
                          type="checkbox"
                          id="contratoVigente"
                          checked={formData.contrato_vigente}
                          onChange={handleContratoVigenteToggle}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  <div style={{ marginLeft: "35%" }}>
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
                          label="Cancelar"
                          className="w-full text-3xl min-w-min"
                          rounded
                          onClick={resetForm}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-column align-items-center justify-content-center ml-4">
                <FileUpload
                  name="pdf"
                  chooseLabel="Escoger"
                  uploadLabel="Cargar"
                  cancelLabel="Cancelar"
                  style={{ marginBottom: "50px", marginLeft: "15px" }}
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
              <th>Fecha Inicio</th>
              <th>Fecha Fin </th>
              <th>Años de Duración</th>
              <th>Horas</th>
              <th>Cargo</th>
              <th>Salario</th>
              <th>Tiempo de Dedicación</th>
              <th>Salario Público</th>
              <th>Contrato Vigente</th>
              <th>Operaciones</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {contra1.map((contrato) => (
              <tr
                className="text-center"
                key={contrato.id_contrato?.toString()}
              >
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
                <td>{contrato.anio_duracion}</td>
                <td>{contrato.horas_diarias}</td>
                <td>{contrato.cargo}</td>
                <td>{contrato.salario}</td>
                <td>{contrato.tiempo_dedicacion}</td>
                <td>{contrato.salario_publico}</td>
                <td>{getContratoVigenteText(contrato.contrato_vigente)}</td>
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
                    onClick={() => handleEdit(contrato.id_contrato?.valueOf())}
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
                      handleDelete(contrato.id_contrato?.valueOf())
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

export default ContratoContext;
