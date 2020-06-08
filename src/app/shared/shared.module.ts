import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HospedagemComponent } from '../views/hospedagem/hospedagem.component';
import { HospedeComponent } from '../components/hospede/hospede.component';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../components/template/header/header.component';
import { FooterComponent } from '../components/template/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloConfigModule } from '../apollo-config-module';
import { TableComponent } from '../views/hospedagem/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HospedagemComponent,
    HospedeComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    ApolloConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  providers: [{
    provide: LOCALE_ID, 
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class SharedModule { 

}