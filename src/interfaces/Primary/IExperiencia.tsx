export interface IExperiencia {
  id_experiencia?: Number;
  institucion: string;
  puesto: string;
  area_trabajo: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  actividades: string;
  estado: Boolean;
  certificado_trabajo: string;
  persona: Object;
}
