export interface IContrato {
  id_contrato?: Number;
  fecha_inicio: String;
  fecha_fin: String;
  anio_duracion: String;
  horas_diarias: String;
  cargo: String;
  salario: Date;
  evidencia: Date;
  persona: Object;
}
