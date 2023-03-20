export type Status = "Disponível" | "Ocupado";

export interface MesaI {
    numeroMesa: number,
    quantidadeCliente: number,
    status: Status
}
