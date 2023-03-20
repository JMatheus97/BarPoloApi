const Mesa = require('../classes-js/Mesa');
const Comanda = require('../classes-js/Comanda');

module.exports = class MesasController {
    static async create(req, res) {
        const { numeroMesa, quantidadeCliente, status } = req.body;


        if(!numeroMesa) {
            return  res.status(422).json({ mesage: " Informe o numero da mesa!"});
        }

        const consultMesaExits  = await Mesa.findOne({ numeroMesa: numeroMesa});

        if(consultMesaExits){
            return res.status(422).json({ message: "O numero de mesa já está sendo usando !"})
        }

        if(!quantidadeCliente){
            return res.status(422).json({ message: "Informe ao menos um cliente!"});
        }

        const mesa = await Mesa({
            numeroMesa,
            quantidadeCliente,
            status
        });
        try{
            const resultMesa = await mesa.save();
            return res.status(200).json({ message: "Salvo com sucesso", resultMesa });
        }catch(error){
            return res.status(400).json({ message: "Erro não foi possível salvar mesa!", error});
        }
    }

    static async find(req, res){
        try{
            const mesas = await Mesa.find();
            return res.status(200).json({ mesas});
        }catch(error){
            return res.status(400).json({ message: "Não foi possível listar mesas !"});
        }
    }

    static async edit(req, res){
        const id = req.params.id;

        const { numeroMesa, quantidadeCliente, status }  = req.body;

        const mesa = await Mesa.findById({ _id: id});

        if(!mesa){
            return res.status(422).json({ message: "Não foi possível encontrar a mesa !"});
        }

        const consultMesaExits  = await Mesa.findOne({ numeroMesa: numeroMesa});

        if(consultMesaExits){
            return res.status(422).json({ message: "O numero de mesa já está sendo usando !"})
        }

        if(numeroMesa){
            mesa.numeroMesa = numeroMesa;
        }

        if(quantidadeCliente) {
            mesa.quantidadeCliente = quantidadeCliente;
        }

        if(status){
            mesa.status = status;
        }

        try{
            const  mesaEdit = await Mesa.findByIdAndUpdate({ _id: mesa.id}, { $set: mesa }, { new: true });
            return res.status(200).json({ mesaEdit });
        }catch(error){
            return res.status(400).json({ message: "Não foi possível editar a mesa"});
        }
    }

    static async delete(req, res){
        const id = req.params.id;

        const mesa  = await Mesa.findById({ _id: id});
        if(!mesa){
            return res.status(422).json({ message: "O mesa não encontrada !"});
        }else{
            const comandaExits = await Comanda.findOne({ mesa })
            if(comandaExits){
                    return res.status(422).json({ message: "Não é possível excluir mesa que possui comanda !"});
            }else{
                try {
                    await Mesa.findByIdAndDelete({ _id: mesa._id});
                    return res.status(200).json({ message: "A mesa foi excluída com sucesso !"});
                }catch(error){
                    return res.status(400).json({ message: "Não foi possível excluir mesa !"})
                }
            }
        }

    }
}
