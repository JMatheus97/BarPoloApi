const User = require('../../models/configuracao/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//helpers
const createUserToken = require('../../helpers/create-user-token');
const getToken = require('../../helpers/get-token');
const getUserByToken = require('../../helpers/get-user-by-token');

module.exports = class UserController {
    static async register(req, res) {
        const { nome, userName, password, perfil} =   req.body;

        // Validations
        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatório' })
            return;
        }
            if(!userName){
            res.status(422).json({ message: 'O nome de usuário é obrigatório' })
            return;
        }
        if(!password){
            res.status(422).json({ message: 'A senha é obrigatório' })
            return;
        }
        if(!perfil){
            res.status(422).json({ message: 'O perfil é obrigatório' })
            return;
        }

        // Check if User exists
        const userExists = await User.findOne({ userName });

        if(userExists){
            res.status(422).json({ message: 'Por favor, utilize outro nome de usuário ' })
            return;
        }
        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
       
        const user =   User({
            nome,
            userName,
            password: passwordHash,
            perfil
            });

        try {
            const newUser = await  user.save();
            await createUserToken(newUser, req, res);
        }catch(error){
            res.status(500).json({ message: error})
        }
    }

    static async login(req, res){
        const {userName, password} = req.body;
        if(!userName){
            res.status(422).json({ message: 'O nome de usuário é obrigatório' })
            return;
        }

        if(!password){
            res.status(422).json({ message: 'A senha é obrigatório' })
            return;
        }
                // Check if User exists
                const user = await User.findOne({userName});
                
                if(!user){
                    res.status(422).json({ 
                        message: 'Não há usuário cadastrado com o nome de usuário' 
                    });
                    return;
                }
                // Check if password match with db password
                const CheckPassword = await bcrypt.compare(password, user.password)

                if(!CheckPassword){
                    res.status(422).json({ 
                        message: 'Senha inválida' 
                    });
                    return;
                }
                await createUserToken(user, req, res);
    }

    static async checkUser(req, res){
        let currentUser;
        if(req.headers.authorization){
            const token = getToken(req);
            const decoded =  jwt.verify(token, 'nossosecret');
            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;
        }else {
            currentUser = null;
        }
        res.status(200).send(currentUser);
    }

    static async getUserById(req, res){
        const id  = req.params.id;
        
        try{
            const user = await User.findById(id).select('-password');
            res.status(200).json({ user });
        }catch(errr){
            res.status(422).json({ message: 'Usuário não encontrado'});
            return;
        } 
    }

    static async getUsers(req, res){
        try{
            const users = await User.find();
            res.status(200).json({ users });
        }catch(error){
            res.status(422).json({ message: error });
        }
    }

    static async editUser(req, res){
       const id = req.params.id;
       const { nome, userName, password, perfil} =   req.body;

        try{
            const token = getToken(req);
            const user = await getUserByToken(token);
           
            if(!nome){
                res.status(422).json({ message: 'O nome é obrigatório' })
                return;
            }
            user.nome = nome;

            if(!userName){
                res.status(422).json({ message: 'O nome  do usuário obrigatório!' })
                return;
            }
           
            //check if userName has already taken
            const userExists = await User.findOne({ userName });
            if(user.userName !== userExists.userName){
                res.status(422).json({ message: 'Você não tem permissão para alterar outro usuário' })
                return;
            }
            user.userName = userName;
            
            if(!perfil){
                res.status(422).json({ message: 'O perfil é obrigatório' })
                return;
            }
            user.perfil = perfil;


            if(password !== null && password !== ""){
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
            }
           
            try{
               await User.findByIdAndUpdate({ _id: user._id}, {$set: user}, {new: true});
                    res.status(200).json({ message: 'Usuário atualizado com sucesso', user});
            }catch(error){
                res.status(500).json({ message: error});
                console.log(error);
                return;
            }

        }catch(errr){
            res.status(422).json({ message: 'Usuário não encontrado'});
            return;
        } 
    }
      
}