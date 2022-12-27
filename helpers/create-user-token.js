const jwt  = require('jsonwebtoken');

const createUserToken = async(user, req, res) => {

    // create a token
    const token = jwt.sign({
        useName: user.useName,
        id: user._id
    }, "nossosecret");

    // return token
    res.status(200).json({

        message: "Você está autenticado",
        usuario: user,
        token: token,
    })

}

module.exports = createUserToken;