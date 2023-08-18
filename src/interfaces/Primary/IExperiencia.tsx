import {IPersona} from "./IPersona";

export interface IExperiencia {
    id_experiencia?: number;
    institucion: string;
    puesto: string;
    area_trabajo: string;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    actividades: string;
    estado: boolean;
    certificado_trabajo: string | null;
    persona: IPersona | null;
}
