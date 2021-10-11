import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from '../environments/environment'
import { Usuario } from './login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlToken = environment.apiUrlBase + '/oauth/token';
  urlUsuario = environment.apiUrlBase + '/api/usuarios';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  tentarLogar(username: string, password: string) : Observable<any> {
    const params: string = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
      .toString();

    const headers = {
      "Authorization": "Basic " 
        + btoa(`${environment.clientId}:${environment.clienteSecret}`),
      "Content-Type": "application/x-www-form-urlencoded"
    }

    return this.http.post(this.urlToken, params, { headers });
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<Usuario>(this.urlUsuario, usuario);
  }

  isAutenticado() : boolean {
    const token = this.obterToken();
    if (token) {
      const expirado = this.jwtHelper.isTokenExpired(token);
      return !expirado;
    }
    return false;
  }

  obterToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return JSON.parse(token).access_token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }
}
