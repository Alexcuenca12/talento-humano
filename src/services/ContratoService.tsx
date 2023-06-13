import axios from "axios";

export class ContratoService {
    baseUrl = "http://localhost:8080/api/contrato/";

    //Metodo para listar todas los Contratos
    getAll() {
    return axios.get(this.baseUrl + "read").then((res) => res.data);
  }
    //Crear
    save(contrato: any) {
        return axios.post(this.baseUrl + "create", contrato).then((res) => res.data);
      }

  //(Eliminado lógico)
    delete(contrato: any) {
    return axios
      .put(this.baseUrl + "eliminar/" + contrato.id_contrato, contrato)
      .then((res) => res.data);
  }
  //Metodo para actualizar un Contrato basado en el id de la misma
  update(contrato: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + contrato.id_contrato, contrato)
      .then((res) => res.data);
  }
}