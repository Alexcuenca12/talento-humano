import axios from "axios";
import {ICapacitaciones} from "../interfaces/Primary/ICapacitaciones";


export class CapacitacionesService {
    baseUrl: string = "http://localhost:8080/api/capacitaciones/";

    getAllCap() {
        //Método para listar todas los Usuarios
        return axios.get<ICapacitaciones[]>(this.baseUrl + "read").then((res) => res.data);
    }

    guardarCapacitaciones(capacitaciones: ICapacitaciones){
        return axios.post(this.baseUrl + "create", capacitaciones).then((res)=> res.data)
    }

    updateCapacitaciones(id: number, user: any){
        return axios.put(this.baseUrl + "update"+id.toString(), user).then((res)=> res.data)
    }

    deleteCapacitaciones(id: number) {
        return axios.delete(this.baseUrl + `delete/${id}`).then((res) => res.data);
    }
}