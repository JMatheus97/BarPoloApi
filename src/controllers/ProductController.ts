import ProductModal from "../classes/Product";
import {Request, Response} from 'express';
import { ProductI } from "../interfaces/ProductI";
import {verifyExistsProduct } from '../../helpers/verify-exits';
import StockModel from "../classes/Stock";

export class ProductController extends ProductModal{
  // CRIAÇÃO
  public async create(req: Request, res: Response){
    let product = new ProductModal(req.body);

    if(product.nome === undefined){
      res.status(401).json({ message: "O campo Nome é obrigatório !"});
    }

    try{
      const result = await product.save();
      res.status(201).json({ message: "Salvo com sucesso !", result});
    }catch(error){
      console.log(error);
      res.status(401).json({ message: "Não foi possível salvar !"});
    }
  }

  public async find(req: Request, res: Response){
      try{
        const products: Array<ProductI> = await ProductModal.find();
        res.status(200).json(products);
      }catch(error){
        console.log(error);
        res.status(401).json({ message: "Não foi possível buscar dados !"});
      }

  }

  // EDITAR
  public async edit(req: Request, res: Response){
    const id: String = req.params.id;
    const { nome, valor } = req.body;
    const product: ProductI ={ nome, valor}

    if(id === ""){
      res.status(400).json({ message: "O id informado está inválido !"});
    }

    const procutsExist = await verifyExistsProduct(id);

    if(procutsExist === null){
      return res.status(400).json({ message: "O produto informado não foi encontrado !"});
    }


    if(product.nome !== undefined || product.valor !== undefined){
      try{
        const productEdit = await ProductModal.findByIdAndUpdate({_id: id},  {$set: product}, {new: true});
        return res.status(201).json({ message:"Produto alterado com sucesso !", productEdit});
      }catch(error){
        return res.status(400).json({ message: "Não foi possível alterar produto"});
      }
    }else {
      return res.status(401).json({ message: "Informe ao menos campo deseja alterar !"});
    }
  }

  // DELETE
  public  async deleteProduct(req: Request, res: Response){
    const id: String = req.params.id;

    const product = await verifyExistsProduct(id);

    if(product === null){
      return res.status(400).json({ message: "O produto informado não foi encontrado !"});
    }

    try{
      const producIndStockExists =   await StockModel.findOne({ product});

      if(producIndStockExists === null){
        await ProductModal.findByIdAndDelete({_id: id});
        return res.status(201).json({ message: "Produto excluído com sucesso !"});
      }else {
        return res.status(201).json({ message: "Produto possui estoque !"});
      }

    }catch(error){
      return res.status(400).json({ message: "Não foi possível excluir produto"})
    }


  }
}
