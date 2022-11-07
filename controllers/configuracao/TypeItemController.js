const TypeItem = require("../../models/configuracao/TipoItem");

module.exports = class TypeItemController {
    static  async create(req, res){
        const { nome, tipo, quantidadeMaterial, file} = req.body;

        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }
        
        if(tipo !== "Implatavel" && tipo !== "N/A" && tipo !== "Semi-Critico"){
            res.status(422).json({ message: 'O tipo é inválido' });
            return;
        }
        const typeItemExists = await TypeItem.findOne({ nome: nome});

        if(typeItemExists){
            res.status(422).json({ message: 'Por favor, utilize outro nome de tipo de item' });
            return;
        }

        const tipoItem = new TypeItem({
            nome,
            tipo,
            quantidadeMaterial,
            file
        });

        try {
            const newTypeItem = await tipoItem.save();
            res.status(200).json({ message: 'Salvo com sucesso', newTypeItem});
        }catch(error){
            res.status(500).json({ message: error});
        }
    }

    static async show(req, res) {
        try{
            const typeItens = await TypeItem.find();
            res.status(200).json({ typeItens })
        }catch(error){
            res.status(500).json({ message: error});
        }   
    }

    static async edit(req, res){
        const id = req.params.id;
        const { nome, tipo, quantidadeMaterial, file} = req.body;
        try{
            const typeItem =  await TypeItem.findOne({ _id: id});
            
            if(nome != ""){
                typeItem.nome = nome;
            }

              if(tipo === "Implatavel" || tipo === "N/A" || tipo === "Semi-Critico"){
                typeItem.tipo = tipo;
            }

            if(quantidadeMaterial != 0){
                typeItem.quantidadeMaterial = quantidadeMaterial;
            }

            if(file != ""){
                typeItem.file = req.file.filename;
            }

            try{
              const item =   await TypeItem.findOneAndUpdate(
                     { _id: typeItem._id},
                     {$set: typeItem},
                     {new: true});
                     return res.status(200).json({ message: "Editado com sucesso",  item });
             }catch(err){
                 res.status(500).json({ message: err});
                 return;
             }
    
        }catch(err){
            return res.status(422).json({ message: "Usuário não encontrado"});
        }

    }

    static async delete(req, res){
        const id = req.params.id;

        try{
            await TypeItem.findByIdAndDelete({ _id: id});
            return res.status(200).json({ message: "Excluido com sucesso"});
        }catch(errr){
            return res.status(400).json({ message: errr});
        }
     
    }

    static async getTypeItemById(req,  res){
        const id = req.params.id;

        try{
            const typeItem = await TypeItem.findOne({_id: id});
            res.status(200).json({ typeItem });
        }catch(error){
            res.status(422).json({ message: error});
        }
    }


}