import axios, {AxiosInstance} from "axios";

const API_BASE_URL = 'http://localhost:8080/api/periodoacademico';

class Periodo_AcaService{
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL
        });
    }

    getAllItems(){
        return this.api.get('/read').then(response => response.data)
            .catch(error=>{
                throw error
            })
    }
}

const academicPeriodService = new Periodo_AcaService();
export default academicPeriodService;
