import MesaModal from "../classes/Mesa";
import { Request, Response } from 'express';
import { MesaI } from "../interfaces/MesaI";

export class MesaController extends MesaModal{
  public async create(req: Request, res: Response){
    const mesa = new MesaModal(req.body);

    if(mesa.numeroMesa === undefined){
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
      const mesas: Array<MesaI> = await MesaModal.find();
      return res.status(200).json(mesas);
    }catch(error){
      console.log(error);
      return res.status(401).json({ message: "O campo Status é obrigatório !"});

    }
  }
}
