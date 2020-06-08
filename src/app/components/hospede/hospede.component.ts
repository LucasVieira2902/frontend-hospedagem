import { Component, OnInit } from '@angular/core';
import { HospedeService } from './hospede.service';
import { Router } from '@angular/router';
import { Hospede } from './hospede.model';

@Component({
  selector: 'app-hospede-create',
  templateUrl: './hospede.component.html',
  styleUrls: ['./hospede.component.css']
})
export class HospedeComponent implements OnInit {

  hospedes: Hospede[];

  hospede: Hospede = {
    nome: '',
    documento: '',
    telefone: ''
  }

  displayedColumns = ['id', 'nome', 'documento', 'telefone'];

  constructor(private hospedeService: HospedeService, private router: Router) { }

  ngOnInit(): void {    
    this.hospedeService.queryHospedes().subscribe( hospedes => {
      this.hospedes = hospedes.data.hospedes;
      console.log(hospedes.data.hospedes);
    });
  }

  createHospede(): void {
    this.hospedeService.mutationHospede(this.hospede).subscribe(
      (data)=>{
        console.log(data.data.saveHospede);
        this.hospedes.push(data.data.saveHospede);
        this.hospedeService.showNotification('Cadastro realizado com sucesso!');
        this.router.navigate(['/']) ;
      }, 
      (e)=>{
        console.log(e);
        this.hospedeService.showNotification('Ocorreu um erro ao salvar!');
      }
    );
  }



  cancel(): void {
    this.router.navigate(['/']);
  }

}
