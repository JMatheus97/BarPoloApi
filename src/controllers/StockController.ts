import StockModel from "../classes/Stock";
import { Request, Response } from 'express';
import ProductModal from "../classes/Product";
import { ProductI } from "../interfaces/ProductI";
import { StockI } from "../interfaces/StockI";
import { verifyExistsProduct, verifyExistsStock } from "../../helpers/verify-exits";

export class StockControler extends StockModel{

  // CREATE
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

  // EDIT
  public async edit(req: Request, res: Response){
    const id: String = req.params.id;
    const { code, amount, type, batch, unitOfMeasurement, validity } = req.body;

    try{
      const stockExists = await verifyExistsStock(id);
      if(stockExists == null){
        return res.status(400).json({ message: "O id informado está inválido !"});
      }
    }catch(error){
      return error;
    }

    const stock = new StockModel({ _id: id});

    if(code !== undefined){
      stock.code = code;
    }


    if(amount !== undefined){
      stock.amount = amount;
    }

    if(type !== undefined){
      stock.type = type;
    }

    if(batch !== undefined){
      stock.batch = batch;
    }

    if(unitOfMeasurement !== undefined){
      stock.unitOfMeasurement = unitOfMeasurement;
    }

    if(validity !== undefined){
      stock.validity = validity;
    }

    try {
    if(req.body.product !== undefined){
      const products = await  verifyExistsProduct(req.body.product._id);
      if(products === null){
        return res.status(422).json({ message: "O produto informado não existe !"});
      }else {
        stock.product = products;
        console.log(products)
        const stockEdit = await StockModel.findByIdAndUpdate({ _id: id}, {$set: stock}, {new:true}).populate([{"path": "product", "model": "Product"}])
        return res.status(201).json({ message: "Estoque editado com sucesso ! ", stockEdit})
      }

    }else {
      if(amount === undefined && type === undefined && batch === undefined && unitOfMeasurement === undefined && validity === undefined){
        return res.status(422).json({ message: "Informe ao menos um campo editar !"});
      }
        const stockEdit = await StockModel.findByIdAndUpdate({ _id: id}, {$set: stock}, {new:true});
        return res.status(201).json({ message: "Estoque editado com sucesso ! ", stockEdit})
    }
  }catch(error){
    return res.status(400).json({ message: "Não foi possível editar o estoque !"});
  }

  }

  // DELETE
  public async deleteStock(req: Request, res: Response){
    if(req.params.id === ""){
      return res.status(400).json({ message: "O não foi informado !"});
    }
    const id: String = req.params.id;

    try{
        await StockModel.findByIdAndDelete({_id: id});
        return res.status(201).json({ message: "O estoque foi excluído com sucesso !"});
    }catch(error){
      return res.status(400).json({ message: "Não foi possível excluir o estoque !"});
    }
  }

}

