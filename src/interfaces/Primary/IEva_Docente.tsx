export interface IEvaDocente {
  id_evaluacion?: number;
  evidencia_evaluacion: string;
  cod_carrera: string;
  periodo: object | null;
  persona: object | null;
}
