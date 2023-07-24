import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "../../styles/Horario.css";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Calendar } from "primereact/calendar";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { IHorarioData } from "../../interfaces/Primary/IHorario";
import { HorarioService } from "../../services/HorarioService";
import swal from "sweetalert";

import { IPeriodo_Aca } from "../../interfaces/Primary/IPeriodo_Aca";
import { PeriodoAcaService } from "../../services/Periodo_AcaService";

function HorarioContext() {
  const [hora1, sethora1] = useState<IHorarioData[]>([]);
  const [formData, setFormData] = useState<IHorarioData>({
    id_horario: 0,
    periodo: "",
    horario: "",
    dias: "",
    distributivo: "",
    id_periodo: null,
    id_persona: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const horaService = new HorarioService();

  useEffect(() => {
    horaService
      .getAll()
      .then((data) => {
        sethora1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.horario ||
      !formData.periodo ||
      !formData.dias ||
      !formData.distributivo
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    horaService
      .save(formData)
      .then((response) => {
        resetForm();
        swal("Horario", "Datos Guardados Correctamente", "success");
        horaService
          .getAll()
          .then((data) => {
            sethora1(data);
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
          horaService
            .delete(id)
            .then(() => {
              sethora1(hora1.filter((hora) => hora.id_horario !== id));
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
      const editItem = hora1.find((hora) => hora.id_horario === id);
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
      horaService
        .update(Number(editItemId), formData as IHorarioData)
        .then((response) => {
          swal({
            title: "Horario",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({
            periodo: "",
            horario: "",
            dias: "",
            distributivo: "",
            id_periodo: null,
            id_persona: null,
          });
          sethora1(
            hora1.map((hora) =>
              hora.id_horario === editItemId ? response : hora
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
      periodo: "",
      horario: "",
      dias: "",
      distributivo: "",
      id_periodo: null,
      id_persona: null,
    });
    setEditMode(false);
    setEditItemId(undefined);
  };

  //Todo los necesario para el periodo academico
  //
  //
  //
  const fileUploadRef = useRef<FileUpload>(null);
  const [per1, setper1] = useState<IPeriodo_Aca[]>([]);
  const [formDataP, setFormDataP] = useState<IPeriodo_Aca>({
    id_periodoacademico: 0,
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
    horario_diario: "",
    descripcion: "",
    evidencia: "",
  });

  const [editModeP, setEditModeP] = useState(false);
  const [editItemIdP, setEditItemIdP] = useState<number | undefined>(undefined);
  const periodoService = new PeriodoAcaService();

  useEffect(() => {
    periodoService
      .getAll()
      .then((dataP) => {
        setper1(dataP);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const customBytesUploaderP = (event: FileUploadSelectEvent) => {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        const base64data = reader.result as string;
        setFormDataP({ ...formDataP, evidencia: base64data });

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

  const decodeBase64P = (base64Data: string) => {
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
      link.download = "archivoPe.pdf";
      link.click();
      swal({
        title: "Periodo",
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

  const handleSubmitP = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formDataP.horario_diario ||
      !formDataP.descripcion ||
      !formDataP.evidencia
    ) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    periodoService
      .save(formDataP)
      .then((responseP) => {
        resetFormP();
        swal("Periodo", "Datos Guardados Correctamente", "success");
        periodoService
          .getAll()
          .then((dataP) => {
            setper1(dataP);
          })
          .catch((error) => {
            console.error("Error al obtener los datos periodo:", error);
          });
      })
      .catch((error) => {
        console.error("Error al enviar el formulario periodo:", error);
      });
  };

  const handleDeleteP = (id: number | undefined) => {
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
      }).then((confirmedP) => {
        if (confirmedP) {
          periodoService
            .delete(id)
            .then(() => {
              setper1(
                per1.filter((periodo) => periodo.id_periodoacademico !== id)
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

  const handleEditP = (id: number | undefined) => {
    if (id !== undefined) {
      const editItemP = per1.find(
        (periodo) => periodo.id_periodoacademico === id
      );
      if (editItemP) {
        setFormDataP(editItemP);
        setEditModeP(true);
        setEditItemIdP(id);
      }
    }
  };

  const handleUpdateP = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItemIdP !== undefined) {
      periodoService
        .update(Number(editItemIdP), formDataP as IPeriodo_Aca)
        .then((responseP) => {
          swal({
            title: "Periodo",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormDataP({
            nombre: "",
            fecha_inicio: "",
            fecha_fin: "",
            horario_diario: "",
            descripcion: "",
            evidencia: "",
          });
          setper1(
            per1.map((periodo) =>
              periodo.id_periodoacademico === editItemIdP ? responseP : periodo
            )
          );
          setEditModeP(false);
          setEditItemIdP(undefined);
        })
        .catch((error) => {
          console.error("Error al actualizar el formulario periodo:", error);
        });
    }
  };

  const resetFormP = () => {
    setFormDataP({
      nombre: "",
      fecha_inicio: "",
      fecha_fin: "",
      horario_diario: "",
      descripcion: "",
      evidencia: "",
    });
    setEditModeP(false);
    setEditItemIdP(undefined);
  };

  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3"
      >
        <Card className="text-center">
          <div className="h1-rem">
            <Divider align="center">
              <h1 className="text-7xl font-smibold lg:md-2">Horario</h1>
            </Divider>
          </div>

          <div className="flex justify-content-center flex-wrap">
            <form onSubmit={editMode ? handleUpdate : handleSubmit}>
              <div className="flex flex-wrap flex-row align-content-center">
                <div className="flex align-content-center">
                  <div className="flex flex-column flex-wrap gap-4 align-items-center justify-content-center ">
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center ">
                      <label
                        htmlFor="materia"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        Materia:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="materia"
                        name="materia"
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="horas"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        - Horario:
                      </label>
                      <InputText
                        id="horas"
                        name="horas"
                        className="text-2xl"
                        value={formData.horario}
                        onChange={(e) =>
                          setFormData({ ...formData, horario: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="ciclo"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        Ciclo:
                      </label>
                      <InputText className="text-2xl" id="ciclo" name="ciclo" />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="curso"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        Curso:
                      </label>
                      <InputText className="text-2xl" id="curso" name="curso" />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="carrera"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        Carrera:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="carrera"
                        name="carrera"
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="periodo"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        - Periodo:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="periodo"
                        name="periodo"
                        value={formData.periodo}
                        onChange={(e) =>
                          setFormData({ ...formData, periodo: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="dias"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        - Dias:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="dias"
                        name="dias"
                        value={formData.dias}
                        onChange={(e) =>
                          setFormData({ ...formData, dias: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-wrap w-full h-full align-items-center justify-content-center">
                      <label
                        htmlFor="distri"
                        className="text-3xl font-medium w-auto min-w-min pr-2"
                      >
                        - Distributivo:
                      </label>
                      <InputText
                        className="text-2xl"
                        id="distri"
                        name="distri"
                        value={formData.distributivo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            distributivo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                      <div className="flex align-items-center justify-content-center w-auto min-w-min">
                        <Button
                          type="submit"
                          label={editMode ? "Actualizar H" : "Guardar H"}
                          className="w-full text-3xl min-w-min "
                          rounded
                          onClick={editMode ? handleUpdate : handleSubmit}
                        />
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto min-w-min">
                        <Button
                          type="button"
                          label="Cancel H"
                          className="w-full text-3xl min-w-min"
                          rounded
                          onClick={resetForm}
                        />
                      </div>
                    </div>

                    <table
                      style={{ minWidth: "70rem" }}
                      className="mt-5  w-full h-full text-3xl font-medium"
                    >
                      <thead>
                        <tr
                          style={{ backgroundColor: "#0C3255", color: "white" }}
                        >
                          <th>Periodo</th>
                          <th>Horario</th>
                          <th>Dias</th>
                          <th>Operaciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hora1.map((horario) => (
                          <tr
                            className="text-center"
                            key={horario.id_horario?.toString()}
                          >
                            <td>{horario.periodo}</td>
                            <td>{horario.horario}</td>
                            <td>{horario.dias}</td>

                            <td>
                              <Button
                                type="button"
                                className="w-40 text-3xl min-w-min"
                                label="✎"
                                style={{
                                  background: "#ff0000",
                                  borderRadius: "10%",
                                  fontSize: "25px",
                                  width: "50px",
                                  color: "black",
                                  justifyContent: "center",
                                  marginRight: "5px", // Espacio entre los botones
                                }}
                                onClick={() =>
                                  handleEdit(horario.id_horario?.valueOf())
                                }
                                // Agrega el evento onClick para la operación de editar
                              />
                              <Button
                                type="button"
                                className="w-40  text-3xl min-w-min"
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
                                  handleDelete(horario.id_horario?.valueOf())
                                }
                                // Agrega el evento onClick para la operación de eliminar
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>

        <Card className="text-center">
          <div className="h1-rem mx-auto" style={{ maxWidth: "50%" }}>
            <div className="">
              <Divider align="center">
                <h4 className="text-7xl font-smibold lg:md-2">
                  Periodo Academico
                </h4>
              </Divider>
            </div>
            <div className="flex justify-content-center flex-wrap">
              <form onSubmit={editModeP ? handleUpdateP : handleSubmitP}>
                <div className="flex flex-wrap flex-row align-content-center">
                  <div className="flex align-content-center">
                    <div className="flex flex-column flex-wrap gap-4 align-items-center justify-content-center">
                      <div className="flex flex-column flex-wrap gap-4 align-items-center justify-content-center">
                        <div className="flex flex-wrap w-full h-full align-items-center ">
                          <label
                            htmlFor="horariod"
                            className="text-3xl font-medium w-auto min-w-min pr-2"
                          >
                            Horario Diario:
                          </label>
                          <InputText
                            className="text-2xl"
                            id="horariod"
                            name="horariod"
                            value={formDataP.horario_diario}
                            onChange={(e) =>
                              setFormDataP({
                                ...formDataP,
                                horario_diario: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex flex-wrap w-full h-full align-items-center ">
                          <label
                            htmlFor="descripcion"
                            className="text-3xl font-medium w-auto min-w-min pr-2"
                          >
                            Descripcion:
                          </label>
                          <InputTextarea
                            autoResize
                            rows={5}
                            cols={30}
                            className="text-2xl"
                            id="descripcion"
                            name="descripcion"
                            onChange={(e) =>
                              setFormDataP({
                                ...formDataP,
                                descripcion: e.currentTarget.value,
                              })
                            }
                            value={formDataP.descripcion}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-column align-items-center justify-content-center ml-4">
                      <label className="flex text-3xl font-medium">
                        Subir PDF:
                      </label>
                      <FileUpload
                        name="pdf"
                        chooseLabel="Escoger"
                        uploadLabel="Cargar"
                        cancelLabel="Cancelar"
                        customUpload
                        emptyTemplate={
                          <p className="m-0 p-button-rounded">
                            Arrastre y suelte los archivos aquí para cargarlos.
                          </p>
                        }
                        onSelect={customBytesUploaderP}
                        accept="application/pdf"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        type="submit"
                        label={editModeP ? "Actualizar P" : "Guardar P"}
                        className="w-full text-3xl min-w-min "
                        rounded
                        onClick={editModeP ? handleUpdateP : handleSubmitP}
                      />
                    </div>
                    <div className="flex align-items-center justify-content-center w-auto min-w-min">
                      <Button
                        type="button"
                        label="Cancel P"
                        className="w-full text-3xl min-w-min"
                        rounded
                        onClick={resetFormP}
                      />
                    </div>
                  </div>
                  <table
                    style={{ minWidth: "70rem" }}
                    className="mt-5  w-full h-full text-3xl font-medium"
                  >
                    <thead>
                      <tr
                        style={{ backgroundColor: "#0C3255", color: "white" }}
                      >
                        <th>Horario Diario</th>
                        <th>Descripción</th>
                        <th>Operaciones</th>
                        <th>Evidencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {per1.map((periodo) => (
                        <tr
                          className="text-center"
                          key={periodo.id_periodoacademico?.toString()}
                        >
                          <td>{periodo.horario_diario}</td>
                          <td>{periodo.descripcion}</td>
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
                                handleEditP(
                                  periodo.id_periodoacademico?.valueOf()
                                )
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
                                handleDeleteP(
                                  periodo.id_periodoacademico?.valueOf()
                                )
                              }
                              // Agrega el evento onClick para la operación de eliminar
                            />
                          </td>
                          <td>
                            {periodo.evidencia ? (
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
                                  decodeBase64P(periodo.evidencia!)
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
              </form>
            </div>
          </div>
        </Card>
      </Card>
    </Fieldset>
  );
}

export default HorarioContext;
