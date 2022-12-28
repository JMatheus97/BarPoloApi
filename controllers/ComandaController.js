const Comanda = require('../models/Comanda');
const Mesa = require('../models/Mesa');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');

module.exports = class ComandaController {
    static async create(req, res){
        const { nomeCliente, valor, mesa, usuario, produto} = req.body;

        if(!nomeCliente){
            return res.status(422).json({ message: "Informe o nome do cliente"});
        }

        const mesaDisponivel = await Mesa.findById({_id: mesa});

        if(mesaDisponivel.status === "Ocupado"){
            return res.status(422).json({ message: "A mesa ocupada !"});
        }

        const usuarioExists = await Usuario.findById({ _id: usuario});

        if(!usuarioExists){
            return res.status(422).json({ message: "O usuário não  encontrado !"});
        }

     
    }
}