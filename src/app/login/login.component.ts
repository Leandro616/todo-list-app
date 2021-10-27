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
    
    if (this.formulario.valid) {
      this.authService.salvar(usuario)
        .subscribe(resposta => {
          this.abrirSnackBar("Incrição realizada com sucesso! Faça o Login");
          this.cancelarCadastro();
        },
        erro => {
          this.abrirSnackBar(erro.error.erros[0]);
        });
    }
  }

  submit() {
    const formValues = this.formulario.value;
    this.authService.tentarLogar(formValues.email, formValues.senha)
      .subscribe(resposta => {
        const acessToken = JSON.stringify(resposta);
        localStorage.setItem('access_token', acessToken);
        this.router.navigate(['/todo-list'])
      }, erro => this.abrirSnackBar('Email e/ou senha incorretos!'));
  }

  prepararCadastro(event: Event) {
    event.preventDefault();
    this.cadastrando = true;
    this.resetFormulario();
  }

  cancelarCadastro() {
    this.cadastrando = false;
    this.resetFormulario();
  }

  abrirSnackBar(mensagem: string) {
    this.snackBar.open(mensagem, 'Ok', {
      verticalPosition: 'top', horizontalPosition: 'center', 
      direction: 'ltr', duration: 10 * 1000});
  }

  resetFormulario() {
    this.formulario.reset();

    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.setErrors(null);
    })
  }

}
