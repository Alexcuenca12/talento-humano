import axios from "axios";
import {IPersona} from "../interfaces/Primary/IPersona";

export class VistaPersonaService {
  baseUrl = "http://localhost:8080/api/vistaPersona/";

  getAll(s: String, data: IPersona) {
    return axios.get(this.baseUrl + "{cedula}").then((res) => res.data);
  }
};