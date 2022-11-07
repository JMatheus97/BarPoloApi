const router = require('express').Router();
const ProcedimentoController = require('../../controllers/configuracao/ProcedimentoController');

const verifyToken = require('../../helpers/verify-token');

router.get('/', verifyToken,  ProcedimentoController.show)
router.get('/:id', verifyToken, ProcedimentoController.getProcedimentoById);
router.post('/new', verifyToken, ProcedimentoController.create);
router.post('/edit/:id', verifyToken, ProcedimentoController.editProcedimento);
router.delete('/:id', verifyToken, ProcedimentoController.delete);

module.exports = router;