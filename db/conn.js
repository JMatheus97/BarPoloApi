const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb+srv://node:node123@cluster0.nrje1ui.mongodb.net/barPolo?retryWrites=true&w=majority');
    console.log("Conectou ao Mongoose! ");
}

main().catch((err) => console.log(err));

module.exports = mongoose;