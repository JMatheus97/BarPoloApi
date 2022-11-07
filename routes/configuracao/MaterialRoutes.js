const router = require('express').Router();
const MaterialController = require('../../controllers/configuracao/MaterialController');

const verifyToken = require('../../helpers/verify-token');

router.get('/', verifyToken, MaterialController.show);
router.get('/:id', verifyToken, MaterialController.getMaterialById);
router.post('/new', verifyToken, MaterialController.create);
router.post('/edit/:id', verifyToken, MaterialController.edit);
router.delete('/:id', verifyToken, MaterialController.delete);

module.exports  = router;