import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NEVER, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteResolver implements Resolve<boolean> {
  private urlAnterior?: string;

  resolve(route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): Observable<any> {
      
    // if (this.refresh(state.url)) {
    //   this.urlAnterior = state.url;
    //   return Observable<true>;
    // }
    // this.urlAnterior = state.url;
    return NEVER;
  }

  private refresh(urlAtual: string): boolean {
    return !this.urlAnterior || this.urlAnterior === urlAtual;
  } 

}
