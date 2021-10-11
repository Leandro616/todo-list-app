import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ListaDeTarefasComponent } from './lista-de-tarefas/lista-de-tarefas.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo-list', component: ListaDeTarefasComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'todo-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
