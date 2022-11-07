const Detergente = require('../../models/configuracao/Detergente');

module.exports =  class DetergenteController {
    static async create(req, res) {
        const { nome, tipo, marca, enzimas, ph, diluicao, temperatura, lote } = req.body;

        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        if(tipo !== "Neutro" && tipo !== "Alcalino" && tipo !== "Enzimático"){
            res.status(422).json({ message: 'O tipo é inválido' });
            return;
        }

        const detergenteExists = await Detergente.findOne({ nome: nome});


        if(detergenteExists){
            res.status(422).json({ message: 'Por favor, utilize outro nome de detergente' });
            return;
        }

        const detergente = new Detergente({
            nome,
            tipo,
            marca,
            enzimas,
            ph,
            diluicao,
            temperatura,
            lote
        });

        try{
            const newDetergente = await detergente.save();
            res.status(200).json({ message: 'Salvo com sucesso', newDetergente});
        }catch(error){
            res.status(500).json({ message: error});
        }
    }

    static async show(req, res) {
        try{
            const detergentes = await Detergente.find();
            res.status(200).json({ detergentes });
        }catch(error){
            res.status(500).json({ message: error})
        }
    }

    static async getDetergenteById(req, res) {
        const id = req.params.id;
        try{
            const detergente = await Detergente.findOne({_id: id});
            res.status(200).json({ detergente });
        }catch(error){
            res.status(500).json({ message: error});
        }
    }

    static async edit(req, res){
        const id = req.params.id;

        const { nome, tipo, marca, enzimas, ph, diluicao, temperatura, lote } = req.body;

        try{
            const detergente = await Detergente.findOne({_id: id});
            if(!nome){
                res.status(422).json({ message: 'O nome é obrigatório' });
                return;
            }
            detergente.nome = nome;
            if(tipo !== "Neutro" && tipo !== "Alcalino" && tipo !== "Enzimático"){
                res.status(422).json({ message: 'O tipo é inválido' });
                return;
            }
            detergente.tipo = tipo;
            if(!marca){
                detergente.marca = marca;
            }
            if(!enzimas){
                detergente.enzimas = enzimas;
            }
            if(!marca){
                detergente.ph = ph;
            }
            if(!marca){
                detergente.marca = marca;
            }
            if(!marca){
                detergente.diluicao = diluicao;
            }
            if(!marca){
                detergente.temperatura = temperatura;
            }
            if(!marca){
                detergente.lote = lote;
            }

            try{
                const detegenteEdit = await Detergente.findByIdAndUpdate({_id: detergente._id}, {$set: detergente}, {new: true});
                return res.status(200).json({ message: 'Editado com sucesso ', detegenteEdit})
            }catch(err){
                return res.status(500).json({ message: err});
            }
        }catch(error){
                return res.status(422).json({ message: 'Usuário não encontrado!'})
        }
    }

    static async delete(req, res){
        const id = req.params.id;
        try{
            await Detergente.findByIdAndDelete({ _id: id});
            res.status(200).json({ message: 'Excluído com sucesso!'});
        }catch(error){
            res.status(400).json({message: error})
        }
    }
}