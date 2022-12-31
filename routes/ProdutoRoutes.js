const router = require('express').Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('', ProdutoController.find);
router.post('/new', ProdutoController.create);


module.exports = router;