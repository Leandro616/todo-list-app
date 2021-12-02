import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from './tarefas/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  
  constructor(
    private http: HttpClient
  ) { }

  listar(idLista: number) : Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.getUrl(idLista));
  }

  salvar(tarefa: Tarefa, idLista: number) : Observable<any> {
    return this.http.post<Tarefa>(this.getUrl(idLista), tarefa);
  }

  finalizar(tarefa: Tarefa, idLista: number) : Observable<any> {
    return this.http
      .put<any>(`${this.getUrl(idLista)}/${tarefa.id}/finalizacao`, null);
  }

  excluir(id: number, idLista:number) : Observable<any> {
    return this.http.delete(`${this.getUrl(idLista)}/${id}`);
  }
  
  atualizar(tarefa: Tarefa, idLista:number) : Observable<any> {
    return this.http
      .put<Tarefa>(`${this.getUrl(idLista)}/${tarefa.id}`, tarefa);
  }

  private getUrl(idLista: number) : string {
    const urlPrefix: string = environment.apiUrlBase + "/api/listas/";
    const urlSuffix: string = "/tarefas";

    return urlPrefix + idLista + urlSuffix;
  }
}
