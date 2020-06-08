import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Hospedagem } from '../hospedagem/hospedagem.model';
import { HospedagemService } from './hospedagem.service';
import { Hospede } from 'src/app/components/hospede/hospede.model';
import { HospedeService } from 'src/app/components/hospede/hospede.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hospedagem',
  templateUrl: './hospedagem.component.html',
  styleUrls: ['./hospedagem.component.css']
})
export class HospedagemComponent implements OnInit {

  dataSource = new MatTableDataSource<Hospedagem>();

  paginator: MatPaginator;
  hospedes: Hospede[];
  hospedesFiltro: Hospede[];
  hospedesFiltroOption: string[];
  hospedagens: Hospedagem[];

  filtro:string = "";

  hospedagem: Hospedagem = {
    dataEntrada: null,
    adicionaVeiculo: false,
    hospede: null,
    valorTotalHospedagem: null,
    valorUltimaHospedagem: null,
    dataSaida: null
  }

  searchControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  hospedeAutoComplete: string = "";
  displayedColumns = ['nome', 'documento', 'valorTotalHospedagem'];

  
  constructor(
    private router: Router, private hospedagemService: HospedagemService, 
    private hospedeService: HospedeService,
    private changeDetectorRefs: ChangeDetectorRef
    ) {

  }

  ngOnInit(): void {    
    this.hospedagemService.queryHospedagens().subscribe( hospedagens => {
      this.hospedagens = hospedagens.data.hospedagens;
      this.dataSource.data = hospedagens.data.hospedagens;
      console.log(this.hospedagens);
    });
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.hospedesFiltroOption.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  createHospedagem(): void {
    try{
      const myObjStr = JSON.stringify(this.hospedeAutoComplete);
      let temp = myObjStr.split('"',16);
      let num:number = +temp[3];
      this.hospedeService.buscaHospedeById(num).subscribe( hospede => {
        this.hospedagem.hospede = hospede.data.hospede
        this.hospedagemService.mutationHospedagem(this.hospedagem).subscribe(
              (novaHospedagem)=>{
                this.hospedagens.push(novaHospedagem.data.saveHospedagem);
                this.hospedagemService.showNotification('Cadastro realizado com sucesso!');
                this.limpaHospedagem();
                let hospTemp:Hospedagem = novaHospedagem.data.saveHospedagem;
                if(this.filtro != "1" && hospTemp.dataSaida == null){
                  this.dataSource.data.push(novaHospedagem);
                  this.dataSource._updateChangeSubscription();
                }else if(this.filtro == "1" && hospTemp.dataSaida != null){
                  this.dataSource.data.push(novaHospedagem);
                  this.dataSource._updateChangeSubscription();
                }
              }, 
              (e)=>{
                console.log(e);
                this.hospedagemService.showNotification('Ocorreu um erro ao salvar!');
              }
            );
      });
    }catch(e){
      this.hospedagemService.showNotification("Ocorreu um erro ao salvar este check in!");
    }
  }

  navigateToHospedeCreate(){
    this.router.navigate(['cadastraPessoa']);
  }

  buscaHospedesFiltro(): void{
    if (this.hospedeAutoComplete.length >= 3){
      this.hospedeService.buscaHospedes(this.hospedeAutoComplete).subscribe( hospedes => {
        this.hospedesFiltro = hospedes.data.findHospede;
        this.hospedesFiltroOption = [];
        this.hospedesFiltro.forEach(element => {
          if (element.nome != null) this.hospedesFiltroOption.push(element.nome);
        });
      });
    }else{
      this.hospedesFiltro = this.hospedes
    }
  }

  limpaHospedagem(){
    this.hospedagem.adicionaVeiculo = false;
    this.hospedagem.dataEntrada = null;
    this.hospedagem.dataSaida = null;
    this.hospedagem.hospede = null;
    this.hospedesFiltro = [];
    this.hospedesFiltroOption = [];
    this.hospedeAutoComplete = "";
    this.hospedagem.id = null;
  }

  displayFn(subject:Hospede) {
    return subject ? subject.nome : undefined;
  }

  onItemChange(){
    if(this.filtro == "1"){
      console.log('Pessoas ainda presentes');
      this.hospedagemService.buscaHospedesNoHotel().subscribe( hospedagens => {
        this.hospedagens = hospedagens.data.hospedeNotCheckOut;
        this.dataSource.data = hospedagens.data.hospedeNotCheckOut;
        this.dataSource._updateChangeSubscription();
        console.log(hospedagens);
      });
    }else{
      console.log('Pessoas que já deixaram o hotel');
      this.hospedagemService.buscaHospedesForaHotel().subscribe( hospedagens => {
        this.hospedagens = hospedagens.data.hospedeOnlyCheckOut;
        this.dataSource.data = hospedagens.data.hospedeOnlyCheckOut;
        this.dataSource._updateChangeSubscription();
        console.log(hospedagens);
      });
    }
 }

}
