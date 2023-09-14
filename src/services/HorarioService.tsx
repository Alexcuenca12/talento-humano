import axios from "axios";

export class HorarioService {
  baseUrl = "http://localhost:8080/api/horario/";

  //Metodo para listar todas los horarios
  getAll() {
    return axios.get(this.baseUrl + "read").then((res) => res.data);
  }
  //Crear
  save(horario: any) {
    return axios.post(this.baseUrl + "create", horario).then((res) => res.data);
  }

  getAllByHabilidades(id: number) {
    return axios
      .get(`${this.baseUrl}readHorario/${id}`)
      .then((res) => res.data);
  }

  getAllByPersona(id: number) {
    return axios
      .get(`${this.baseUrl}readHorarioPersona/${id}`)
      .then((res) => res.data);
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
