import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  emailUser: string = '';
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private service: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');

    if (token)
      this.emailUser = this.jwtHelper.decodeToken(token).user_name;
  }  

  logout() {
    this.service.encerrarSessao();
    this.router.navigate(['/login']);
  }
}
