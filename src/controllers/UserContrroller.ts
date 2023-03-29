import UserModal from "../classes/User";
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import createUserToken from "../../helpers/create-user-token";

export class UserController extends UserModal{
  public   async create(req: Request, res: Response ){
    const user = new UserModal(req.body)

    if(user.nome === undefined){
      res.status(401).json({ message: "O campo Nome é obrigatório !"});
      return;
    }

    if(user.userName === undefined){
      res.status(401).json({ message: "O campo Nome de Usuário é obrigatório !"});
      return;
    }

    if(user.password === undefined){
      res.status(401).json({ message: "O campo Senha é obrigatório !"});
      return;
    }

    if(user.perfil === undefined){
      res.status(401).json({ message: "O campo Perfil é obrigatório !"});
      return;
    }

       // Create a password
       const salt = await bcrypt.genSalt(12);
       const passwordHash = await bcrypt.hash(user.password, salt);

       user.password = passwordHash;

       try{
        const resultUsuario = await user.save();
        await createUserToken(resultUsuario, req, res);
    }catch(error){
        return res.status(400).json({ message: "Erro ao salvar usuário!", error});
    }
  }

  public async login(req: Request, res: Response){
      const user = new UserModal(req.body);

      if(user.userName === undefined){
        return res.status(401).json({ message: "O campo nome de usuário obrigatório !"});
      }

        if(user.password === undefined){
        return res.status(401).json({ message: "O campo senha obrigatório !"});
      }

      try{
        const checkUserName = await UserModal.findOne({ userName: user.userName });

        if(checkUserName !== null){
          const checkPassword = await bcrypt.compare(user.password, checkUserName.password);

          if(!checkPassword){
            return res.status(401).json({ message: "A senha informada é inválida !"});
          }
          await createUserToken(user, req, res);
        }else {
          return res.status(401).json({ message: "O Usuário informado é inválido !"})
        }

      }catch(error){
          return res.status(400).json({ message: "Usuário não existe"})
      }
  }


}
