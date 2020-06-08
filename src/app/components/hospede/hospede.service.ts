import { Injectable, TestabilityRegistry } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import { Hospede } from './hospede.model';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ApolloQueryResult, ApolloCurrentQueryResult } from 'apollo-client';
import { stringify } from '@angular/compiler/src/util';

const mutationHospede = gql`
mutation cadastroHospede($id:ID, $nome:String!, $documento:String!, $telefone:String!){
  saveHospede(hospede:{
    id:$id,
    nome:$nome,
    documento:$documento,
    telefone:$telefone
  }){
    id,
    nome,
    documento,
    telefone
  }
}
`;

const queryHospedes = gql`
query{
  hospedes{
    id,
    nome,
    documento,
    telefone
  }
}
`;

const queryBuscaHospedes = gql `
  query buscaHospede($param:String!){
    findHospede(param: $param){
      id,
      nome,
      documento,
      telefone
    }
  }
`
const queryBuscaHospedeById = gql `
  query buscaHospedeById($param:ID!){
    hospede(id: $param){
      id,
      nome,
      documento,
      telefone
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class HospedeService {

  constructor(private snackBar: MatSnackBar, private apollo: Apollo) { }


  showNotification(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })
  }

  mutationHospede(hospede: Hospede): Observable<any> {
    return this.apollo.mutate<Hospede>({
      mutation: mutationHospede,
      variables: {
        id: hospede.id,
        nome: hospede.nome,
        documento: hospede.documento,
        telefone: hospede.telefone
      }
    });
  }

  queryHospedes():Observable<any> {
    return this.apollo.query<Hospede>({
      query: queryHospedes
    });
  }

  buscaHospedes(parametros: string):Observable<any> {
    return this.apollo.query<Hospede>({
      query: queryBuscaHospedes,
      variables: {
        param: parametros
      }
    })
  }

  buscaHospedeById(id: number):Observable<any> {
    return this.apollo.query<Hospede>({
      query: queryBuscaHospedeById,
      variables: {
        param: id
      }
    })
  }
}
