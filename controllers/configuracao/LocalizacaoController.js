const Localizacao = require('../../models/configuracao/Localizacao');

module.exports = class LocalizacaoController {
    static async create(req, res){
        const { armario, sala, prateleira} = req.body;

        if(!armario){
            return res.status(422).json({ message: 'O armario é obrigatório'});
        }

        if(!prateleira){
            return res.status(422).json({ message: 'O prateleira é obrigatório'});
        }

        const localizacao = new Localizacao({
            armario,
            prateleira,
            sala
        });

        try{ 
            const newLocalizacao = await localizacao.save();
            res.status(200).json({ message: 'Salvo com sucesso !', newLocalizacao});
        }catch(error){
            return res.status(500).json({ message: error }),
            console.log(error)
        }
        
    }

    static async show(req, res){
        try{
            const localizacoes = await Localizacao.find();
            return res.status(200).json({ localizacoes });
        }catch(error){
           return res.status(500).json({ message: error});
        }
    }

    static async getLocalizacaoById(req, res){
        const id = req.params.id;
        try{
            const localizacao = await Localizacao.findOne({ _id: id});
            return res.status(200).json({ localizacao });
        }catch(error){
           return res.status(500).json({ message: error});
        }
    }

    static async edit(req, res){
        const id = req.params.id;

        const { armario, sala, prateleira} = req.body;

        try{

            const localizacao = await Localizacao.findOne({ _id: id});

            
        if(!armario){
            return res.status(422).json({ message: 'O armario é obrigatório'});
        }
        localizacao.armario = armario;

        if(!prateleira){
            return res.status(422).json({ message: 'O prateleira é obrigatório'});
        }
        localizacao.prateleira = prateleira;

        if(sala != ""){
            localizacao.sala = sala;
        }

        try {
            const newLocalizacao = await Localizacao.findByIdAndUpdate({ _id: id}, {$set: localizacao}, {new: true});
            return res.status(200).json({ message: 'Editado com sucesso', newLocalizacao});
        }catch(err){
            return res.status(500).json({ message: error})
        }

        }catch(error){
            return res.status(422).json({ message: 'Localização não encontrada'});
        }
    }
    
    static async delete(req, res){
        const id = req.params.id;
        try{
            await Localizacao.findByIdAndDelete({ _id: id});
            return res.status(200).json({ message: 'Excluído com sucesso!'})
        }catch(error){
            return res.status(500).json({ message: error})
        }
    }
}