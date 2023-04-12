import StoreModal from "../classes/Store";
import  { Request, Response } from 'express';
import AdresssModal from "../classes/Adrress";
import { verifyExistsStore } from "../../helpers/verify-exits";

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
      const stores = await StoreModal.find().populate([{"path": "adress", "model": "Adress"}])
      return res.status(201).json(stores)
    }catch(error){
      res.status(400).json({ message: "Não foi possível buscar lojas !"});
      return;
    }
  }

  public async edit(req: Request, res: Response){
    const id: String =req.params.id;

    const storeExist = await verifyExistsStore(id);

    if(storeExist === null){
      return res.status(422).json({ message: "O id informado não existe !"});
    }

    const {name, cnpj, adress} = req.body;

    const store = new StoreModal({ _id: id});

    if(name !== undefined){
      store.name = name;
    }

    if(cnpj !== undefined){
        store.cnpj = cnpj;
    }


    if(req.body.adress !== undefined){
      const { cep, street, numberStore, city, uf, district, complement, _id } = req.body.adress;
      const adress = new AdresssModal({ _id: _id});
      console.log(cep)
      if(cep !== undefined){
        adress.cep = cep;
      }

      if(street !== undefined){
        adress.street = street;
      }

      if(numberStore !== undefined){
        adress.numberStore = numberStore;
      }

      if(city !== undefined){
        adress.city = city;
      }

      if(uf !== undefined){
        adress.uf = uf;
      }

      if(district !== undefined){
        adress.complement = complement;
      }

      try{
          const adressEdit = await AdresssModal.findByIdAndUpdate({ _id: adress.id}, {$set: adress}, { new: true});
          if(adressEdit !== null){
            store.adress = adressEdit;
            const storeEdit = await StoreModal.findByIdAndUpdate({ _id: store.id}, {$set: store}, { new: true}).populate([{"path": "adress", "model": "Adress"}]);
            return res.status(201).json({ message: "A loja alterada com sucesso !", storeEdit})
          }
      }catch(error){
        return res.status(400).json({ message: "Não foi possível editar !"});
      }
    }else{
      try{
        const storeEdit = await StoreModal.findByIdAndUpdate({ _id: store.id}, {$set: store}, { new: true}).populate([{"path": "adress", "model": "Adress"}]);
        return res.status(201).json({ message: "A loja alterada com sucesso !", storeEdit})
      }catch(error){
        return res.status(400).json({ message: "Não foi possível editar !"});
      }
      }
    }

    public async deleteStore(req: Request, res: Response){
      const id: String = req.params.id;

      const storeExist = await verifyExistsStore(id);

      if(storeExist === null){
        return res.status(422).json({ message: "O id informado não existe !"});
      }

      try {
        await StoreModal.findByIdAndDelete({ _id: id});
        return res.status(201).json({ message: "Loja excluida com sucesso !"});
      }catch(error){
       return res.status(400).json({ message: "Não foi possível excluir loja !"})
      }
    }

}
