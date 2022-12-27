const Material = require('../../models/configuracao/Material');
const Procedimento = require('../../models/configuracao/Procedimento');
const TipoItem = require('../../models/configuracao/TipoItem');
const Localizacao = require('../../models/configuracao/Localizacao'); 

const EnumMaterial = require('../../helpers/Enum/EnumMaterial');

module.exports = class MaterialController {
    static async create(req, res){
        const {nome, terceiro, fabricante, modelo, code, indicadorCaixa, valor, 
             indicadorDisponivelSaida, status, dataCadastro, quantidadeEsterilizacoes, 
             procedimento,  tipoItem, itens, caixa, localizacao } = req.body;

             try{
                if(!nome){
                    return res.status(422).json({ message: "O nome é obrigatório"});
                }
                
                const getCode = await Material.findOne({ code: code});
                if(getCode){
                   return res.status(422).json({ message: "O codigo já existe" }); 
                }
                if(!code){
                    return res.status(422).json({ message: "O code é obrigatório"});
                }

                if(!status){
                    return res.status(422).json({ message: "O status é obrigatório"});
                }
                const filterStatus = EnumMaterial.filter(enumMaterial => enumMaterial === status);
                if(filterStatus.length === 0){
                    return res.status(422).json({ message: "O status é inválido"});
                }
                       
                if(!dataCadastro){
                    return res.status(422).json({ message: "A data cadastro é obrigatório"});
                }

                if(procedimento){
                    const getProcedimento = await Procedimento.findOne({ _id: procedimento._id})
                    if(!getProcedimento){
                        return res.status(422).json({ message: "O procedimento não encontrado!"});
                    }
                }
                
                if(!tipoItem){
                    return res.status(422).json({ message: "O tipoItem é obrigatório"});
                }
                const getTipoItem = await TipoItem.findOne({ _id: tipoItem._id});
                if(!getTipoItem){
                    return res.status(422).json({ message: "O tipo de item não foi encontrado"});
                }

                if(localizacao ){
                    const getLocalizacao = await Localizacao.findOne({ _id: localizacao._id});
                    if(!getLocalizacao){
                        return res.status(422).json({ message: "A localização não foi encontrada"})
                    }
                }

                const material = new Material({
                    nome,
                    dataCadastro,
                    code,
                    terceiro,
                    fabricante,
                    modelo,
                    caixa,
                    indicadorCaixa,
                    itens,
                    valor,
                    tipoItem,
                    localizacao,
                    procedimento,
                    quantidadeEsterilizacoes,
                    status
                })
                try{ 
                    const newMaterial = await material.save();
                    const newMaterialDados = await Material.findOne({_id: newMaterial._id})
                    .populate("tipoItem").populate("procedimento").populate("localizacao");
                    return res.status(200).json({ message: "Salvo com sucesso!", newMaterialDados});
                }catch(error){
                    return res.status(500).message({ message: error})
                }
             }catch(error){
                return res.status(500).json({ message: error});
             }
    }

    static async show(req, res){
        try{
            const materiais = await Material.find().populate("tipoItem").populate("procedimento").populate("localizacao").populate("itens")
            return res.status(200).json({ materiais })
        }catch(error){
            return res.status(500).json({ message: error });
        }
    }

    static async getMaterialById(req, res){
        const id = req.params.id;
        try{
            try{
                const material = await Material.findOne({ _id: id});
                return res.status(200).json({ material });
            }catch(error){
                return res.status(500).json({ message: "O material não foi encontrado!"})
            }
        }catch(error){
            return res.status(500).json({ message: error})
        }
    }

    static async edit(req, res){
        const id = req.params.id;
        
        const {nome, terceiro, fabricante, modelo, code, indicadorCaixa, valor, 
            indicadorDisponivelSaida, status, dataCadastro, quantidadeEsterilizacoes, 
            procedimento,  tipoItem,  localizacao } = req.body;
            try{
                const material = await Material.findOne({ _id: id});
                if(!nome){
                    return res.status(422).json({ message: "O nome é obrigatório"});
                }
                material.nome = nome;

                if(typeof(terceiro) === "boolean"){
                    material.terceiro = terceiro;
                }

              
                if(typeof indicadorCaixa === "boolean"){
                    material.indicadorCaixa = indicadorCaixa;
                }

                if(typeof indicadorDisponivelSaida === "boolean"){
                    material.indicadorDisponivelSaida = indicadorDisponivelSaida;
                }

                if(fabricante){
                  material.fabricante = fabricante;
                }else {
                    material.fabricante = ""
                }

                if(dataCadastro){
                    material.dataCadastro = dataCadastro;
                  }

                if(modelo){
                    material.modelo = modelo;
                  }else {
                    material.modelo = ""
                  }

                  if(valor > 0){
                    material.valor = valor;
                  }else {
                    material.valor = 0;
                  }

                  if(quantidadeEsterilizacoes > 0){
                    material.quantidadeEsterilizacoes = quantidadeEsterilizacoes;
                  }else {
                    material.quantidadeEsterilizacoes = 0;
                  }
                
                if(!code){
                    return res.status(422).json({ message: "O code é obrigatório"});
                }
                if(material.code !== code){
                    const getCode = await Material.findOne({ code: code});
                    if(getCode){
                    return res.status(422).json({ message: "O codigo já existe" }); 
                    }
                }
                material.code = code;

                if(!status){
                    return res.status(422).json({ message: "O status é obrigatório"});
                }
                const filterStatus = EnumMaterial.filter(enumMaterial => enumMaterial === status);
                if(filterStatus.length === 0){
                    return res.status(422).json({ message: "O status é inválido"});
                }
                material.code = code;

                if(procedimento){
                    try{
                        const getProcedimento = await Procedimento.findOne({ _id: procedimento});
                        material.procedimento = getProcedimento;
                    }catch(error){
                        return res.status(400).json({ message: "O procedimento informado não existe" })
                    }       
                }

                if(localizacao){
                    try{
                        const getLocalizacao = await Localizacao.findOne({ _id: localizacao});
                        material.localizacao = getLocalizacao;
                    }catch(error){
                        return res.status(400).json({ message: "A localização informado não existe" })
                    }
                }

                if(tipoItem){
                    try{
                        const getTipoItem = await TipoItem.findOne({ _id: tipoItem});
                        material.tipoItem = [];
                        material.tipoItem = getTipoItem;
                    }catch(error){
                        return res.status(400).json({ message: "O tipo de Item informado não existe" })
                    }
                   
                }
                try{ 
                    const materialEdit = await Material.findByIdAndUpdate({ _id: id} , {$set: material}, {new: true});
                    const newMaterialEdit = await Material.findOne({ _id: materialEdit._id }).
                    populate("tipoItem").populate("procedimento").populate("localizacao");
                    return res.status(200).json({ message: "Editado com sucesso", newMaterialEdit});
                }catch(error){
                    return res.status(500).json({ message: error })
                    
                }


            }catch(error){
                return res.status(500).json({ message: "O material não foi encontrado!"});
            }
    }

    static async delete(req, res){
        const id = req.params.id;
        try{
            const material = await Material.findOne({ _id: id});
            console.log(material)
            if(material.procedimento){
               return res.status(422).json({ message: "Não é possível excluir material com procedimento vinculado"});
            }
          
           try{
                await Material.findByIdAndDelete({ _id: id});
                return res.status(200).json({ message: "Excluido com sucesso !"})
           }catch(error){
                return res.status(500).json({ message: error})
           }

        }catch(error){
            return res.status(500).json({ message: "O material não foi encontrado"})
        }
    }
}
