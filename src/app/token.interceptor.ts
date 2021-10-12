import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)
      : Observable<HttpEvent<unknown>> {
    
    const tokenString = localStorage.getItem('access_token');
    const url = request.url;
    
    // colocar o Bearer token em todas as requisições que não sejam de login 
    // ou cadastro de usuario
    if (tokenString && !url.endsWith('/oauth/token')
        && !url.endsWith('/api/usuarios')) {

      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      console.log('Interceptor dentro do IF', jwt)
      
      request = request.clone({
        setHeaders : {
          Authorization: 'Bearer' + jwt
        }
      })
    }
    console.log('Interceptor fora do IF', tokenString)
    return next.handle(request);
  }
}
