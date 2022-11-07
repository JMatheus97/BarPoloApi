const multer  = require("multer");
const path = require("path");

// Destino para salvar as imagens 

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";
        if(req.baseUrl.includes("typeItem")){
            folder = typeitem;
        }

        cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpeg)$/)){
            return cb(new Error("Por favor, envie apenas imagens jpeg ou png!"))
        }
        cb(undefined, true);
    },
})

module.exports = { imageUpload }