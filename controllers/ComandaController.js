const Comanda = require('../models/Comanda');
const Mesa = require('../models/Mesa');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const Estoque  = require('../models/Estoque');

module.exports = class ComandaController {
    static async create(req, res){
        const { nomeCliente, valor, mesa, status, usuario, produto} = req.body;

        if(!nomeCliente){
            return res.status(422).json({ message: "Informe o nome do cliente"});
        }

        const comandaExists = await Comanda.findOne({ nomeCliente });

        if(comandaExists){
            return res.status(422).json({ message: "Já existe comanda com o nome de cliente informado !"});
        }

        if(!status){
            return res.status(422).json({ message: "Status é obrigatorio para criar comanda ! "});
        }

        const mesaDisponivel = await Mesa.findById({_id: mesa});

        if(mesaDisponivel.status === "Ocupado"){
            return res.status(422).json({ message: "A mesa ocupada !"});
        }

        const usuarioExists = await Usuario.findById({ _id: usuario});

        if(!usuarioExists){
            return res.status(422).json({ message: "O usuário não  encontrado !"});
        }

        if(produto !== null){
            const produtoEstoque = await Estoque.findOne({ produto});

            if(!produtoEstoque){
                return res.status(422).json({ message: "Não existe esse produtos no estoque !"})
            }else {
                if(produtoEstoque.quantidade <= 0){
                    return res.status(422).json({ message: "Não há estoque desse produto !"});
                }
            }
        }

        const comanda = new Comanda({
            nomeCliente,
            status,
            valor,
            mesa,
            produto,
            usuario
        });

        try{
            const comandaSave = await comanda.save();
            const resultComanda = await Comanda.findById({ _id: comandaSave._id});
            return res.status(200).json({ resultComanda });
        }catch(error){
             res.status(400).json({ message: "Não foi possível registar comanda !"});
             return console.log(error);
        }
    }

    
    static async find(req, res){
        try{
            const comandas = await Comanda.find().populate("produto").populate("mesa").populate("usuario");
            return res.status(200).json({ comandas });
        }catch(error){
            return res.status(400).json({ message: "Não foi possível listar comandas !"});
        }
    }

}