import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./home/Home";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { NavBarDoc } from "../../common/NavBarDoc";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";
import { NavBar } from "../../common/NavBar";
import PersonaContext from "../Persona/PersonaContext";
import ContratoContext from "../Contrato/ContratoContext";
import Instrucc_FormalContext from "../Instruc_Formal/Instrucc_FormalContext";
import HorarioContext from "../Horario/HorarioContext";
import CapacitacionesContext from "../Capacitaciones/CapacitacionesContext";
import EvaDocente from "../Eva_Docente/EvaDocente";
import CargaFamiliarContext from "../CargaFamiliar/CargaFamiliarContext";
import Experiencia from "../Experiencia/Experiencia";
import HabilidadesContext from "../Habilidades/HabilidadesContext";
import PublicacionesContext from "../Publicaciones/PublicacionesContext";
import ResumenDocente from "../ResumenDocente2/ResumenDocente";
import Footer from "../../common/Footer";
import Recomendaciones from "../Recomendaciones/RecomendacionesContext";
import VDocentes from "../VDocentes/VDocentes";
import Resumen from "../Resumen/Resumen";
import PersonaCombinada from "../Persona/PersonaCombinada";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const rol = userObj.rol;
  const userId = userObj.id as number;
  const toast = useRef<Toast>(null);

  //Se utiliza a travez de Toast para mostrar mensajes de confirmacion/error.
  const showError = (errorPrincipal: string, detalleError: string) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <main>
        <div>
          <div>
            <Switch>
              {/* En este caso se usar la validacion de rol y si esta habilitado para direccionarse
              al NavBar correspondiente en este caso si es rol = 1 llevara al de Cliente y si es 
              rol = 2 llevara al de Administrador, si no coincide con ninguno de los dos
              sera llevado a un componente que informara que el usuario no existe o se encuentra 
              deshabilitado  */}
              <Route path="/dashboard/home">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <Home />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <Home />
                  </>
                ) : (
                  <>
                    <NavBar />
                  </>
                )}
              </Route>

              <Route path="/login">
                {rol === 1 ? (
                  <NavBar />
                ) : rol === 2 ? (
                  <NavBarDoc />
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/ficha">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <PersonaContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/contrato">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <ContratoContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <ContratoContext />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/instruccion">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <Instrucc_FormalContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/horario">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <HorarioContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <HorarioContext />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/carga">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <CargaFamiliarContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/capacitaciones">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <CapacitacionesContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/experiencia">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <Experiencia />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/evaluacion">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <EvaDocente />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/habilidad">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <HabilidadesContext />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/recomendacion">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <Recomendaciones />
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/publicacion">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <PublicacionesContext />
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/resumen">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <Resumen />
                    <PersonaCombinada personaId={userId} />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <Resumen />
                    <PersonaCombinada personaId={userId} />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/docentes">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <VDocentes />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <VDocentes />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/resumendoc/:codigoDocente">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <ResumenDocente />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <ResumenDocente />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="*">
                {rol === 1 ? (
                  <NavBar />
                ) : rol === 2 ? (
                  <NavBarDoc />
                ) : (
                  <NavBarUserDisabled />
                )}
                <Redirect to="/dashboard/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
};
