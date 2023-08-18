import { IPersona } from "./IPersona";

export interface ICapacitaciones {
  id_capacitaciones?: number | null;
  institucion: string;
  tipo_evento: string;
  nombre_evento: string;
  area_estudios: string ;
  tipo_certificado: string;
  fecha_inicio: string ;
  fecha_fin: string ;
  numero_dias: number | null;
  cantidad_horas: number | null;
  evidencia: string;

  persona: IPersona | null;
}
