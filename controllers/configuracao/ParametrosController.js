const Parametros = require("../../models/configuracao/Parametros");
Parametros.createCollection();
module.exports  = class ParametrosController {
     static async create(req, res){
            try{
                    const parametro = new Parametros();    
                    await parametro.save();         
                    return res.status(200).json({ parametro });
            }catch(error){
                return res.status(500).json({ message: "Não foi possível localizar parâmetro!"});
            }
    }

}