import { Request, Response } from "express";
import CommandsModel from "../classes/Commands";

export class CommandsControler extends CommandsModel {

  public create(req: Request, res: Response){
    let commands = new CommandsModel(req.body);
  }
}
