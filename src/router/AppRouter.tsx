import React from "react";
import LoginContext from "../views/Login/LoginContext";
import ContratoContext from "../views/Contrato/ContratoContext";
import ContratoForm from "../views/Contrato/ContratoForm";
import ContratoList from "../views/Contrato/ContratoList";
import { BrowserRouter as Router, Route } from "react-router-dom";
export function AppRouter() {
  return (
    <Router>

      <ContratoList/>
      
      
    </Router>
  );
}
