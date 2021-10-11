import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  cadastrando: boolean = false;
  formulario: FormGroup;
  requiredMensagem: String = 'Você deve inserir um valor';
  loginMensagem: String = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  cadastrar() {
    const formValues = this.formulario.value;
    const usuario: Usuario = new Usuario(
      formValues.nome, formValues.email, formValues.senha);

    this.authService.salvar(usuario)
      .subscribe(resposta => {
        this.abrirSnackBar("Incrição realizada com sucesso! Faça o Login");
        this.cancelarCadastro();
      },
      erro => {
        this.abrirSnackBar(erro.error.erros[0]);
        this.prepararCadastro();
      });

  }

  submit() {
    const formValues = this.formulario.value;
    this.authService.tentarLogar(formValues.email, formValues.senha)
      .subscribe(resposta => {
        const acessToken = JSON.stringify(resposta);
        localStorage.setItem('access_token', acessToken);
        this.router.navigate(['/todo-list'])
        console.log('sucesso', resposta);
      }, erro => this.abrirSnackBar('Email e/ou senha incorretos!'));
  }

  prepararCadastro() {
    this.cadastrando = true;
    this.formulario.reset();
  }

  cancelarCadastro() {
    this.cadastrando = false;
    this.formulario.reset();
  }

  abrirSnackBar(mensagem: string) {
    this.snackBar.open(mensagem, 'Ok', {
      verticalPosition: 'top', horizontalPosition: 'center', direction: 'ltr'});
  }

}
