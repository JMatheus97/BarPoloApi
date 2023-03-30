import StockModel from "../classes/Stock";
import { Request, Response } from 'express';
import ProductModal from "../classes/Product";
import { ProductI } from "../interfaces/ProductI";

export class StockControler extends StockModel{
  public async create (req: Request, res: Response) {
    let stock = new StockModel(req.body);


    try{
      let product: ProductI | null= await ProductModal.findById({_id: req.body.product});
      if(product !== null){
        stock.product = product
      }
    }catch(error){
      return res.status(400).json({ message: "Não foi possível buscar produto !"})
    }

    if(stock.amount === undefined){
      res.status(401).json({ message: "O campo quantidade é obrigatório !"});
      return;
    }

    if(stock.type === undefined){
      res.status(401).json({ message: "O campo type é obrigatório !"});
      return;
    }

    if(stock.batch === undefined){
      res.status(401).json({ message: "O campo lote é obrigatório !"});
      return;
    }

    if(stock.unitOfMeasurement === undefined){
      res.status(401).json({ message: "O campo Unidade Medida é obrigatório !"});
      return;
    }

    if(stock.unitOfMeasurement === undefined){
      res.status(401).json({ message: "O campo Unidade Medida é obrigatório !"});
      return;
    }

    if(stock.validity === undefined){
      res.status(401).json({ message: "O campo Validade é obrigatório !"});
      return;
    }

    try{
      const stockSave = await stock.save();
      return res.status(201).json({ message: "Salvo com sucesso !", stockSave});

    }catch(error){
      console.log(error)
      return res.status(400).json({ message: "Não foi possível salvar etoque"})
    }

  }

  public async find(req: Request, res: Response){
    try {
      const stocks = await StockModel.find().populate([{"path": "product", "model": "Product"}])
      return res.status(200).json(stocks)
    }catch(error){
      console.log(error)
      return res.status(400).json({ message:"Não foi possível buscar estoques ! "})
    }

  }


}

