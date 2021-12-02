import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaDeTarefasService } from 'src/app/lista-de-tarefas.service';
import { Lista } from '../lista';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  lista: Lista = new Lista();
  formulario: FormGroup;
  editando: boolean = false;

  constructor(
    private rotaAtiva: ActivatedRoute,
    private service: ListaDeTarefasService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.formulario = new FormBuilder().group({
      nome: ['', Validators.required] 
    })
  }

  ngOnInit(): void {
    const params = this.rotaAtiva.params;

    params.subscribe(parametro => {
      this.service.getLista(parametro.id)
        .subscribe(resposta => this.lista = resposta)
    });
  }

  prepararEdicao() {
    this.editando = true;
    this.formulario.setValue({nome: this.lista.nome});
  }

  atualizarLista() {
    const listaAtualizada: Lista = new Lista();
    listaAtualizada.nome = this.formulario.value.nome;

    if (this.lista.id && this.formulario.valid) {
      this.service.atualizar(this.lista.id, listaAtualizada)
        .subscribe(resposta => {
          this.editando = false;
          this.ngOnInit();
        })
    }
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(ExcluirListaDialog, {
      data: this.lista
    })
    
    dialogRef.afterClosed().subscribe(resultado =>{
      if (resultado) {
        this.service.excluir(resultado.id)
          .subscribe(() => this.router.navigate(['/todo-list']));
      }
    })
  }

}


@Component({
  templateUrl: 'excluir-lista-dialog.html'
})
export class ExcluirListaDialog {
  constructor(
    public dialogRef: MatDialogRef<ExcluirListaDialog>,
    @Inject(MAT_DIALOG_DATA) public lista: Lista
  ) {}
}
