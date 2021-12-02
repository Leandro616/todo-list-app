import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  tarefasFinalizadas: Tarefa[] = [];
  formulario: FormGroup;
  exibirFinalizadas: boolean = true;
  errorState: ErrorStateMatcher = new MyErrorStatyMatcher();

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TarefasService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.formulario = new FormBuilder().group({
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
  }

  listarTarefas() {
    const parametros = this.activatedRoute.params;
    parametros.subscribe(parametro => this.idLista = parametro.id);
    
    this.service.listar(this.idLista)
      .subscribe(resposta => {
        this.tarefasFinalizadas = resposta
          .filter(tarefa => tarefa.finalizada);
          
        this.tarefas = resposta
          .filter(tarefa => !tarefa.finalizada || null);
      });
  }
  
  salvar() {
    if (this.formulario.valid) {
      const tarefa: Tarefa = new Tarefa();
      tarefa.descricao = this.formulario.value.descricao;

      if (this.formulario.value.dtConclusao) {
        tarefa.dtConclusao = new Date(this.formulario.value.dtConclusao)
          .toLocaleDateString();
      }

      this.service.salvar(tarefa, this.idLista)
        .subscribe(() => {
          this.ngOnInit()
          this.formulario.reset();
          Object.keys(this.formulario.controls).forEach(key => {
            this.formulario.get(key)?.setErrors(null);
          })
        });
    }
  }

  finalizarTarefa(tarefa: Tarefa) {
    this.service.finalizar(tarefa, this.idLista)
      .subscribe(() => {
        tarefa.dtConclusao = new Date().toLocaleDateString();
        this.service.atualizar(tarefa, this.idLista)
          .subscribe(() => this.ngOnInit());
      })
  }

  excluirTarefa(tarefa: Tarefa) {
    if (tarefa.id) {
      this.service.excluir(tarefa.id, this.idLista)
        .subscribe(() => this.ngOnInit())
    }
  }

  editarTarefa(tarefa: Tarefa) {

    let form: FormGroup = new FormBuilder()
      .group({
        descricao: [`${tarefa.descricao}`, Validators.required],
        dtConclusao: [this.stringToDate(tarefa.dtConclusao)]
      })
      
    const dialogRef = this.dialog.open(EditarTarefaDialog, {
      data: {formulario: form, date: this.stringToDate(tarefa.dtConclusao)} 
    })
    
    dialogRef.afterClosed()
      .subscribe(resultForm => {
        if (resultForm) {
          let tarefaAtual = new Tarefa();
          tarefaAtual.id = tarefa.id;
          tarefaAtual.descricao = resultForm.value.descricao;

          if (resultForm.value.dtConclusao) {
            tarefaAtual.dtConclusao = resultForm.value.dtConclusao
              .toLocaleDateString();
          }
          console.log(tarefaAtual, tarefa)
          this.service.atualizar(tarefaAtual, this.idLista)
            .subscribe(() => this.ngOnInit());
        }
      })
  }

  corData(dtConclusao: string | undefined) : string  {
    if (new Date().toLocaleDateString() == dtConclusao) {
      return 'color: #3f51b5; ';
    } else {
      const data = this.stringToDate(dtConclusao);
      if (data) {
        const diferenca = data.getTime() - new Date().getTime();
        if (diferenca < 0) 
          return 'color: #f44336;';
      } 
    }

    return '';
  }

  nomeConclusao(dtConclusao: string | undefined) : string {
    if (new Date().toLocaleDateString() == dtConclusao) {
      return 'concluir hoje';
    } else if (dtConclusao) {
      return `concluir em: ${dtConclusao}`;
    }

    return 'sem data de conclusão';
  }

  private stringToDate(dataString: string | undefined): Date | null {

    if (dataString && dataString.length == 10) {
      const dia = Number(dataString.slice(0, 2));
      const mes = Number(dataString.slice(3, 5)) - 1;
      const ano = Number(dataString.slice(6));

      return new Date(ano, mes, dia);
    }

    return null;
  }

  
}

@Component({
  templateUrl: 'editar-tarefa-dialog.html'
})
export class EditarTarefaDialog {
  
  constructor(
    public dialogRef: MatDialogRef<EditarTarefaDialog>,
    @Inject(MAT_DIALOG_DATA) public dados: any
  ) {}
}



