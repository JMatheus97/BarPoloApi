import ProductModal from "../classes/Product";
import {Request, Response} from 'express';
import { ProductI } from "../interfaces/ProductI";

export class ProductController extends ProductModal{
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
}
