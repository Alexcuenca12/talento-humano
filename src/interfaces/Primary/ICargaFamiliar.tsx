export interface ICargaFamiliar {
  id_cargaFamiliar?: number;
  cedula: string;
  nombre_pariente: string;
  apellido_pariente: string;
  fecha_nacimiento?: string;
  evidencia: string | null;
  persona: object | null;
}
