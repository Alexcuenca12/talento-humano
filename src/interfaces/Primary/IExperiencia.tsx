export interface IExperiencia {
  id_experiencia?: Number;
  institucion: String;
  puesto: String;
  area_trabajo: String;
  fecha_inicio: Date;
  fecha_fin: Date;
  actividades: String;
  estado: Boolean;
  certificado_trabajo: String;
  persona: Object;
}
