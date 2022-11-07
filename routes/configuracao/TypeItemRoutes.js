const router = require('express').Router();
const TypeItemController = require('../../controllers/configuracao/TypeItemController');

const { imageUpload } = require('../../helpers/images-upload');
const verifyToken = require('../../helpers/verify-token');

router.post('/new', verifyToken, TypeItemController.create);
router.get('/', verifyToken,TypeItemController.show);
router.get('/:id', verifyToken, TypeItemController.getTypeItemById);
router.post('/edit/:id', verifyToken, imageUpload.single('file'), TypeItemController.edit);
router.delete('/:id', verifyToken,  TypeItemController.delete);

module.exports = router;