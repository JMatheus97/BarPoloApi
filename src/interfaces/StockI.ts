import { ProductI } from "./ProductI";

export interface StockI {
  product: ProductI;
  amount: number;
  type: string;
  batch: string,
  code: string,
  validity: Date,
  unitOfMeasurement: string
}
