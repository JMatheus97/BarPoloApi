import { UserI } from "../src/interfaces/UserI";
import { Request, Response} from 'express'
const jwt  = require('jsonwebtoken');

const createUserToken = async(user: UserI, req: Request, res: Response) => {

    // create a token
    const token = jwt.sign({
        useName: user.userName,
        id: user._id
    }, "nossosecret");

    // return token
    res.status(200).json({

        message: "Você está autenticado",
        usuario: user,
        token: token,
    })

}

export default createUserToken;
