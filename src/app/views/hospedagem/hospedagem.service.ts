import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Hospedagem } from './hospedagem.model';
import { Observable } from 'rxjs';

const queryHospedagens = gql`
query{
  hospedagens{
    id,
    dataEntrada,
    dataSaida,
    adicionaVeiculo,
    hospede{
      id,
      nome,
      documento,
      telefone
    },
    valorTotalHospedagem,
    valorUltimaHospedagem
  }
}
`;

const mutationCadastroHospedagem = gql `
  mutation cadastroHospedagem($id:ID, $dataEntrada:String!, $dataSaida:String, $veiculo:Boolean!, $hospede:ID!){
    saveHospedagem(hospedagem:{
      id:$id,
      adicionaVeiculo:$veiculo,
      dataEntrada:$dataEntrada,
      dataSaida:$dataSaida,
      hospedeId:$hospede
    }){
      id,
      dataEntrada,
      dataSaida,
      adicionaVeiculo,
      valorTotalHospedagem,
      valorUltimaHospedagem,
      hospede{
        id,
        nome,
        documento,
        telefone
      }
    }
  }
`;

const queryCheckOutOk = gql `
  query {
    hospedeOnlyCheckOut{
      id,
      dataEntrada,
      dataSaida,
      adicionaVeiculo,
      valorTotalHospedagem,
      valorUltimaHospedagem,
      hospede{
        id,
        nome,
        documento,
        telefone
      }
    }
  }
`;

const queryNoHotel = gql `
query{
  hospedeNotCheckOut{
    id,
    dataEntrada,
    dataSaida,
    adicionaVeiculo,
    valorTotalHospedagem,
    valorUltimaHospedagem,
    hospede{
    	id,
    	nome,
    	documento,
    	telefone
    }
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class HospedagemService {

  constructor(private snackBar: MatSnackBar, private apollo: Apollo) { }


  showNotification(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  mutationHospedagem(hospedagem: Hospedagem): Observable<any> {
    return this.apollo.mutate<Hospedagem>({
      mutation: mutationCadastroHospedagem,
      variables: {
        id: hospedagem.id,
        dataEntrada: hospedagem.dataEntrada,
        dataSaida: hospedagem.dataSaida,
        veiculo: hospedagem.adicionaVeiculo,
        hospede: hospedagem.hospede.id
      }
    });
  }

  queryHospedagens():Observable<any> {
    return this.apollo.query<Hospedagem>({
      query: queryHospedagens
    });
  }

  buscaHospedesNoHotel():Observable<any> {
    return this.apollo.query<Hospedagem>({
      query: queryNoHotel,
      fetchResults: true,
      fetchPolicy: "network-only"
    });
  }

  buscaHospedesForaHotel():Observable<any> {
    return this.apollo.query<Hospedagem>({
      query: queryCheckOutOk,
      fetchResults: true,
      fetchPolicy: "network-only"
    });
  }
}
