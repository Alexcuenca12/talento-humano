import axios from "axios";

export class vDocenteService {
  baseUrl = "http://localhost:8080/api/vDocente/";

  getAll() {
    return axios.get(this.baseUrl + "read").then((res) => res.data);
  }

  getID(id: number) {
    return axios.get(`${this.baseUrl}list/${id}`).then((res) => res.data);
  }
}
