const router = require('express').Router();
const ProdutoController = require('../controllers/ProdutoController');

router.post('/new', ProdutoController.create);

module.exports = router;