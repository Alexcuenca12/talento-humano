import {IPersona} from "./IPersona";

export interface ICargaFamiliar {
  id_cargaFamiliar?: number;
  cedula: String;
  nombre_pariente: String;
  apellido_pariente: String;
  fecha_nacimiento?: Date | null;
  persona: IPersona;
}
