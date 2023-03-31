export type Status = "Disponível" | "Ocupado";

export interface TableI {
  tableNumber: number,
  customerQuantity: number,
  status: Status
}
