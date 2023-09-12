export interface ICapacitaciones {
  id_capacitaciones?: Number;
  institucion: string;
  tipo_evento: string;
  nombre_evento: string;
  area_estudios: string;
  tipo_certicado: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  numero_dias: Number;
  cantidad_horas: Number;
  evidencia: string;
  persona: Object;
}
