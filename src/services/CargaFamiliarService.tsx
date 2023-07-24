import axios, {AxiosInstance} from "axios";
import {ICargaFamiliar} from "../interfaces/Primary/ICargaFamiliar";

const API_BASE_URL = 'http://localhost:8080/api/CargaFamiliar'
export class CargaFamiliarService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL
        });
    }
    getAll() {
        //Método para listar todas los Usuarios
        return this.api.get( "/read").then((res) => res.data);
    }

    saveCarga(cargaFamiliar: ICargaFamiliar) {
        return this.api.post( "/create", cargaFamiliar).then((res) => res.data)
            .catch(error => {
            throw error
        })
    }

    updateCarga(id: number, cargaFamiliar: ICargaFamiliar) {
        return this.api.put(`/update/${id}`, cargaFamiliar).then((res) => res.data)
            .catch(error => {
                throw error
            })
    }

    deleteCarga(id: number) {
        return this.api.delete( `/delete/${id}`).then((res) => res.data);
    }
}

