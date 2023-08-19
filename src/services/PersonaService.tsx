import axios, {AxiosInstance} from "axios";
import {IResumen} from "../interfaces/Primary/IResumen";

const API_BASE_URL = 'http://localhost:8080/api/persona';

class PersonaService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL
        });
    }

    getSummary(id: number) {
        return this.api.get(`/combined/${id}`).then(response => response.data as IResumen)
            .catch(error => {
                throw error
            })
    }
}

const personaService = new PersonaService();
export default personaService;
