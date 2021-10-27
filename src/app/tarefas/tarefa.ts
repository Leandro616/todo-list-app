import { Lista } from "../lista-de-tarefas/lista";

export class Tarefa {
   id?: number;
   descricao?: string;
   dtConclusao?: string;
   dtCriacao?: Date;
   finalizada?: boolean;
   lista?: Lista;
}