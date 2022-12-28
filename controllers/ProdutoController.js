const Produto = require('../models/Produto');


module.exports = class ProdutoControler {
    static async create(req, res){
        const { nome, valor, quantidade, tipo} = req.body;

        if(!nome){
            return res.status(422).json({ message: "Informe o nome do produto !"});
        }

        if(!valor){
            return res.status(422).json({ message: "Informe o valor do produto !"});
        }
 
   

            const produtoExixts = await Produto.findOne({ nome});
            
            if(produtoExixts){
                return res.status(422).json({ message: "O nome do produto já existe"});
            }

            const produto = Produto({
                nome,
                valor
            });

            try{
                const resultProduto = await produto.save();
                return res.status(200).json({ message: "Produto registrado com sucesso !" , resultProduto});
            }catch(error){
                return res.status(400).json({ message: "Não foi possível registrar o produto"})
            }

        }

}