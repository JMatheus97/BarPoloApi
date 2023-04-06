import { UserI } from "./UserI";

export type Office = {
  gerencial: "Gerencial",
  comum: "Comum"
}

export interface Employeel {
  firstName: string,
  lastName: string,
  document: string,
  fone?: string,
  office: Office,
  user: UserI

}
