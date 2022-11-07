const Equipamento = require('../../models/configuracao/Equipamento');

module.exports = class EquipamentoController {
    static async create(req, res){
        const { nome, capacidade, marca, modelo, tipoEquipamento, categoria, status} = req.body;


        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatorio'});
            return;
        }
        
        if(tipoEquipamento !== "Lavadora" && tipoEquipamento !== "Autoclave" && tipoEquipamento !== "Cortado de Grau Cirúgico" && 
        tipoEquipamento !== "Incubadora Biológico" && tipoEquipamento !== "Seladora" && tipoEquipamento !== "Secadora de Traqueia" &&
        tipoEquipamento !== "Termo Desinfectadora" ){
            res.status(422).json({ message: 'O tipo de equipamento é inválido!'})
            return;
        }

        if(categoria !== "Vapor" && categoria !== "Peróxido" && categoria !== "Formoldeido" && 
        categoria !== "Termo" && categoria !== "Ultrasônica" && categoria !== "Outros"){
            res.status(422).json({ message: 'O tipo de categoria é inválido!'})
            return;
        }

        if(status !== "Disponivel" && status !== "Em Manutenção"){
            res.status(422).json({ message: 'O status é inválido!'})
            return;
        }

        const equipamentoExists = await Equipamento.findOne({ nome: nome});

        if(equipamentoExists){
            res.status(422).json({ message: 'Por favor, utilize outro nome de equipamento' });
            return;
        }

        const equipamento = new Equipamento({
            nome,
            capacidade, 
            marca, 
            modelo, 
            tipoEquipamento, 
            categoria, 
            status
        });

        try{ 
            const newEquipament = await equipamento.save();
            return res.status(200).json({ message: 'Salvo com sucesso!', newEquipament});
        }catch(error){
            return res.status(500).json({ message: error });
        }
    }

    static async show(req, res){
        try{
            const equipamentos = await Equipamento.find();
            return res.status(200).json({ equipamentos });
        }catch(error){
            return res.status(500).json({ message: error});
        }
    }

    static async getEquipamentoById(req, res){
        const id = req.params.id;
        try{
            const equipamento = await Equipamento.findOne({_id: id});
            return res.status(200).json({ equipamento});
        }catch(error){
            return res.status(500).message({ message: error });
        }
    }

    static async edit(req, res){
        const id = req.params.id;

        const { nome, capacidade, marca, modelo, tipoEquipamento, categoria, status} = req.body;

        try {
            const equipamento = await Equipamento.findOne({ _id: id});
            if(!nome){
                res.status(422).json({ message: 'O nome é obrigatorio'});
                return;
            }
            equipamento.nome = nome;
            
            if(tipoEquipamento !== "Lavadora" && tipoEquipamento !== "Autoclave" && tipoEquipamento !== "Cortado de Grau Cirúgico" && 
            tipoEquipamento !== "Incubadora Biológico" && tipoEquipamento !== "Seladora" && tipoEquipamento !== "Secadora de Traqueia" &&
            tipoEquipamento !== "Termo Desinfectadora" ){
                res.status(422).json({ message: 'O tipo de equipamento é inválido!'})
                return;
            }
            equipamento.tipoEquipamento = tipoEquipamento;

            if(categoria !== "Vapor" && categoria !== "Peróxido" && categoria !== "Formoldeido" && 
            categoria !== "Termo" && categoria !== "Ultrasônica" && categoria !== "Outros"){
                res.status(422).json({ message: 'O tipo de categoria é inválido!'})
                return;
            }
            equipamento.categoria = categoria;

            if(status !== "Disponivel" && status !== "Em Manutenção"){
                res.status(422).json({ message: 'O status é inválido!'})
                return;
            }
            equipamento.status = status;

            if(!capacidade){
                equipamento.capacidade = capacidade;
            }
            if(!marca){
                equipamento.marca = marca;
            }
            if(!modelo){
                equipamento.modelo = modelo;
            }

            try{
                const equipamentoEdit = await Equipamento.findByIdAndUpdate({_id: id}, {$set: equipamento}, {new: true});
                return res.status(200).json({ message: 'Editado com sucesso !', equipamentoEdit});
            }catch(err){
                return res.status(500).json({ message: err})
            }

        }catch(error){
            return res.status(422).json({ message: 'Equipamento não encontrado!'});
        }
       
    }

    static async delete(req, res){
        const id = req.params.id;
        try{
            await Equipamento.findByIdAndDelete({_id: id});
            return res.status(200).json({ message: 'Excluído com sucesso'});
        }catch(error){
            return res.status(500).json({message: error});
        }
    }
}