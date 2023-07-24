import {IPersona} from "./IPersona";

export interface ICapacitaciones {
  id_capacitaciones?: number;
  institucion: String;
  tipo_evento: string | null;
  nombre_evento: String;
  area_estudios: string | null;
  tipo_certificado: String;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
  numero_dias: number;
  cantidad_horas: number;

  persona: IPersona;
}
