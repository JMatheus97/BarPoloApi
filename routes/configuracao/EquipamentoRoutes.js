const router = require('express').Router();
const EquipamentoController = require('../../controllers/configuracao/EquipamentoController');

const verifyToken = require('../../helpers/verify-token');

router.get('/', verifyToken, EquipamentoController.show);
router.get('/:id', verifyToken, EquipamentoController.getEquipamentoById);
router.post('/new', verifyToken, EquipamentoController.create);
router.post('/edit/:id', verifyToken, EquipamentoController.edit);
router.delete('/:id', verifyToken, EquipamentoController.delete);

module.exports = router;