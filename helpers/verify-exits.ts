import ProductModal from "../src/classes/Product";
import TableModal from "../src/classes/Table";

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
