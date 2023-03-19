const Estoque = require('../classes-js/Estoque');
const Produto = require('../classes-js/Produto');

module.exports = class EstoqueController {
    static async create(req, res){
        const { produto, quantidade, lote, tipo} = req.body;

        if(!produto){
            return res.status(422).json({ message: "Informe o produto !"});
        }else{
            const produtoExists = await Produto.findById({ _id: produto});

            if(!produtoExists){
                return res.status(422).json({ message: "O produto informado não foi encontrado !"});
            }

            if(!lote){
                return res.status(422).json({ message: "Informe o lote " })
            }

            const loteExists = await Estoque.findOne({ lote });

             if(loteExists){
                return res.status(422).json({ message: "O lote já  existe, favor informar outro !"});
            }
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
            lote,
            tipo,
    });

        try {
            const resulEstoque = await estoque.save()
            const estoques = await Estoque.findById({ _id: resulEstoque._id}).populate("produto");
            return res.status(200).json({ message: "Estoque registrado com sucesso !", estoques });
        }catch(error){
            return res.status(400).json({ message: "Não foi possível registar o estoque !" });
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

    static async edit(req, res){
        const id = req.params.id;

        const { produto, quantidade, lote, tipo } = req.body;

        const estoque = await Estoque.findById({ _id: id});

        if(produto){
            const produtoExists = await Produto.findById({ _id: produto});

            if(!produtoExists){
                return res.status(422).json({ message: "O produto informado não foi encontrado !"});
            } else {
                estoque.produto = produto;
            }
        }

        if(quantidade !== ""){
            estoque.quantidade = quantidade;
        }

        if(tipo){
            estoque.tipo = tipo;
        }

        if(lote){
            if(lote !== estoque){
                const loteExists = await Estoque.findOne({ lote });

                if(loteExists){
                   return res.status(422).json({ message: "O lote já  existe, favor informar outro !"});
               } else{
                estoque.lote = lote;
               }
            }
        }

        try{
            const estoqueEdit = await Estoque.findByIdAndUpdate({ _id: estoque._id}, {$set: estoque}, {new: true});
            const resutlEstoque = await Estoque.findById({ _id: estoqueEdit._id}).populate("produto");
            return res.status(200).json({ message: "Estoque editado com sucesso", resutlEstoque});
        }catch(error){
            return res.status(400).json({ message: "Erro ao editar o estoque !"});
        }
    }

    static async delete(req, res){
        const id = req.params.id;

        const estoque = await Estoque.findById({ _id: id});

        if(!estoque){
            return res.status(422).json({ message: "O estoque não foi encontrado"});
        }else{
            if(estoque.quantidade > 0){
                return res.status(422).json({ message: "O quantidade é maior do que 0 não é possível excluir estoque !"})
            }else{
                try{
                    await Estoque.findByIdAndDelete({ _id: estoque._id});
                    return res.status(200).json({ message: "O estoque foi excluído com sucesso !"});
                }catch(error){
                    return res.status(400).json({ message: "Não foi possível excluir !"});
                }
            }
        }
    }
}
