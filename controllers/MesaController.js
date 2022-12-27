const Mesa = require('../models/Mesa');

module.exports = class MesaController {
    static async create(req, res) {
        const { numeroMesa, quantidadeCliente } = req.body;

        if(!numeroMesa) {
            return  res.status(422).json({ mesage: " Informe o numero da mesa!"});
        }

        if(!quantidadeCliente){
            return res.status(422).json({ message: "Informe ao menos um cliente!"});
        }

        const mesa = await Mesa({ 
            numeroMesa,
            quantidadeCliente
        });
        try{ 
            const resultMesa = await mesa.save();
            return res.status(200).json({ message: "Salvo com sucesso", resultMesa });
        }catch(error){
            return res.status(400).json({ message: "Erro não foi possível salvar mesa!", error});
        }
    }
}