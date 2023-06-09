export interface ApiResponse{
  data:any[],
   id_usuario: number;
   username: string;
   password: string;
   persona: {
     id_persona: number;
   };
   rol: {
     idRol: number;
   };
}