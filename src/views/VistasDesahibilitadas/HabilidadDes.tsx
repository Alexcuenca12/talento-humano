import React, { useEffect, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import cardHeader from "../../shared/CardHeader";
import { Divider } from "primereact/divider";
import { IHabilidadesData } from "../../interfaces/Primary/IHabilidades";
import { HabilidadesService } from "../../services/HabilidadesService";
import swal from "sweetalert";

import { useParams } from "react-router-dom";

interface Params {
  codigoHabilidad: string;
}

function HabilidadContextDes() {
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const idPersona = userObj.id;

  const [habi1, sethabi1] = useState<IHabilidadesData[]>([]);
  const { codigoHabilidad } = useParams<Params>();
  const codigoHabilidadNumber = Number(codigoHabilidad);

  const [formDisabled, setFormDisabled] = useState(false);

  const [formData, setFormData] = useState<IHabilidadesData>({
    id_habilidades: 0,
    descripcion: "",
    persona: { id_persona: idPersona },
  });

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);

  const habilidadService = new HabilidadesService();

  useEffect(() => {
    habilidadService
      .getAllByHabilidades(codigoHabilidadNumber)
      .then((data) => {
        if (data.length > 0) {
          const contratoData = data[0];
          setFormDisabled(true);
          // Actualiza el estado local aquí
          setFormData({
            ...formData,
            id_habilidades: contratoData.id_habilidades,
            descripcion: contratoData.descripcion,
          });
          sethabi1(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.descripcion) {
      swal("Advertencia", "Por favor, complete todos los campos", "warning");
      return;
    }

    habilidadService
      .save(formData)
      .then((response) => {
        resetForm();
        console.log("guardado: ", formData);
        swal("Habilidad", "Datos Guardados Correctamente", "success");
        habilidadService
          .getAll()
          .then((data) => {
            sethabi1(data);
            console.log("datos son: ", data);
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
      habilidadService
        .update(Number(editItemId), formData as IHabilidadesData)
        .then((response) => {
          swal({
            title: "Habilidad",
            text: "Datos actualizados correctamente",
            icon: "success",
          });
          setFormData({ ...formData });
          sethabi1(
            habi1.map((habi) =>
              habi.id_habilidades === editItemId ? response : habi
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
      descripcion: "",
      persona: null,
    });
    setEditMode(false);
    setEditItemId(undefined);
  };

  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3"
      >
        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2">Habilidades</h1>
          </Divider>
        </div>
        <div className="flex justify-content-center ">
          <form onSubmit={editMode ? handleUpdate : handleSubmit}>
            <div className="flex align-content-center w-auto max-w-full">
              <InputTextarea
                autoResize
                rows={5}
                cols={30}
                disabled={formDisabled}
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Describa su habilidad"
                className="w-max text-2xl "
              />
            </div>
          </form>
        </div>

        <table
          style={{ minWidth: "70rem" }}
          className="mt-5  w-full h-full text-3xl font-medium"
        >
          <thead>
            <tr style={{ backgroundColor: "#0C3255", color: "white" }}>
              <th>Nº de Registro</th>
              <th>Descripciones Agregadas</th>
            </tr>
          </thead>
          <tbody>
            {habi1.map((habilidad) => (
              <tr
                className="text-center"
                key={habilidad.id_habilidades?.toString()}
              >
                <td>{habilidad.id_habilidades?.toString()}</td>
                <td>{habilidad.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Fieldset>
  );
}
export default HabilidadContextDes;
