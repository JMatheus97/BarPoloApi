const Procedimento = require('../../models/configuracao/Procedimento');

module.exports = class ProcedimentoController {
    static async create(req, res){
        const { nome, obrigatorio, tipoItem } = req.body;

        if(!nome){
            return res.status(422).json({message: 'O nome do procedimento é obrigatório!'});
        }

        if(!obrigatorio && typeof(obrigatorio) !== Boolean){
            return res.status(422).json({ message: 'Obrigatorio tem ser um verdadeiro ou falso!'});
        }
        
        if(!tipoItem){
            return res.status(400).json({ message: 'O tipo de item é obrigatorio!'})
        }
        for(let itens of tipoItem){
     
            if(!itens._id){
                return res.status(400).json({ message: 'O id de tipo do item é obrigatorio!'})
            }else if(!itens.nome){
                return res.status(400).json({ message: 'O nome de tipo do item é obrigatorio!'})
            }else if(!itens.tipo){
                return res.status(400).json({ message: 'O campo tipo é obrigatorio!'})
            }else if(itens.quantidadeMaterial){
                return res.status(400).json({ message: 'O campo quantidadeMaterial é obrigatorio!'})
            }
        }
   

        const procedimentoExists = await Procedimento.findOne({ nome: nome});
        

        if(procedimentoExists){
            return res.status(422).json({ message: 'O nome do procedimeto precisa ser diferente!'});
        }

        const procedimento = new Procedimento({
            nome,
            obrigatorio, 
            tipoItem
        });

        try{
            const newprocedimento = await procedimento.save();
            const  newprocedimentoteste = await Procedimento.findOne({ _id: newprocedimento._id}).populate("tipoItem"); 
            return res.status(200).json({ message: 'Salvo com sucesso!', newprocedimentoteste});
        }catch(error){
            return res.status(400).json({message: error})
        }
    }

    static async show(req, res){
        try{
            const procedimentos = await Procedimento.find().populate("tipoItem");
            return res.status(200).json({ procedimentos });
        }catch(error){
            return res.status(500).json({message: error})
        }
    }

    static async getProcedimentoById(req, res){
        const id = req.params.id;

        try{
            const procedimento = await Procedimento.findOne({ _id: id}).populate("tipoItem");
            return res.status(200).json({ procedimento });
        }catch(error){
            return res.status(500).json({ message: error});
        }
    }
    
    static async editProcedimento(req, res){
        const id  = req.params.id;
        const { procedimento } = req.body;
        const { nome, obrigatorio, tipoItem } = procedimento;
        try{

            const procedimento = await Procedimento.findOne({ _id: id}).populate("tipoItem");
            
            if(!nome){
                return res.status(422).json({message: 'O nome do procedimento é obrigatório!'});
            }
            procedimento.nome = nome;

            if(!obrigatorio && typeof(obrigatorio) !== Boolean){
                return res.status(422).json({ message: 'Obrigatorio tem ser um verdadeiro ou falso!'});
            }
            procedimento.obrigatorio = obrigatorio;

            procedimento.tipoItem = [];

            if(tipoItem){
                let newItens;
                for( newItens of tipoItem){
                    if(!newItens._id){
                        return res.status(400).json({ message: 'O id de tipo do item é obrigatorio!'})
                    }else if(!newItens.nome){
                        return res.status(400).json({ message: 'O nome de tipo do item é obrigatorio!'})
                    }else if(!newItens.tipo){
                        return res.status(400).json({ message: 'O campo tipo é obrigatorio!'})
                    }else if(newItens.quantidadeMaterial){
                        return res.status(400).json({ message: 'O campo quantidadeMaterial é obrigatorio!'})
                    }  
                    procedimento.tipoItem.push(newItens);
                }
            }

            try{
                const procedimentoEdit = await Procedimento.findByIdAndUpdate({ _id: id}, {$set: procedimento}, {new: true});
                const  newprocedimentoteste = await Procedimento.findOne({ _id: procedimentoEdit._id}).populate("tipoItem"); 
                return res.status(200).json({ message: "Editado com sucesso", newprocedimentoteste})
            }catch(error){
                return res.status(500).json({ message: error });
            }
        }catch(error){
            return res.status(422).json({ message: "Procedimento não encontrado!" });
        }
    }

    static async delete(req, res){
        const id = req.params.id;

        try{
        const procedimento = await Procedimento.findOne({ _id: id}).populate("tipoItem");
        
        let tipoItem;
        for(tipoItem of procedimento.tipoItem){
            if(tipoItem._id){
                res.status(422).json({ message: "Não é possível excluir procedimento com tipo de item vinculado!"})
                return;
            }
        }

        try{
            await Procedimento.findByIdAndDelete({ _id: id});
            res.status(200).json({ message: "Excluído com sucesso!"})
        }catch(erro){
            res.status(500).json({message: erro})
        }
        
        }catch(error){
            return res.status(422).json({ message: "Procedimento não encontrado!"})
        }
    }
}