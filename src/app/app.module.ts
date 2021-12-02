import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipDefaultOptions, MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

import { ScrollingModule } from '@angular/cdk/scrolling'
import { AuthService } from './auth.service';
import { LayoutComponent } from './layout/layout.component';
import { ListaDeTarefasService } from './lista-de-tarefas.service';
import { ListaDeTarefasComponent } from './lista-de-tarefas/lista-de-tarefas.component';
import { LoginComponent } from './login/login.component';
import { EditarTarefaDialog, TarefasComponent } from './tarefas/tarefas.component';
import { TokenInterceptor } from './token.interceptor';
import { ExcluirListaDialog, HeaderComponent } from './lista-de-tarefas/header/header.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MY_TOOLTIP_OPTIONS: MatTooltipDefaultOptions = {
  showDelay: 800,
  hideDelay: 500,
  touchendHideDelay: 1500,
}

@NgModule({
  declarations: [
    AppComponent,
    ListaDeTarefasComponent,
    LoginComponent,
    LayoutComponent,
    TarefasComponent,
    HeaderComponent,
    ExcluirListaDialog,
    EditarTarefaDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,    
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    ScrollingModule
  ],
  providers: [
    AuthService,
    ListaDeTarefasService,
    // configuração do token Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // configuração do datePicker para mostrar calendario brasileiro
    { 
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
    // configuração do tempo de exibição e ocultação do MatToolTip
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS, 
      useValue: MY_TOOLTIP_OPTIONS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
