import React, { useEffect, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { VDocentes } from "../../interfaces/Secondary/VDocentes";
import { vDocenteService } from "../../services/VDocentesService";
import { useHistory } from "react-router-dom";
import ResumenDocente from "../ResumenDocente2/ResumenDocente";

function DocenteContext() {
  const [docentes, setDocentes] = useState<VDocentes[]>([]);
  const docenteService = new vDocenteService();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocente, setSelectedDocente] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    docenteService
      .getAll()
      .then((data) => {
        setDocentes(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocentes = docentes.filter((docente) => {
    const nombresCompletos = `${docente.nombres} ${docente.apellidos}`;
    return (
      nombresCompletos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.docente_codigo.includes(searchTerm)
    );
  });

  // Ordenar los resultados por apellido
  const sortedDocentes = filteredDocentes.sort((a, b) => {
    const apellidoA = a.apellidos.toLowerCase();
    const apellidoB = b.apellidos.toLowerCase();
    if (apellidoA < apellidoB) return -1;
    if (apellidoA > apellidoB) return 1;
    return 0;
  });

  // Manejar el clic en el botón para establecer el docente seleccionado
  const handleDocenteClick = (codigoDocente: string) => {
    setSelectedDocente(codigoDocente);
    // Redirigir a la ruta /resumendoc con el código de docente como parámetro
    history.push(`/resumendoc/${codigoDocente}`);
  };

  return (
    <Fieldset className="fgrid col-fixed">
      <Card
        className="border-solid border-blue-800 border-3 flex-1 w-full h-full flex-wrap"
      >
        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-semibold lg:md-2 w-full h-full max-w-full max-h-full min-w-min">
              Docentes
            </h1>
          </Divider>
        </div>

        <div className="flex justify-center flex-wrap">
          <div className="ml-auto">
            <InputText
              type="text"
              className="text-2xl"
              style={{ width: "210px" }}
              placeholder="Buscar por Nombre o Cédula"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <table
            style={{ minWidth: "50rem" }}
            className="mt-5 w-full h-full text-3xl font-medium"
          >
            <thead>
              <tr style={{ backgroundColor: "#0C3255", color: "white" }}>
                <th>Cédula</th>
                <th>Nombres</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedDocentes.map((docente) => (
                <tr
                  className="text-center"
                  key={docente.id_docente?.toString() || ""}
                >
                  <td>{docente.docente_codigo}</td>
                  <td>{`${docente.apellidos} ${docente.nombres} `}</td>
                  <td>
                    <Button
                      type="button"
                      className=""
                      icon="pi pi-search"
                      style={{
                        background: "#ff9800",
                        borderRadius: "5%",
                        fontSize: "25px",
                        width: "50px",
                        color: "black",
                        justifyContent: "center",
                        marginRight: "8px",
                      }}
                      onClick={() =>
                        handleDocenteClick(docente.docente_codigo)
                      }
                    />
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

export default DocenteContext;
