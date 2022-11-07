const router = require('express').Router();
const DetergenteController = require('../../controllers/configuracao/DetergenteController');

const verifyToken = require('../../helpers/verify-token');

router.get('/', verifyToken, DetergenteController.show);
router.get('/:id', verifyToken, DetergenteController.getDetergenteById);
router.post('/new' , verifyToken, DetergenteController.create);
router.post('/edit/:id',  verifyToken, DetergenteController.edit);
router.delete('/:id', verifyToken, DetergenteController.delete);

module.exports = router;