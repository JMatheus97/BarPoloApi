import ProductModal from "../src/classes/Product";

export async function verifyExists(id: String ){

  try {
  const product = await ProductModal.findById({_id: id});
  return product;
  }catch(error){
    return null;
  }
}
