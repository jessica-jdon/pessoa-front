import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoaService } from './pessoa.service';

@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
