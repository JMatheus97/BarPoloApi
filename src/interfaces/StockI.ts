import { ProductI } from "./ProductI";

export interface StockI {
  product: ProductI;
  amount: number;
  type: string;
  lote: string
}
