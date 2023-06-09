import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './views/Login/LoginContext';
import CargaFamiliar from "./views/CargaFamiliar/CargaFamiliar";

import 'bootstrap/dist/css/bootstrap.css';
import CapacitacionesContext from "./views/Capacitaciones/CapacitacionesContext";

function App() {
  return (
  <CapacitacionesContext/>
  );
}

export default App;
