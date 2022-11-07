const router = require('express').Router();
const EmbalagemController = require('../../controllers/configuracao/EmbalagemController');

const verifyToken = require('../../helpers/verify-token');

router.get('/', verifyToken, EmbalagemController.show);
router.get('/:id', verifyToken, EmbalagemController.getEmbalagemById);
router.post('/new', verifyToken, EmbalagemController.create);
router.post('/edit/:id', verifyToken, EmbalagemController.edit);
router.delete('/:id', verifyToken, EmbalagemController.delete);

module.exports = router;