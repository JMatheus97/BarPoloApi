const router = require('express').Router();
const CaixaController = require('../../controllers/configuracao/CaixaController');

const verifyToken = require('../../helpers/verify-token');

router.post('/inserirMaterial/:id', verifyToken, CaixaController.inserirMaterialCaixa);

module.exports = router;