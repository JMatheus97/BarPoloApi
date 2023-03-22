import StoreModal from "../classes/Store";
import  { Request, Response } from 'express';
import AdresssModal from "../classes/Adrress";

export class StoreController extends StoreModal{
  public async create(req: Request, res: Response){
        let store = new StoreModal(req.body);

        if(store.name === undefined){
            res.status(401).json({ message:"O campo Nome é obrigatório !"});
            return;
        }

        let adress = new AdresssModal(req.body.adress)


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
            const adressSave = await adress.save();
            try {
                store.adress = adressSave;
                const storeSave = await store.save();
                return res.status(201).json({ message: "Salvo com sucesso !", storeSave})
            }catch(error){
              res.status(400).json({ message: "O endereço não existe"});
              return error;
            }
        }catch(error){
          res.status(400).json({ message: "Não foi possível salvar endereço !"});
          return;
           }
  }

  public async find(req: Request, res: Response){
    try {
      const stores = await StoreModal.find().populate("Adrress");
      return res.status(201).json(stores)
    }catch(error){
      res.status(400).json({ message: "Não foi possível buscar lojas !"});
      return;
    }
  }
}
