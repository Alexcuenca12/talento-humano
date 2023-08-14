import axios, {AxiosInstance} from "axios";
import {IEva_Docente} from "../interfaces/Primary/IEva_Docente";

const API_BASE_URL = 'http://localhost:8080/api/evaluaciondocente';

class EvaluacionService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL
        });
    }

    getAllItems() {
        return this.api.get('/read').then(response => response.data)
            .catch(error => {
                throw error
            })
    }

    createItem(item: IEva_Docente) {
        return this.api.post('/create', item).then(response => response.data)
            .catch(error => {
                throw error
            })
    }

    updateItem(itemId: number, item: IEva_Docente) {
        return this.api.put(`/update/${itemId}`, item)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    }

    deleteItem(itemId: number) {
        return this.api.delete(`/delete/${itemId}`)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    }
}

const evaluacionService = new EvaluacionService();
export default evaluacionService;
