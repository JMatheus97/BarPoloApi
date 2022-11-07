const router = require('express').Router();
const LocalizacaoController = require('../../controllers/configuracao/LocalizacaoController');

const verifyToken = require('../../helpers/verify-token');

router.get('/', verifyToken, LocalizacaoController.show);
router.get('/:id', verifyToken, LocalizacaoController.getLocalizacaoById)
router.post('/new', verifyToken, LocalizacaoController.create);
router.post('/edit/:id', verifyToken, LocalizacaoController.edit);
router.delete('/:id', verifyToken, LocalizacaoController.delete);

module.exports = router;