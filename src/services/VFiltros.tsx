import axios from "axios";

export class VFiltrosService {
  baseUrl = "http://localhost:8080/api/vFiltros/";

  async getFiltros() {
    try {
      const response = await axios.get(this.baseUrl + "read");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  getFiltrosById = async (id: any) => {
    try {
      const response = await axios.get(this.baseUrl + "list/" + id);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos por ID:", error);
      throw error;
    }
  };
}
