const jwt  = require('jsonwebtoken');

const User = require('../models/configuracao/User');

// get user by jwt token
const getUserByToken = async (token) => {

    if(!token){
        return res.status(403).json({message: 'Acesso Negado!'});
    }

    const decoded =  jwt.verify(token, 'nossosecret');

    const userId  = decoded.id;

    const user = await User.findOne({_id: userId});

    return user;
};

module.exports = getUserByToken;