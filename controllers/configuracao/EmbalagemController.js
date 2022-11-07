const Embalagem = require('../../models/configuracao/Embalagem');

module.exports = class EmbalagemController {
    static async create(req, res){
        const { nome, validade} = req.body;

        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        if(!validade > 0){
            res.status(422).json({ message: 'A validade precisa ser maior do 0' });
            return;
        }

        const embalgemExists = await Embalagem.findOne({ nome: nome});

        if(embalgemExists){
            res.status(422).json({ message: 'Por favor, utilize outro nome de embalagem' });
            return;
        }

        const embalagem = new Embalagem({
            nome,
            validade
        });

        try{ 
            const newEmabalagem = await embalagem.save();
            return res.status(200).json({ message: 'Salvo com sucesso!' , newEmabalagem})
        }catch(error){
            return  res.status(500).json({ message: error })
        }
        
    }

    static async show(req, res){
        try{
            const embalagens = await Embalagem.find();
            return res.status(200).json({ embalagens });
        }catch(error){
            return res.status(500).json({ message: error});
        }
    }

    static async getEmbalagemById(req, res){
        const id = req.params.id;
        try{
            const embalagem = await Embalagem.findOne({_id: id});
            return res.status(200).json({ embalagem });
        }catch(error){
            return res.status(500).json({message:  error});
        }
    }

    static async edit(req, res){
        const id = req.params.id;
        const { nome, validade } = req.body;
        
        try{
            const embalagem = await Embalagem.findOne({ _id: id });
            if(!nome){
                res.status(422).json({ message: 'O nome é obrigatório' });
                return;
            }
            embalagem.nome = nome;
            if(!validade > 0){
                res.status(422).json({ message: 'A validade precisa ser maior do 0' });
                return;
            }
            embalagem.validade  = validade;

            try{
                const embalagemEdit = await Embalagem.findByIdAndUpdate({_id: embalagem._id}, {$set: embalagem}, {new: true});
                return res.status(200).json({ message: 'Editado com sucesso!', embalagemEdit});
            }catch(error){
                return res.status(500).json({ message: error });
            }
        }catch(error){
            res.status(422).json({ message: 'Embalagem não encontrada!'})
        }

    }

    static async delete(req, res){
        const id = req.params.id;
        try{
            await Embalagem.findByIdAndDelete({ _id: id});
            return res.status(200).json({ message: 'Excluído com sucesso!'});
        }catch(error){
            return res.status(500).json({ message: error});
        }
    }
}

