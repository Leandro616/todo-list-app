import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RouteResolver } from './route.resolver';
import { TarefasComponent } from './tarefas/tarefas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo-list', component: LayoutComponent, canActivate: [AuthGuard], 
      children: [
        // ver como instanciar um novo componente toda vez que mudar o id
        { path: 'lista/:id', component: TarefasComponent }
      ],
      runGuardsAndResolvers: 'always'
    },

  { path: '', redirectTo: 'todo-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
