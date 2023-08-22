import {IPersona} from "./IPersona";
import {ICapacitaciones} from "./ICapacitaciones";
import {ICargaFamiliar} from "./ICargaFamiliar";
import {IContrato} from "./IContrato";
import {IEva_Docente} from "./IEva_Docente";
import {IHabilidades} from "./IHabilidades";
import {IHorario} from "./IHorario";
import {IRecomendaciones} from "./Recomendaciones";
import {IExperiencia} from "./IExperiencia";

export interface IResumen {
    persona: IPersona,
    capacitaciones: ICapacitaciones[],
    cargaFamiliar: ICargaFamiliar[],
    contratos: IContrato[],
    evaluaciones: IEva_Docente[],
    habilidades: IHabilidades[],
    horarios: IHorario[],
    // publicaciones: IPublicaciones[] TODO: Revisar si existe la interfaz
    recomendaciones: IRecomendaciones[],
    // instruccionFormals: I_InstruccionFormal[] TODO: No se tiene definida la interfaz
    experiencias: IExperiencia[]

}
