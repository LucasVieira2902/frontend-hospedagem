import { Hospede } from 'src/app/components/hospede/hospede.model';

export interface Hospedagem {
    id?: number
    dataEntrada: Date
    dataSaida?: Date
    adicionaVeiculo: boolean
    hospede: Hospede
    valorTotalHospedagem: number
    valorUltimaHospedagem: number
}