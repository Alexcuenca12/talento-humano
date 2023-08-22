import {IPersona} from "./IPersona";
import {ICapacitaciones} from "./ICapacitaciones";
import {ICargaFamiliar} from "./ICargaFamiliar";
import {IContratoData} from "./IContrato";
import {IEvaDocente} from "./IEva_Docente";
import {IHabilidadesData} from "./IHabilidades";
import {IHorarioData} from "./IHorario";
import {IRecomendaciones} from "./Recomendaciones";
import {IExperiencia} from "./IExperiencia";

export interface IResumen {
    persona: IPersona,
    capacitaciones: ICapacitaciones[],
    cargaFamiliar: ICargaFamiliar[],
    contratos: IContratoData[],
    evaluaciones: IEvaDocente[],
    habilidades: IHabilidadesData[],
    horarios: IHorarioData[],
    // publicaciones: IPublicaciones[] TODO: Revisar si existe la interfaz
    recomendaciones: IRecomendaciones[],
    // instruccionFormals: I_InstruccionFormal[] TODO: No se tiene definida la interfaz
    experiencias: IExperiencia[]

}
