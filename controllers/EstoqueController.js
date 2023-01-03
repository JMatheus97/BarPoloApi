const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

module.exports = class EstoqueController {
    static async create(req, res){
        const { produto, quantidade, tipo} = req.body;
        let produtoExists;
        try {
             produtoExists = await Produto.findById({ _id: produto});
        }catch(error){
            return res.status(422).json({ message: "Produto não encontrado", error})
        }
        
        if(!quantidade){
            return res.status(422).json({ message: "Informe o quantidade do produto !"});
        }
        
        if(!tipo){
            return res.status(422).json({ message: "Informe o tipo do produto !"});
        }


        const estoque = Estoque({
            produto,
            quantidade,
            tipo,
    });

        try {
            const resulEstoque = await estoque.save().populate("produto");
            return res.status(200).json({ message: "Estoque registrado com sucesso !", resulEstoque });
        }catch(error){
            return res.status(400).json({ message: "Não foi possível registar o estoque !", error });
        }
    }

    static async find(req, res){
        try{
            const estoques = await Estoque.find().populate("produto");
            return res.status(200).json({ estoques});
        }catch(error){
            return res.status(400).json({ message: "Não foi possível listar estoque !"});
        }
    }
}