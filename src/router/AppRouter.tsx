import React from "react";
import LoginContext from "../views/Login/LoginContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
export function AppRouter() {
  return (
    <Router>
      <LoginContext />
    </Router>
  );
}
