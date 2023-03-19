const Usuario = require('../classes-js/Usuario');
const bcrypt = require('bcrypt');

//helpers
const createUserToken = require('../../helpers/create-user-token');

module.exports = class UsuarioController{
    static async create(req, res ){
        const { nome, userName, password, perfil} = req.body;

        if(!nome){
            return res.status(422).json({ message: "Informe o nome !"});
        }

        if(!userName){
            return res.status(422).json({ message: "Informe o nome do usuário !"});
        }

        if(!password){
            return res.status(422).json({ message: "Informe o password !"});
        }

        if(!perfil){
            return res.status(422).json({ message: "Informe o perfil !"});
        }else if(perfil !== "Administrador"){
            return res.status(422).json({ message: "Tipo de perfil inválido !"});
        }

        const usuarioExists = await Usuario.findOne({ userName });

        if(usuarioExists){
            return res.status(422).json({ message: 'Por favor, utilize outro nome de usuário ' })
        }
        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const usuario = Usuario({
            nome,
            userName,
            password: passwordHash,
            perfil
        })

        try{
            const resultUsuario = await usuario.save();
            await createUserToken(resultUsuario, req, res);
        }catch(error){
            return res.status(400).json({ message: "Erro ao salvar usuário!", error});
        }
    }
}
