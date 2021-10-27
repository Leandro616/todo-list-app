import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListaDeTarefasService } from '../lista-de-tarefas.service';
import { TarefasComponent } from '../tarefas/tarefas.component';
import { Lista } from './lista';

@Component({
  selector: 'app-lista-de-tarefas',
  templateUrl: './lista-de-tarefas.component.html',
  styleUrls: ['./lista-de-tarefas.component.css']
})
export class ListaDeTarefasComponent implements OnInit {

  listas: Lista[] = [];
  formulario: FormGroup;
  novaLista: boolean = false;
  errorState: ErrorStateMatcher = new MyErrorStatyMatcher();
  
  constructor(
    private service: ListaDeTarefasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.formulario = formBuilder.group({
      nome: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.service.getListas()
      .subscribe(resposta => this.listas = resposta);
  }

  salvar() {
    const lista: Lista = new Lista();
    lista.nome = this.formulario.value.nome;
  
    if (this.formulario.valid) {
      this.service.salvar(lista)
        .subscribe(resposta => {
          this.ngOnInit();
          this.formulario.reset();
        });
    }
  }
}

// Classe criada para configurar a mudança de cor de um input ao ver um erro, 
// nesse caso desativei a mudança de cor 
export class MyErrorStatyMatcher implements ErrorStateMatcher {
  isErrorState():boolean {
    return false;
  }
}
