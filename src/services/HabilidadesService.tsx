import axios from "axios";

export class HabilidadesService {
    baseUrl = "http://localhost:8080/api/habilidades/";

    //Metodo para listar todas las habilidades
    getAll() {
        return axios.get(this.baseUrl + "read").then((res) => res.data);
    }
    //Crear
    save(habilidades: any) {
        return axios.post(this.baseUrl + "create", habilidades).then((res) => res.data);
    }

    //(Eliminado lógico)
    delete(id: number) {
        return axios.delete(`${this.baseUrl}delete/${id}`).then((res) => res.data);
    }
    //Metodo para actualizar una habilidad basado en el id de la misma
    update(id: number, user: any) {
        return axios
            .put(this.baseUrl + "update/" + id.toString(), user)
            .then((res) => res.data);
    }
}