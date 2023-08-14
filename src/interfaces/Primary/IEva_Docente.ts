import {IPeriodo_Aca} from "./IPeriodo_Aca";
import {IPersona} from "./IPersona";

export interface IEva_Docente {
    id_evaluacion?: number;
    codCarrera: string;
    evidenciaEva: string | null;
    registrationDate?: Date;
    periodoAc: IPeriodo_Aca | null;
    persona: IPersona | null;
}
