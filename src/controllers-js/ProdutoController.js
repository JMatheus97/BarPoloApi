const Produto = require('../classes-js/Produto');
const Estoque = require('../classes-js/Estoque');

module.exports = class ProdutoControler {
    static async create(req, res){
        const { nome, valor} = req.body;

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

        static async find(req, res){
            try{
                const produtos = await Produto.find();
                return res.status(200).json({ produtos});
            }catch(error){
                return res.status(400).json({ message: "Não foi possível listar produtos !"});
            }
        }

        static async edit(req, res){
            const id  = req.params.id;

            const { nome, valor } = req.body;

            try{
            const produto = await Produto.findById({_id: id});

            if(!produto){
                return res.status(422).json({ message: "O produto informado não existe !"});
            }

            if(nome){
                produto.nome = nome;
            }

            if(valor){
                produto.valor = valor;
            }

            console.log(produto)
            const produtoEdit = await Produto.findByIdAndUpdate({_id: produto._id},  {$set: produto}, {new: true});
            return res.status(200).json({ produtoEdit });

        }catch(error){
                 res.status(400).json({message: "Não foi possível editar o produto !"});
                 console.log(error);
            }
        }

        static async delete(req, res){
            const id = req.params.id;

            const produto  = await Produto.findById({ _id: id});
            if(!produto){
                return res.status(422).json({ message: "O produto não encontrado !"});
            }else{
                const estoqueExits = await Estoque.findOne({ produto })
                console.log(estoqueExits)
                if(estoqueExits){
                    if(estoqueExits.quantidade !== 0){
                        return res.status(422).json({ message: "Não é possível excluir  produto que possui estoque !"});
                    }
                }else{
                    try {
                        await Produto.findByIdAndDelete({ _id: produto._id});
                        return res.status(200).json({ message: "O produto excluído com sucesso !"});
                    }catch(error){
                        return res.status(400).json({ message: "Não foi possível excluir produto !"})
                    }
                }
            }

        }

}
