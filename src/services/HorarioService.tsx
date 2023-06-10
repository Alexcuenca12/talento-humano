import axios from "axios";

export class HorarioService {
    baseUrl = "localhost:8080/api/horario";

    //Metodo para listar todas los horarios
    getAll() {
    return axios.get(this.baseUrl + "listar").then((res) => res.data);
  }
    //Crear
    save(horario: any) {
        return axios.post(this.baseUrl + "/create", horario).then((res) => res.data);
      }

  //(Eliminado lógico)
    delete(horario: any) {
    return axios
      .put(this.baseUrl + "eliminar/" + horario.horario_id, horario)
      .then((res) => res.data);
  }
  //Metodo para actualizar un horario basado en el id de la misma
  update(horario: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + horario.horario_id, horario)
      .then((res) => res.data);
  }
}