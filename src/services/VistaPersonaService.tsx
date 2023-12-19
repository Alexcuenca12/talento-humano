import axios from "axios";
import { AxiosInstance } from "axios/index";
import { environment } from "../environments/environment";

export class VistaPersonaService {
  baseUrl =  `${environment.baseUrl}api/fenix/cedula/`;

  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }
  getByCedula(cedula: string) {
    return this.api
      .get(`${this.baseUrl}${cedula}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
