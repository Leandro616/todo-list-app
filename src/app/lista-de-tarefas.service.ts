import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lista } from './lista-de-tarefas/lista';

@Injectable({
  providedIn: 'root'
})
export class ListaDeTarefasService {

  url: string = environment.apiUrlBase + '/api/listas';

  constructor(
    private http: HttpClient
  ) { }

  getListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(this.url);
  }

  salvar(lista: Lista): Observable<any> {
    return this.http.post<Lista>(this.url, lista);
  }

  getLista(id: number) : Observable<Lista> {
    return this.http.get<Lista>(`${this.url}/${id}`);
  }
}
