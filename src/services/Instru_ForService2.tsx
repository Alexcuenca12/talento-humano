import axios from "axios";

export class Instru_ForService2 {
    //url base para el componente usuario, esta url se encuentra expresada
    //en la api
    baseUrl = "http://localhost:8080/api/InstruccionFormal/";

    getAll() {
        //Método para listar todas los Usuarios
        return axios.get(this.baseUrl + "read").then((res) => res.data);
    }
    save(instruct: any) {
        //Método para guardar Usuarios
        return axios.post(this.baseUrl + "create", instruct).then((res) => res.data);
    }
    //Método para cambiar el estado enabled a false de un Usuario (Eliminado lógico)
    delete(user: any) {
        return axios
            .put(this.baseUrl + "delete/" + user.id_usuario, user)
            .then((res) => res.data);
    }
    //Método para actualizar un usuario basado en el id del mismo
    update(user: any) {
        return axios
            .put(this.baseUrl + "actualizar/" + user.id_usuario, user)
            .then((res) => res.data);
    }
}