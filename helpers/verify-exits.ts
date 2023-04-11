import ProductModal from "../src/classes/Product";
import StockModel from "../src/classes/Stock";
import TableModal from "../src/classes/Table";
import UserModal from "../src/classes/User";
import { UserI } from "../src/interfaces/UserI";

export async function verifyExistsProduct(id: String ){

  try {
  const product = await ProductModal.findById({_id: id});
  return product;
  }catch(error){
    return null;
  }
}

export async function verifyExistsTable(id: String ){

  try {
  const table = await TableModal.findById({_id: id});
  return table;
  }catch(error){
    return null;
  }
}


export async function verifyExistsUser(userI: UserI ){

  try {
  const user = await UserModal.findOne({userName: userI.userName});
  return user;
  }catch(error){
    return null;
  }
}

export async function verifyExistsStock(id: String ){
  try {
  const user = await StockModel.findById({_id: id});
  return user;
  }catch(error){
    return null;
  }
}
