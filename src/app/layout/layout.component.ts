import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  emailUser: string = '';
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor()
  {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');

    if (token)
      this.emailUser = this.jwtHelper.decodeToken(token).user_name;
  }  
}
