import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../styles/Capacitacitaciones.css";
import cardHeader from "../../shared/CardHeader";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { ICapacitaciones } from "../../interfaces/Primary/ICapacitaciones";
import { CapacitacionesService } from "../../services/CapacitacionesService";
import { ICargaFamiliar } from "../../interfaces/Primary/ICargaFamiliar";
import { CargaFamiliarService } from "../../services/CargaFamiliarService";
import { IPersona } from "../../interfaces/Primary/IPersona";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

export default function CapacitacionesContext() {
  const [institucion, setInstitucion] = useState("");

  const [fechaInicio, setFechaInicio] = useState<string | Date | Date[] | null>(
    null
  );
  const [fechaFin, setFechaFin] = useState<string | Date | Date[] | null>(null);
  const [selectEvento, setSelectEvento] = useState<string | null>(null);
  const [nombreEvento, setNombreEvento] = useState<string | null>(null);
  const [numeroDias, setNumeroDias] = useState<number | null>();
  const [cantidadHoras, setCantidadHoras] = useState<number | null>();
  const [isEditMode, setIsEditMode] = useState(false);

  const [editingCapacitaciones, setEditingCapacitaciones] =
    useState<ICapacitaciones | null>(null);

  const comboEvento = [
    { label: "CONFERENCIA", value: "CONFERENCIA" },
    { label: "CONGRESO", value: "CONGRESO" },
    { label: "DIPLOMADO", value: "DIPLOMADO" },
    { label: "JORNADA", value: "JORNADA" },
    { label: "PANEL", value: "PANEL" },
    { label: "PASANTIA", value: "PASANTIA" },
    { label: "SEMINARIO", value: "SEMINARIO" },
    { label: "TALLER", value: "TALLER" },
    { label: "VISITA DE OBSERVACION", value: "VISITA DE OBSERVACION" },
  ];

  const [selectArea, setSelectArea] = useState<string | null>(null);
  const comboArea = [
    { label: "ADMINISTRACIÓN/OFICINA", value: "ADMINISTRACIÓN/OFICINA" },
    {
      label: "AGRICULTURA/PESCA/GANADERÍA",
      value: "AGRICULTURA/PESCA/GANADERÍA",
    },
    { label: "ARTE/DISEÑO/MEDIOS", value: "ARTE/DISEÑO/MEDIOS" },
    { label: "CIENTIFÍCO/INVESTIGACIÓN", value: "CIENTIFÍCO/INVESTIGACIÓN" },
    { label: "DIRECCIÓN/GERENCIA", value: "DIRECCIÓN/GERENCIA" },
    { label: "ECONOMÍA/CONTABILIDAD", value: "ECONOMÍA/CONTABILIDAD" },
    { label: "EDUCACIÓN BÁSICA/CURSOS", value: "EDUCACIÓN BÁSICA/CURSOS" },
    { label: "ENTRETENIMIENTO/DEPORTES", value: "ENTRETENIMIENTO/DEPORTES" },
    { label: "FABRICACIÓN", value: "FABRICACIÓN" },
    { label: "FINANZAS/BANCA", value: "FINANZAS/BANCA" },
    { label: "GOBIERNO", value: "GOBIERNO" },
    { label: "HOTELERÍA/TURISMO", value: "HOTELERÍA/TURISMO" },
    { label: "INFORMÁTICA HARDWARE", value: "INFORMÁTICA HARDWARE" },
    { label: "INFORMÁTICA SOFTWARE", value: "INFORMÁTICA SOFTWARE" },
    {
      label: "INFORMÁTICA/TELECOMUNICACIONES",
      value: "INFORMÁTICA/TELECOMUNICACIONES",
    },
    { label: "INGENERÍA/TÉCNICO", value: "INGENERÍA/TÉCNICO" },
    { label: "INTERNET", value: "INTERNET" },
    { label: "LEGAL/ASESORÍA", value: "LEGAL/ASESORÍA" },
    { label: "MARKETING/VENTAS", value: "MARKETING/VENTAS" },
    { label: "MATERIA PRIMA", value: "MATERIA PRIMA" },
    { label: "MEDICINA/SALUD", value: "MEDICINA/SALUD" },
    { label: "RECURSOS HUMANOS/PERSONAL", value: "RECURSOS HUMANOS/PERSONAL" },
    { label: "SIN ÁREA DE ESTUDIO", value: "SIN ÁREA DE ESTUDIO" },
    { label: "VENTAS AL CONSUMIDOR", value: "VENTAS AL CONSUMIDOR" },
  ];

  const [selectCertificado, setSelectCertificado] = useState(null);
  const comboCertificado = [
    { label: "APROBACIÓN", value: "APROBACIÓN" },
    { label: "ASISTENCIA", value: "ASISTENCIA" },
  ];

  const [capacitaciones, setCapacitaciones] = useState<ICapacitaciones[]>([]);

  useEffect(() => {
    fecthCapacitaciones();
  }, []);

  const fecthCapacitaciones = () => {
    new CapacitacionesService()
      .getAllCap()
      .then((data) => {
        setCapacitaciones(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cargaBodyTemplate = (capacitacionesObj: ICapacitaciones) => {
    return (
      <div className="flex">
        <div className="mr-4">
          <h2 className="text-3xl">Institucion: </h2>
          <p className="text-2xl">{capacitacionesObj.institucion}</p>
        </div>
        <div className="mr-4">
          <h2 className="text-3xl">Tipo de evento: </h2>
          <p className="text-2xl">{capacitacionesObj.tipo_evento}</p>
        </div>
        <div className="mr-4 ">
          <h2 className="text-3xl">Area de estudio: </h2>
          <p className="text-2xl">{capacitacionesObj.area_estudios}</p>
        </div>
        <div className=" ">
          <h2 className="text-3xl">Desde: </h2>
          <p className="text-2xl">{String(capacitacionesObj.fecha_inicio)}</p>
        </div>
      </div>
    );
  };

  const eliminarCapacitaciones = (id: number | undefined) => {
    if (id !== undefined) {
      new CapacitacionesService()
        .deleteCapacitaciones(Number(id))
        .then(() => {
          fecthCapacitaciones();
          window.alert("Capacitacion eliminada correctamente.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [selectCapacitacionesI, setSelectCapacitacionesI] =
    useState<ICapacitaciones >();
  const persona: IPersona = {
    id_persona: 1,
    apellidos: "",
    calle_principal: "",
    calle_secundaria: "",
    carnet_conadis: "",
    celular: "",
    ci_pasaporte: 0,
    correo: "",
    correo_institucional: "",
    discapacidad: false,
    edad: 0,
    estado_civil: "",
    etnia: "",
    foto: "",
    foto_carnet: "",
    genero: "",
    idioma_raiz: "",
    idioma_secundario: "",
    nombres: "",
    numero_casa: 0,
    pais_nacimiento: "",
    pais_residencia: "",
    parroquia_recidencial: "",
    porcentaje_discapacidad: "",
    referencia: "",
    sector: "",
    sexo: "",
    telefono: "",
    tipo_discapacidad: "",
    tipo_sangre: "",
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (selectCapacitacionesI && selectCapacitacionesI.id_capacitaciones !== null && selectCapacitacionesI.id_capacitaciones !== undefined) {
      const updatedCapacitaciones: ICapacitaciones = {
        ...selectCapacitacionesI,
        institucion: institucion,
        tipo_evento: selectEvento ?? "",
        nombre_evento: nombreEvento ?? "",
        area_estudios: selectArea ?? "",
        tipo_certificado: selectCertificado ?? "",
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        numero_dias: numeroDias ?? 0,
        cantidad_horas: cantidadHoras ?? 0,
      };
      const id: number = selectCapacitacionesI.id_capacitaciones || 0;

      new CapacitacionesService()
        .updateCapacitaciones(id, updatedCapacitaciones)
        .then((response) => {
          setCapacitaciones(
              capacitaciones.map(
                  (e)=> e.id_capacitaciones === selectCapacitacionesI.id_capacitaciones ? response: e
              )
          )
          console.log(response);
          fecthCapacitaciones();
          resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    } /*else {
      const newCapacitaciones: ICapacitaciones = {
        institucion: institucion,
        tipo_evento: selectEvento ?? "",
        nombre_evento: nombreEvento ?? "",
        area_estudios: selectArea ?? "",
        tipo_certificado: selectCertificado ?? "",
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        numero_dias: numeroDias ?? 0,
        cantidad_horas: cantidadHoras ?? 0,
        persona: persona
      };

      new CapacitacionesService()
        .guardarCapacitaciones(newCapacitaciones)
        .then((response) => {
          console.log(response);
          fecthCapacitaciones();
          resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    }*/
  };

  const editCapacitacion = (rowData: ICapacitaciones) => {
    setInstitucion(rowData.institucion.toString());
    setSelectEvento(rowData.tipo_evento);
    setSelectArea(rowData.area_estudios);
    setFechaInicio(
      rowData.fecha_inicio ? new Date(rowData.fecha_inicio.toString()) : new Date
    );
    setFechaFin(
      rowData.fecha_fin ? new Date(rowData.fecha_fin.toString()) : new Date()
    );
    setNumeroDias(rowData.numero_dias || 0);
    setCantidadHoras(rowData.cantidad_horas || 0);

    setIsEditMode(true);
    setEditingCapacitaciones(rowData);
  };

  const resetForm = () => {
    setSelectEvento(null);
    setSelectArea(null);
    setInstitucion("");
    setSelectCertificado(null);
    setFechaInicio(null);
    setFechaFin(null);
    setNumeroDias(0);
    setCantidadHoras(0);
  };

  const cancelarEdicion = () => {
    resetForm();
    setIsEditMode(false);
  };

  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-y-1"
      >
        <Card className="text-center ">
          <div className="h1-rem">
            <Divider align="center">
              <h1 className="text-7xl font-smibold lg:md-2">Capacitaciones</h1>
            </Divider>
          </div>
          <div className="flex justify-content-between flex-wrap">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap flex-row">
                <div className="flex align-items-center justify-content-center">
                  <div className="flex flex-column">
                    <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label className="text-3xl font-medium w-auto min-w-min">
                          Institucion:{" "}
                        </label>
                        <InputText
                          type="text"
                          placeholder="Ingrese la Institucion"
                          className="w-auto min-w-min text-2xl"
                          value={institucion}
                          onChange={({ target }) =>
                            setInstitucion(target.value)
                          }
                        />
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label className="text-3xl font-medium w-auto min-w-min">
                          Tipo de evento:
                        </label>
                        <Dropdown
                          options={comboEvento}
                          value={selectEvento}
                          onChange={(e) => setSelectEvento(e.value)}
                          placeholder="Seleccione"
                          className="border-round w-full min-w-min text-2xl"
                        />
                      </div>

                      <div className="flex align-items-center justify-content-center w-auto pr-2 ">
                        <label className="text-3xl font-medium w-auto min-w-min">
                          Area de estudio:
                        </label>
                        <Dropdown
                          options={comboArea}
                          value={selectArea}
                          onChange={(e) => setSelectArea(e.value)}
                          placeholder="Seleccione"
                          className="border-round w-full min-w-min text-2xl"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                      <div className="flex align-items-center justify-content-center w-auto pr-2 h-7rem">
                        <label className="text-3xl font-medium w-auto min-w-min">
                          Desde:
                        </label>
                        <Calendar
                          className=" w-full min-w-min "
                          id="desde"
                          name="desde"
                          placeholder="Fecha de inicio"
                          dateFormat="dd/mm/yy"
                          value={fechaInicio}
                          onChange={(e) =>
                            setFechaInicio(e.value as Date | null)
                          }
                          showIcon
                        />
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label className="text-3xl font-medium w-auto min-w-min">
                          Hasta:
                        </label>
                        <Calendar
                          className=" w-full min-w-min "
                          id="desde"
                          name="desde"
                          placeholder="Fecha de fin"
                          dateFormat="dd/mm/yy"
                          value={fechaFin}
                          onChange={(e) => setFechaFin(e.value as Date | null)}
                          showIcon
                        />
                      </div>

                      <div className="flex align-items-center justify-content-center w-auto pr-2 ">
                        <label className="text-3xl font-medium w-full  min-w-min">
                          Numero de dias:
                        </label>
                        <InputNumber
                          placeholder="Ingrese los dias"
                          className="w-auto min-w-min text-2xl"
                          value={numeroDias}
                          onValueChange={(e: InputNumberValueChangeEvent) =>
                            setNumeroDias(e.value as number)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap w-full h-full  justify-content-between  flex-grow-1 ">
                      <div className="flex align-items-center justify-content-center w-auto pr-2 h-7rem">
                        <label className="text-3xl font-medium w-full  min-w-min">
                          Nombre de evento:
                        </label>
                        <InputText
                          type="text"
                          placeholder="Ingrese el nombre"
                          className="w-auto min-w-min text-2xl"
                          value={nombreEvento || undefined}
                          onChange={({ target }) =>
                            setNombreEvento(target.value)
                          }
                        />
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto pr-2">
                        <label className="text-3xl font-medium w-full  min-w-min">
                          Tipo de certificado:
                        </label>
                        <Dropdown
                          options={comboCertificado}
                          value={selectCertificado}
                          onChange={(e) => setSelectCertificado(e.value)}
                          placeholder="Seleccione"
                        />
                      </div>

                      <div className="flex align-items-center justify-content-center w-auto pr-2 ">
                        <label className="text-3xl font-medium w-full  min-w-min">
                          N° de horas totales:{" "}
                        </label>
                        <InputNumber
                          placeholder="Ingrese los dias"
                          className="w-auto min-w-min text-2xl"
                          value={cantidadHoras}
                          onValueChange={(e: InputNumberValueChangeEvent) =>
                            setCantidadHoras(e.value as number)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
                      <div className="flex align-items-center justify-content-center w-auto min-w-min">
                        <Button
                          type="submit"
                          className="w-full text-3xl min-w-min "
                          rounded
                          label={isEditMode ? "Actualizar" : "Agregar"}
                        />
                      </div>
                      <div className="flex align-items-center justify-content-center w-auto min-w-min">
                        <Button
                          type="button"
                          label="Cancel"
                          className="w-full text-3xl min-w-min"
                          rounded
                          onClick={cancelarEdicion}
                        />
                      </div>
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
                    emptyTemplate={
                      <p className="m-0 p-button-rounded">
                        Arrastre y suelte los archivos aquí para cargarlos.
                      </p>
                    }
                  />
                </div>
              </div>
            </form>
          </div>

          <DataTable
            tableStyle={{ minWidth: "50rem" }}
            className="mt-5  w-full h-full text-3xl font-medium"
            value={capacitaciones}
          >
            <Column
              field="Capacitaciones"
              header="Capacitaciones"
              headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              body={cargaBodyTemplate}
            ></Column>
            <Column
              field="PDF"
              header="PDF"
              headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
            ></Column>
            <Column
              field="Acciones"
              header="Acciones"
              headerStyle={{ backgroundColor: "#0C3255", color: "white" }}
              body={(rowData: ICapacitaciones) => (
                <>
                  <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text mr-4"
                    onClick={() => editCapacitacion(rowData)}
                  />
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() =>
                      eliminarCapacitaciones(rowData.id_capacitaciones)
                    }
                  />
                </>
              )}
            />
          </DataTable>
        </Card>
      </Card>
    </Fieldset>
  );
}
