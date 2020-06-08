import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospedagemComponent } from './views/hospedagem/hospedagem.component';
import { HospedeComponent } from './components/hospede/hospede.component';

const routes: Routes = [
  { path: "", component: HospedagemComponent},
  { path: "cadastraPessoa", component: HospedeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
