import axios from "axios";
import {ICargaFamiliar} from "../interfaces/Primary/ICargaFamiliar";

export class CargaFamiliarService {
    baseUrl: string = "http://localhost:8080/api/CargaFamiliar/";

    getAll() {
        //Método para listar todas los Usuarios
        return axios.get<ICargaFamiliar[]>(this.baseUrl + "read").then((res) => res.data);
    }

    saveCarga(cargaFamiliar: ICargaFamiliar) {
        return axios.post(this.baseUrl + "create", cargaFamiliar).then((res) => res.data);
    }

    updateCarga(id: number, cargaFamiliar: ICargaFamiliar) {
        return axios.put<ICargaFamiliar>(this.baseUrl + `update/${id}`, cargaFamiliar).then((res) => res.data);
    }

    deleteCarga(id: number) {
        return axios.delete(this.baseUrl + `delete/${id}`).then((res) => res.data);
    }
}

