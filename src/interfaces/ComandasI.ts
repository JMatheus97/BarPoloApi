import { Employeel } from "./EmployeeI";
import { ProductI } from "./ProductI";
import { TableI } from "./TableI";

export interface ProductsComandsI {
  products: ProductI;
  amount: number;
}

export interface CommandsI {
  employee: Employeel;
  table: TableI;
  productsComands: ProductsComandsI;
  status: "Aberta" | "Fechada";
  amountToPay: number;
  paymentMethod: "Debito" | "Crédito" | "Pix";
}
