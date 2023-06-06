export interface ICapacitaciones {
  id_capacitaciones?: Number;
  institucion: String;
  tipo_evento: String;
  nombre_evento: String;
  area_estudios: String;
  tipo_certicado: String;
  fecha_inicio: Date;
  fecha_fin: Date;
  numero_dias: Number;
  cantidad_horas: Number;
  evidencia: String;
  persona: Object;
}
