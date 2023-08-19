export interface IHorarioData {
  id_horario?: Number;
  periodo: string;
  horario: string;
  dias: string;
  distributivo: string;
  id_periodo?: Number;
  persona: object | null;
}
