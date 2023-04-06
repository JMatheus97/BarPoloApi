import { Request, Response } from "express";
import EmployeeModal from "../classes/Employee";
import { verifyExistsUser } from "../../helpers/verify-exits";
import UserModal from "../classes/User";
import bcrypt from 'bcrypt'

export class EmployeeController extends EmployeeModal {
  public async create(req: Request, res: Response){
    let employee = new EmployeeModal(req.body);

    if(req.body.user !== undefined){
      const users = new UserModal(req.body.user);
      employee.user = users;
    }



    if(employee.firstName === undefined){
     return res.status(401).json({ message: "O campo Nome é obrigatório !"})
    }

    if(employee.lastName === undefined){
      return res.status(401).json({ message: "O campo Sobrenome é obrigatório !"})
     }

     if(employee.document === undefined){
      return res.status(401).json({ message: "O campo Documento é obrigatório !"})
     }

     console.log(employee)
     if(employee.user !== undefined){

      try{
        const userExist = await verifyExistsUser(employee.user);
        if(userExist !== null){
          return res.status(401).json({ message: "Já existe um usuário com esse nome de usuario, tente outro !"});
        }

      const user = new UserModal(employee.user);

        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.password, salt);

        user.password = passwordHash;

       const newUser =  await user.save();
       employee.user = newUser;
        const newEmployee = await employee.save();
        return res.status(201).json({ message: "Salvo com sucesso !", newEmployee});

      }catch(error){
        return error;
      }

     }else {
      try {
        const newEmployee = await employee.save();
        return res.status(201).json({ message: "Salvo com sucesso !", newEmployee});
      }catch(error){
        return res.status(400).json({ message: "Não foi possível salvar funcionário !"});
      }
     }
  }

  public async find (req: Request, res: Response){
    try {
      const employees = await EmployeeModal.find().populate([{"path": "user", "model": "User"}]);
      return res.status(200).json(employees);
    }catch(error){
      return res.status(400).json({ message: "Não foi possível buscar funcionários !"});
    }
  }
}
