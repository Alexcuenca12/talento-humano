import axios from "axios";


export class PersonaService {
  baseUrl = "http://localhost:8080/api/persona/";

  // Método para obtener una persona por su ID
  getById(id: number) {
    return axios.get(`${this.baseUrl}combined/${id}`).then((res) => res.data);
  }

  //Metodo para listar todas los horarios
  getAll() {
    return axios.get(this.baseUrl + "read").then((res) => res.data);
  }
  //Crear
  save(persona: any) {
    return axios.post(this.baseUrl + "create", persona).then((res) => res.data);
  }

  //(Eliminado lógico)
  delete(id: number) {
    return axios.delete(`${this.baseUrl}delete/${id}`).then((res) => res.data);
  }
  //Metodo para actualizar un horario basado en el id de la misma
  update(id: number, user: any) {
    return axios
      .put(this.baseUrl + "update/" + id.toString(), user)
      .then((res) => res.data);
  }
}