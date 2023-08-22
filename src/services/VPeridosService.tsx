import axios from "axios";

export class VPeridosService {
  baseUrl = "http://localhost:8080/api/vPerido/";

  getAll() {
    return axios.get(this.baseUrl + "read").then((res) => res.data);
  }

  getID(id: number) {
    return axios.get(`${this.baseUrl}list/${id}`).then((res) => res.data);
  }
}
