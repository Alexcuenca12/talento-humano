import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "primereact/resources/themes/lara-light-indigo/theme.css";
//import 'primeflex/primeflex.css';


//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

// layout
import "/node_modules/primeflex/primeflex.css"

import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
  );
