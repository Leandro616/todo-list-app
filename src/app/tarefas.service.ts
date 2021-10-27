import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from './tarefas/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  urlPrefix: string = environment.apiUrlBase + "/api/listas/";
  urlSuffix: string = "/tarefas";

  constructor(
    private http: HttpClient
  ) { }

  listar(idLista: number) : Observable<Tarefa[]> {
    const url = this.urlPrefix + idLista + this.urlSuffix;
    return this.http.get<Tarefa[]>(url);
  }

  salvar(tarefa: Tarefa, idLista: number) : Observable<any> {
    const url = this.urlPrefix + idLista + this.urlSuffix;
    return this.http.post<Tarefa>(url, tarefa);
  }
}
