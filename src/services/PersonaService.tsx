import axios, {AxiosInstance} from "axios";
import {IPersona} from "../interfaces/Primary/IPersona";

export class PersonaService {
  baseUrl = "http://localhost:8080/api/persona/";

  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseUrl
    });
  }
    //Metodo para listar todas los horarios
    getAll() {
    return this.api.get(this.baseUrl + "read").then((res) => res.data);
  }
    //Crear
    save(persona: IPersona) {
        return this.api.post(this.baseUrl + "create", persona).then((res) => res.data);
      }

  //(Eliminado lógico)
    delete(id: number) {
    return this.api.delete(`${this.baseUrl}delete/${id}`).then((res) => res.data);
  }
  //Metodo para actualizar un horario basado en el id de la misma
  update(id: number , user: any) {
    return this.api
      .put(this.baseUrl + "update/" + id.toString(), user )
      .then((res) => res.data);
  }
}