import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./home/Home";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { NavBarDoc } from "../../common/NavBarDoc";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";
import { NavBar } from "../../common/NavBar";
import Footer  from "../../common/Footer";
import PersonaContext from "../Persona/PersonaContext";
import ContratoContext from "../Contrato/ContratoContext";
import ContratoFinal from "../Contrato/ContratoContext";
import Instrucc_FormalContext from "../Instruc_Formal/Instrucc_FormalContext";
import HorarioContext from "../Horario/HorarioContext";
import HorarioFinal from "../Horario/HorarioContext";
import CapacitacionesContext from "../Capacitaciones/CapacitacionesContext";
import Eva_Docente from "../Eva_Docente/EvaDocente";
import CargaFamiliarContext from "../CargaFamiliar/CargaFamiliarContext";
import Experiencia from "../Experiencia/Experiencia";
import HabilidadesContext from "../Habilidades/HabilidadesContext";
import {ListadoDocentes} from "../Resumen/ListadoDocentes";
import Habilidades from "../Habilidades/Habilidades";


export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const rol = userObj.rol;
  const toast = useRef<Toast>(null);
  console.log(userObj.rol);

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
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBarDoc />
                    <Home />
                    <Footer />
                  </>
                ) : (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                )}
              </Route>

              <Route path="/login">
                {rol === 1 ? (
                  <NavBarDoc />
                ) : rol === 2 ? (
                  <NavBar />
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/ficha">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <PersonaContext />
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/contrato">
                {rol === 1 ? (
                  <>
                    <NavBar />
                    <ContratoContext/>
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <ContratoContext />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/instruccion">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <Instrucc_FormalContext/>
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/horario">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                      <HorarioFinal/>
                      <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/carga">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <CargaFamiliarContext />
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/capacitaciones">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <CapacitacionesContext />
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/experiencia">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <Experiencia/>
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/evaluacion">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <Eva_Docente />
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/habilidad">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <Habilidades/>
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/resumen">
                {rol === 1 ? (
                  <>
                    <NavBarDoc />
                    <ListadoDocentes/>
                    <Footer />
                  </>
                ) : rol === 2 ? (
                  <>
                    <NavBar />
                    <Footer />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="*">
                {rol === 1 ? (
                  <NavBarDoc />
                ) : rol === 2 ? (
                  <NavBar />
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
