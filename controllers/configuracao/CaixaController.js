const Material = require('../../models/configuracao/Material');
const Procedimento = require('../../models/configuracao/Procedimento');

module.exports = class CaixaController{
    static async inserirMaterialCaixa(req, res){
        const id = req.params.id;
        const { itens } = req.body;
        
        try{
            const caixa = await Material.findOne({ _id: id}).populate("itens")
            
            if(itens.length <= 0 || itens === null ){
                return res.status(422).json({ message: "Informe o material que deseja inserir na caixa!"});
            }

            try{
                for(let verifyItem of itens){
                    const getMaterial = await Material.findOne({ _id: verifyItem._id});
                    if(getMaterial.caixa !== null){
                        return res.status(422).json({ message: `O material ${getMaterial.nome} pertence a outra caixa!`})
                    }
                }
            }catch(erro){
                return res.status(422).json({ message: "O material não existe"})
            }
       

            if(caixa.indicadoCaixa !== true){
                return res.status(422).json({ message: "O material não é uma caixa!"});
            }
            
            console.log(itens)
         
            if(caixa.procedimento){
                try{
                    const getProcedimento = await Procedimento.findOne({ _id: caixa.procedimento}).populate("tipoItem");
                        for(let i =0; i < getProcedimento.tipoItem.length; i++){
                            for(let j = 0; j < itens.length; j ++){
                                if(itens[j].tipoItem._id === getProcedimento.tipoItem[i]._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")){
                                    if(caixa.itens.length > 0){
                                        for(let caixaItem of caixa.itens){
                                            if(!caixaItem.code === itens[j].code){
                                             itens[j].caixa =caixaItem._id;
                                             caixa.itens.push(itens[j])
                                         }
                                      }
                                    }else {
                                        itens[j].caixa = caixa._id;
                                        caixa.itens.push(itens[j])
                                    }
                                }
                            }
                        }     
                          
                }catch(error){
                    return res.status(422).json({ message: "O procedimento informado não existe" })
                }  
            }else{
                return res.status(422).json({ message: "A caixa não possui procedimento vinculado!" })
            }

           
            try{
                console.log(caixa)
                const newcaixa = await Material.findByIdAndUpdate({ _id: id}, {$set: caixa}, {new: true});
                const caixaProcedimento = await Material.findOne({ _id: newcaixa.id}).populate({ path: 'procedimento', populate: { path: 'tipoItem' }})
                .populate('itens');
                const { procedimento: [{_id, nome, tipoItem}] } = caixaProcedimento;
                let caixaPronta = {
                    id: caixaProcedimento._id,
                    procedimento: {
                        id:_id,
                        nome :nome
                    },
                    nome: caixaProcedimento.nome,
                    code: caixaProcedimento.code,
                    status: caixaProcedimento.status,
                    itens: []
                }
                let tipoItemProcedimento;
                    for(let procedimentoTipoItem of tipoItem){
                        for(let i = 0; i < caixaProcedimento.itens.length; i++){
                           if(procedimentoTipoItem._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") === caixaProcedimento.itens[i].tipoItem._id.toString().replace(/ObjectId\("(.*)"\)/, "$1")){
                                 tipoItemProcedimento = {
                                    id: caixaProcedimento.itens[i]._id,
                                    nome: procedimentoTipoItem.nome,
                                    materia: caixaProcedimento.itens[i].nome,
                                    code:caixaProcedimento.itens[i].code,
                                    status: caixaProcedimento.itens[i].status,
                                }
                           }else {
                                tipoItemProcedimento = {
                                    id: procedimentoTipoItem._id,
                                    nome: procedimentoTipoItem.nome,
                                    code: "",
                                    status: ""
                                }
                           }
                          
                        caixaPronta.itens.push(tipoItemProcedimento)
                    }
                }
                        
                return res.status(200).json({ message: "Inserido com sucesso!", caixaPronta});
            }catch(error){
                return res.status(500).json({ message: "Não foi possível inserir item dentro da caixa!"})
            }
        }catch(error){
            return res.status(500).josn({ message: "Não foi possível localizar o material"})
        }
    }
}