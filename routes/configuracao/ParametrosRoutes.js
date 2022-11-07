const router = require('express').Router();
const ParametrosController = require('../../controllers/configuracao/ParametrosController');

const verifyToken = require('../../helpers/verify-token');

router.get('/',  verifyToken, ParametrosController.create);

module.exports = router;