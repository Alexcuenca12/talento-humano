import axios from "axios";
import { InstruccionFormalData  } from '../interfaces/Primary/IInstrucc_Formal';

export class Instruc_FormalService {
  //url base para el componente usuario, esta url se encuentra expresada
  //en la api
  baseUrl = "http://localhost:8080/api/InstruccionFormal/";

  getAll() {
    //Método para listar todas los Usuarios
    return axios.get(this.baseUrl + "read").then((res) => res.data);
  }
  save(instruccion: any) {
    // Método para guardar la instrucción
    return axios.post(this.baseUrl + "create", instruccion).then((res) => res.data);
  }

  //Método para cambiar el estado enabled a false de un Usuario (Eliminado lógico)
  delete(id: number) {
    return axios.delete(`${this.baseUrl}delete/${id}`).then((res) => res.data);
  }
  //Método para actualizar un usuario basado en el id del mismo
  update(id: number, user: any) {
    return axios
      .put(this.baseUrl + "update/" + id.toString(), user)
      .then((res) => res.data);
  }
}