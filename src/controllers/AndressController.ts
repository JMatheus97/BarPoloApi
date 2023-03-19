import  AdresssModal  from "../classes/Adrress";
import { Request, Response } from 'express';
import { Adress } from "../interfaces/Adress";

export class AdressController extends AdresssModal {
     public async create(req: Request, res: Response){
        let adress = new AdresssModal(req.body);

        if(adress.cep === undefined){
          res.status(401).json({ message: "O campo CEP é obrigatório !"});
          return;
        }

        if(adress.district === undefined){
          res.status(401).json({ message: "O campo Bairro é obrigatório !"});
          return;
        }

        if(adress.city === undefined){
          res.status(401).json({ message: "O campo Cidade é obrigatório !"});
          return;
        }

        if(adress.street === undefined){
          res.status(401).json({ message: "O campo Rua é obrigatório !"});
          return;
        }

        if(adress.uf === undefined){
          res.status(401).json({ message: "O campo UF é obrigatório !"});
          return;
        }


        try {
          const result = await adress.save()
          res.status(201).json({ message: "Salvo com sucesso !", result})
        }catch(error){
          console.log(error)
          res.status(400).json({message:"Não foi possível salvar endereço !"})
        }
    }

    public async find(req: Request, res: Response){
      try{
        const adress: Array<Adress>= await AdresssModal.find();
        res.status(200).json(adress);
      }catch(error){
        console.log(error)
        res.status(400).json({ message: "Não foi possível bucar enderçeos"})
      }

    }
}
