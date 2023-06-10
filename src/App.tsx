
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './views/Login/LoginContext';
import ContratoContextProvider from './views/Contrato/ContratoContext';
import ContratoFinal from './views/Contrato/ContratoFinal';
import HorarioFinal from './views/Horario/HorarioFinal';


//import 'bootstrap/dist/css/bootstrap.css';
import { useReducer } from "react";
import { AppRouter } from "./router/AppRouter";

import { authReducer } from "./reducers/authReducer";
import { AuthContext } from "./reducers/AuthContext";

const init = () => {
  let sessionUser: any = sessionStorage.getItem("user");
  let user: any;
  if (!sessionUser) {
    user = sessionUser;
  } else {
    user = JSON.parse(sessionUser);
  }
  return user;
};


function App() {
  const [user, dispatchUser] = useReducer(authReducer, {}, init);

  return (

  //<ContratoFinal/>
  //<HorarioFinal/>

    <AuthContext.Provider value={{ user, dispatchUser }}>
      <AppRouter />
    </AuthContext.Provider>

  );
}

export default App;
