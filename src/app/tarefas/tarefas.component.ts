import { HttpHandler } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy, RouterEvent } from '@angular/router';
import { ListaDeTarefasService } from '../lista-de-tarefas.service';
import { MyErrorStatyMatcher } from '../lista-de-tarefas/lista-de-tarefas.component';
import { TarefasService } from '../tarefas.service';
import { Tarefa } from './tarefa';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  idLista: number = 0;
  tarefas: Tarefa[] = [];
  nomeLista?: string;
  formulario: FormGroup;
  exibirFinalizadas: boolean = true;
  errorState: ErrorStateMatcher = new MyErrorStatyMatcher();

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TarefasService,
    private formBuilder: FormBuilder,
    private listaService: ListaDeTarefasService,
    private router: Router
  ) {
    this.formulario = formBuilder.group({
      descricao: ['', Validators.required],
      dtConclusao: ['']
    })
  }

  ngOnInit(): void {
    // funcao para recarregar o componente acessando a mesma rota mas com um id diferente
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }

    this.listarTarefas();

    this.listaService.getLista(this.idLista)
      .subscribe(resposta => this.nomeLista = resposta.nome)
  }

  listarTarefas() {
    const parametros = this.activatedRoute.params;
    parametros.subscribe(parametro => this.idLista = parametro.id);
    
    this.service.listar(this.idLista)
      .subscribe(resposta => {
        this.tarefas = resposta;
      });
  }
  
  salvar() {
    const tarefa: Tarefa = new Tarefa();
    tarefa.descricao = this.formulario.value.descricao;
    tarefa.dtConclusao = this.converterData(this.formulario.value.dtConclusao);

    if (this.formulario.valid) {
      this.service.salvar(tarefa, this.idLista)
        .subscribe(resposta => {
          this.ngOnInit()
          this.formulario.reset();
          Object.keys(this.formulario.controls).forEach(key => {
            this.formulario.get(key)?.setErrors(null);
          })
        });
    }
  }

  finalizarTarefa() {
    console.log('finalizando...')
    this.ngOnInit();
  }

  private converterData(data: Date): string {
    if (data)
      return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    else 
      return ''
  }

  
}



