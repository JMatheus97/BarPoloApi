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
}
