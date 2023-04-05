import TableModal from "../classes/Table";
import { Request, Response } from 'express';
import { TableI } from "../interfaces/TableI";
import { verifyExistsTable } from "../../helpers/verify-exits";

export class TableController extends TableModal{
  public async create(req: Request, res: Response){
    const mesa = new TableModal(req.body);

    if(mesa.tableNumber === undefined){
    res.status(401).json({ message: "O campo Numero da Mesa é obrigatório !"});
    return;
    }

    if(mesa.status === undefined){
      res.status(401).json({ message: "O campo Status é obrigatório !"});
      return;
    }

    try {
      const result = await mesa.save();
      return res.status(201).json({ message: "Salvo com sucesso !", result})
    }catch(error){
      console.log(error);
      return res.status(400).json({ message:"Não foi possível salvar !"})
    }
  }

  public async find(req: Request, res: Response){
    try{
      const mesas: Array<TableI> = await TableModal.find();
      return res.status(200).json(mesas);
    }catch(error){
      return res.status(401).json({ message: "Não foi possível buscar Mesas !"});
    }
  }

  public async edit(req: Request, res: Response){
    const id: String = req.params.id;
    const { tableNumber, customerQuantity, status} = req.body;
    const table: TableI = { tableNumber, customerQuantity, status};

    if(id === ""){
      res.status(400).json({ message: "O id informado está inválido !"});
    }

    const tableExist = await verifyExistsTable(id);

    if(tableExist === null){
      return res.status(400).json({ message: "A mesa informada não foi encontrado !"});
    }


    if(table.tableNumber !== undefined || table.customerQuantity !== undefined || table.status !== undefined){
      try{
        const tableEdit = await TableModal.findByIdAndUpdate({_id: id},  {$set: table}, {new: true});
        return res.status(201).json({ message:"A mesa foi alterada com sucesso !", tableEdit});
      }catch(error){
        return res.status(400).json({ message: "Não foi possível alterar mesa"});
      }
    }else {
      return res.status(401).json({ message: "Informe ao menos campo deseja alterar !"});
    }
  }


  public  async deleteTable(req: Request, res: Response){
    const id: String = req.params.id;

    const product = await verifyExistsTable(id);

    if(product === null){
      return res.status(400).json({ message: "A mesa informada não foi encontrado !"});
    }


    try{
      await TableModal.findByIdAndDelete({_id: id});
      return res.status(201).json({ message: "A Mesa foi excluída com sucesso !"});
    }catch(error){
      return res.status(400).json({ message: "Não foi possível excluir a mesa !"});
    }

  }
}
